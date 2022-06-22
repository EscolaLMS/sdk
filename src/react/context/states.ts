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
    }
  | {
      controller?: string;
      controllers?: Record<string, AbortController | null>;
      mode: "value";
      fetchAction: Promise<API.DefaultResponse<T>>;
      setState: React.Dispatch<React.SetStateAction<ContextStateValue<T>>>;
    }
  | {
      controller?: string;
      controllers?: Record<string, AbortController | null>;
      mode: "list";
      fetchAction: Promise<API.DefaultMetaResponse<T>>;
      setState: React.Dispatch<React.SetStateAction<ContextListState<T>>>;
    };

export const fetchDataType = <T>(params: fetchDataType<T>) => {
  console.log("fetchDataType", params);
  const { setState, fetchAction, mode, controller, controllers } = params;

  if (mode === "paginated") {
    setState((prevState) => ({ ...prevState, loading: true }));
  }
  if (mode === "value") {
    setState((prevState) => ({ ...prevState, loading: true }));
  }
  if (mode === "list") {
    setState((prevState) => ({ ...prevState, loading: true }));
  }

  if (controller && controllers) {
    if (controllers[controller]) {
      console.log("abort", params);
      controllers[controller]?.abort();
    }
    controllers[controller] = new AbortController();
  }

  return fetchAction
    .then((response: unknown) => {
      if (mode === "paginated") {
        if ((response as API.DefaultMetaResponse<T>).success) {
          setState({
            loading: false,
            list: response as API.PaginatedMetaList<T>,
            error: undefined,
          });
        }
      }
      if (mode === "value") {
        if ((response as API.DefaultResponse<T>).success) {
          setState({
            loading: false,
            value: (response as API.DefaultResponseSuccess<T>).data,
            error: undefined,
          });
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
        setState((prevState: any) => ({
          ...prevState,
          loading: false,
          error: response,
        }));
      }
    })
    .catch((error) => {
      setState((prevState: any) => ({
        ...prevState,
        loading: false,
        error: error,
      }));
    });
};
