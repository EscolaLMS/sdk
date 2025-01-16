import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useContext,
} from "react";
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextPaginatedMetaState,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType, handleNoTokenError } from "./states";

import {
  getNotifications,
  readNotification,
  readAll as postReadAll,
} from "../../services/notify";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "../../types";
import { getDefaultData } from "./index";

import { UserContext } from "./user";

export const NotificationsContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    | "notifications"
    | "fetchNotifications"
    | "readNotify"
    | "readAllNotifications"
  >
> = createContext({
  notifications: defaultConfig.notifications,
  fetchNotifications: defaultConfig.fetchNotifications,
  readNotify: defaultConfig.readNotify,
  readAllNotifications: defaultConfig.readAllNotifications,
});

export interface NotificationsContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "notifications">>;
  ssrHydration?: boolean;
}

export const NotificationsContextProvider: FunctionComponent<
  PropsWithChildren<NotificationsContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const { token } = useContext(UserContext);

  const [notifications, setNotifications] = useLocalStorage<
    ContextPaginatedMetaState<API.Notification>
  >(
    "lms",
    "notifications",
    getDefaultData("notifications", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchNotifications = useCallback(
    (
      filter: API.PaginationParams = {
        page: 0,
        per_page: 25,
      }
    ) => {
      return handleNoTokenError(
        token
          ? fetchDataType<API.Notification>({
              controllers: abortControllers.current,
              controller: `notifications/${JSON.stringify(filter)}`,
              mode: "paginated",
              fetchAction: getNotifications.bind(null, apiUrl)(token, filter, {
                signal:
                  abortControllers.current[
                    `notifications/${JSON.stringify(filter)}`
                  ]?.signal,
              }),
              setState: setNotifications,
            })
          : Promise.reject("noToken")
      );
    },
    [token, setNotifications, apiUrl]
  );

  const readNotify = useCallback(
    (id: string) => {
      return handleNoTokenError(
        token
          ? readNotification
              .bind(null, apiUrl)(id, token)
              .then((response) => {
                if (response.success) {
                  setNotifications((prevState) => ({
                    ...prevState,

                    list: prevState.list
                      ? {
                          ...prevState.list,
                          data: prevState.list.data.filter(
                            (item) => item.id !== id
                          ),
                        }
                      : undefined,

                    loading: false,
                  }));
                }
              })
              .catch((error) => {
                setNotifications((prevState) => ({
                  ...prevState,
                  loading: false,
                  error: error,
                }));
              })
          : Promise.reject("noToken")
      );
    },
    [token, setNotifications, apiUrl]
  );

  const readAllNotifications = useCallback(() => {
    return handleNoTokenError(
      token
        ? postReadAll
            .bind(
              null,
              apiUrl
            )(token)
            .then((response) => {
              if (response.success) {
                setNotifications((prevState) => ({
                  ...prevState,
                  list: {
                    data: [],
                    meta: {
                      current_page: 0,
                      next_page_url: "",
                      last_page: 0,
                      path: "",
                      per_page: 25,
                      prev_page_url: null,
                      to: 0,
                      total: 0,
                      links: {
                        first: "",
                        last: "",
                        next: "",
                        prev: "",
                      },
                    },
                  },
                  loading: false,
                }));
              }
            })
            .catch((error) => {
              setNotifications((prevState) => ({
                ...prevState,
                loading: false,
                error: error,
              }));
            })
        : Promise.reject("noToken")
    );
  }, [token, setNotifications, apiUrl]);

  return (
    <NotificationsContext.Provider
      value={{
        readAllNotifications,
        notifications,
        fetchNotifications,
        readNotify,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
