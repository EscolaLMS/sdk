import * as API from "./../../types/api";
import {
  ContextListState,
  ContextPaginatedMetaState,
  ContextStateValue,
} from "./types";

type fetchDataType<T> =
  | {
      controller?: string;
      controllers?: Record<string, AbortController | null>;
      mode: "paginated";
      fetchAction: Promise<API.DefaultMetaResponse<T>>;
      setState: React.Dispatch<
        React.SetStateAction<ContextPaginatedMetaState<T>>
      >;
      onError?: (error: API.DefaultResponseError | any) => void;
    }
  | {
      id?: number | string;
      controller?: string;
      controllers?: Record<string, AbortController | null>;
      mode: "value";
      fetchAction: Promise<API.DefaultResponse<T>>;
      setState: React.Dispatch<React.SetStateAction<ContextStateValue<T>>>;
      onError?: (error: API.DefaultResponseError | any) => void;
    }
  | {
      controller?: string;
      controllers?: Record<string, AbortController | null>;
      mode: "list";
      fetchAction: Promise<API.DefaultResponse<T[]>>;
      setState: React.Dispatch<React.SetStateAction<ContextListState<T>>>;
      onError?: (error: API.DefaultResponseError | any) => void;
    };

export const fetchDataType = <T>(params: fetchDataType<T>): Promise<void> => {
  const { setState, fetchAction, mode, controller, controllers, onError } =
    params;

  if (mode === "paginated") {
    setState((prevState) => ({ ...prevState, loading: true }));
  }
  if (mode === "value") {
    const { id } = params;

    if (id) {
      setState((prevState) => {
        return {
          ...prevState,
          loading: true,
          byId: prevState.byId
            ? {
                ...prevState.byId,
                [id]: {
                  ...prevState.byId[id],
                  loading: true,
                },
              }
            : { [id]: { loading: true } },
        };
      });
    } else {
      setState((prevState) => ({ ...prevState, loading: true }));
    }
  }
  if (mode === "list") {
    setState((prevState) => ({ ...prevState, loading: true }));
  }

  if (controller && controllers) {
    if (controllers[controller]) {
      controllers[controller]?.abort();
    }
    controllers[controller] = new AbortController();
  }

  return fetchAction
    .then((response: unknown) => {
      if (controllers && controller && controllers[controller]) {
        controllers[controller] = null;
      }
      if (mode === "paginated") {
        if ((response as API.DefaultMetaResponse<T>).success) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            list: response as API.PaginatedMetaList<T>,
            error: undefined,
          }));
        }
      }
      if (mode === "value") {
        if ((response as API.DefaultResponse<T>).success) {
          const { id } = params;
          if (id) {
            setState((prevState) => {
              return {
                loading: false,
                value: (response as API.DefaultResponseSuccess<T>).data,
                error: undefined,
                byId: prevState.byId
                  ? {
                      ...prevState.byId,
                      [id]: {
                        value: (response as API.DefaultResponseSuccess<T>).data,
                        loading: false,
                        error: undefined,
                      },
                    }
                  : {
                      [id]: {
                        value: (response as API.DefaultResponseSuccess<T>).data,
                        loading: false,
                        error: undefined,
                      },
                    },
              };
            });
          } else {
            setState({
              loading: false,
              value: (response as API.DefaultResponseSuccess<T>).data,
              error: undefined,
            });
          }
        }
      }
      if (mode === "list") {
        if ((response as API.DefaultResponse<T>).success) {
          setState({
            loading: false,
            list: (response as API.DefaultResponseSuccess<T[]>).data,
            error: undefined,
          });
        }
      }

      if ((response as API.DefaultResponseError).success === false) {
        if (onError) {
          onError(response as API.DefaultResponseError);
        }
        if (mode === "value" && params.id) {
          const { id } = params;
          setState((prevState: any) => {
            return {
              ...prevState,
              loading: false,
              error: response,
              byId: prevState.byId
                ? {
                    ...prevState.byId,
                    [id]: {
                      ...prevState.byId[id],
                      loading: false,
                      error: response,
                    },
                  }
                : {
                    [id]: {
                      loading: false,
                      error: response,
                    },
                  },
            };
          });
        } else {
          setState((prevState: any) => ({
            ...prevState,
            loading: false,
            error: response,
          }));
        }
      }
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        if (controllers && controller && controllers[controller]) {
          controllers[controller] = null;
        }
        return;
      }

      if (onError) {
        onError(error);
      }

      if (mode === "value" && params.id) {
        const { id } = params;

        setState((prevState: any) => ({
          ...prevState,
          loading: false,
          error: error,
          byId: prevState.byId
            ? {
                ...prevState.byId,
                [id]: {
                  ...prevState.byId[id],
                  loading: false,
                  error: error,
                },
              }
            : {
                [id]: {
                  loading: false,
                  error: error,
                },
              },
        }));
      } else {
        setState((prevState: any) => ({
          ...prevState,
          loading: false,
          error: error,
        }));
      }
    });
};
