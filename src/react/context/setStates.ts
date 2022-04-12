import * as API from "./../../types/api";
import { ContextListState, ContextPaginatedMetaState, ContextStateValue } from "./types";

export const fetchPaginatedStateData = <T1>(
  fetchAction: Promise<API.DefaultMetaResponse<T1>>,
  setState: React.Dispatch<React.SetStateAction<ContextPaginatedMetaState<T1>>>,
) => {
  setState((prevState) => ({ ...prevState, loading: true }));

  return fetchAction
    .then((response) => {
      if (response.success) {
        setState({
          loading: false,
          list: response,
          error: undefined,
        });
      }
      if (response.success === false) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: response,
        }));
      }
    })
    .catch((error) => {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error,
      }));
    });
};

export const fetchValueStateData = <T1>(
  fetchAction: Promise<API.DefaultResponse<T1>>,
  setState: React.Dispatch<React.SetStateAction<ContextStateValue<T1>>>,
) => {
  setState((prevState) => ({ ...prevState, loading: true }));

  return fetchAction
    .then((response) => {
      if (response.success) {
        setState({
          loading: false,
          value: response.data,
          error: undefined,
        });
      }
      if (response.success === false) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: response,
        }));
      }
    })
    .catch((error) => {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error,
      }));
    });
};

export const fetchListStateData = <T1>(
  fetchAction: Promise<API.DefaultMetaResponse<T1>>,
  setState: React.Dispatch<React.SetStateAction<ContextListState<T1>>>,
) => {
  setState((prevState) => ({ ...prevState, loading: true }));

  return fetchAction
    .then((response) => {
      if (response.success) {
        setState({
          loading: false,
          list: response.data,
          error: undefined,
        });
      }
      if (response.success === false) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: response,
        }));
      }
    })
    .catch((error) => {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error,
      }));
    });
};

// type fetchDataType<T> =
//   | {
//       mode: "paginated";
//       fetchAction: Promise<API.DefaultMetaResponse<T>>;
//       setState: React.Dispatch<React.SetStateAction<ContextPaginatedMetaState<T>>>;
//     }
//   | {
//       mode: "value";
//       fetchAction: Promise<API.DefaultResponse<T>>;
//       setState: React.Dispatch<React.SetStateAction<ContextStateValue<T>>>;
//     }
//   | {
//       mode: "list";
//       fetchAction: Promise<API.DefaultResponse<T>>;
//       setState: React.Dispatch<React.SetStateAction<ContextListState<T>>>;
//     };

// type Handlers<T> = {
//   [key in fetchDataType<T>["mode"]]: (params: Extract<fetchDataType<T>, { mode: key }>) => any;
// };

// export const fetchDataType = <T>(params: Handlers<T>) => {
//   const { setState, fetchAction, mode } = params;

//   setState((prevState) => ({ ...prevState, loading: true }));

//   fetchAction
//     .then((response) => {
//       if (response.success) {
//         switch (mode) {
//           case "paginated":
//             setState(() => ({
//               loading: false,
//               list: response,
//               error: undefined,
//             }));
//             break;
//           case "value":
//             setState(() => ({
//               loading: false,
//               value: response.data,
//               error: undefined,
//             }));
//             break;
//           case "list":
//           default:
//             setState(() => ({
//               loading: false,
//               list: response.data,
//               error: undefined,
//             }));
//             break;
//         }
//       }
//       if (response.success === false) {
//         setState((prevState) => ({
//           ...prevState,
//           loading: false,
//           error: response,
//         }));
//       }
//     })
//     .catch((error) => {
//       setState((prevState) => ({
//         ...prevState,
//         loading: false,
//         error: error,
//       }));
//     });
// };

type fetchDataType<T> =
  | {
      mode: "paginated";
      fetchAction: Promise<API.DefaultMetaResponse<T>>;
      setState: React.Dispatch<React.SetStateAction<ContextPaginatedMetaState<T>>>;
    }
  | {
      mode: "value";
      fetchAction: Promise<API.DefaultResponse<T>>;
      setState: React.Dispatch<React.SetStateAction<ContextStateValue<T>>>;
    }
  | {
      mode: "list";
      fetchAction: Promise<API.DefaultResponse<T>>;
      setState: React.Dispatch<React.SetStateAction<ContextListState<T>>>;
    };

export const fetchDataType = <T>(params: fetchDataType<T>) => {
  const { setState, fetchAction, mode } = params;

  if (mode === "paginated") {
    setState((prevState) => ({ ...prevState, loading: true }));
  }
  if (mode === "value") {
    setState((prevState) => ({ ...prevState, loading: true }));
  }
  if (mode === "list") {
    setState((prevState) => ({ ...prevState, loading: true }));
  }

  fetchAction
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
