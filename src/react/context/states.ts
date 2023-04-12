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

export function fetchDataType<T>(
  params: fetchDataType<T> & { mode: "paginated" }
): Promise<API.DefaultMetaResponse<T>>;
export function fetchDataType<T>(
  params: fetchDataType<T> & { mode: "value" | "list" }
): Promise<API.DefaultResponse<T>>;

export async function fetchDataType<T>(params: fetchDataType<T>) {
  const { setState, fetchAction, mode, controller, controllers, onError } =
    params;

  if (mode === "paginated") {
    setState((prevState) => ({ ...prevState, loading: true }));

    try {
      const response = await fetchAction;

      if (mode === "paginated") {
        if (response.success) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            list: response as API.PaginatedMetaList<T>,
            error: undefined,
          }));
        }
      }

      return response;
    } catch (error: any) {
      if (error.name === "AbortError") {
        if (controllers && controller && controllers[controller]) {
          controllers[controller] = null;
        }
        return error;
      }

      if (onError) {
        onError(error);
      }

      setState((prevState: any) => ({
        ...prevState,
        loading: false,
        error: error,
      }));

      return error;
    }
  }

  if (mode === "value") {
    const { id } = params;

    id
      ? setState((prevState) => ({
          ...prevState,
          loading: true,
          byId: prevState.byId
            ? {
                ...prevState.byId,
                [id]: prevState.byId[id]
                  ? { ...prevState.byId[id], loading: true }
                  : { loading: true },
              }
            : {
                [id]: {
                  loading: true,
                  error: undefined,
                },
              },
        }))
      : setState((prevState) => ({ ...prevState, loading: true }));

    try {
      const response = await fetchAction;

      if (response.success) {
        if (id) {
          setState((prevState) => {
            return {
              loading: false,
              value: response.data,
              error: undefined,
              byId: prevState.byId
                ? {
                    ...prevState.byId,
                    [id]: {
                      value: response.data,
                      loading: false,
                      error: undefined,
                    },
                  }
                : {
                    [id]: {
                      value: response.data,
                      loading: false,
                      error: undefined,
                    },
                  },
            };
          });

          return response;
        } else {
          setState({
            loading: false,
            value: response.data,
            error: undefined,
          });

          return response;
        }
      }
    } catch (error) {
      if (params.id) {
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

      return error;
    }
  }

  if (mode === "list") {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetchAction;

      if (response.success) {
        setState({
          loading: false,
          list: response.data,
          error: undefined,
        });

        return response;
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        if (controllers && controller && controllers[controller]) {
          controllers[controller] = null;
        }
        return;
      }

      if (onError) {
        onError(error);
      }

      setState((prevState: any) => ({
        ...prevState,
        loading: false,
        error: error,
      }));

      return error;
    }
  }

  return undefined;
}
