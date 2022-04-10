import * as API from "./../../types/api";
import {
  ContextListState,
  ContextPaginatedMetaState,
  ContextState,
  ContextStateValue,
} from "./types";

export const fetchPaginatedStateData = <T1>(
  fetchAction: Promise<API.DefaultMetaResponse<T1>>,
  setState: React.Dispatch<React.SetStateAction<ContextPaginatedMetaState<T1>>>,
): Promise<void> => {
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
): Promise<void> => {
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
): Promise<void> => {
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
