import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from 'react';
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextPaginatedMetaState,
} from './types';
import { defaultConfig } from './defaults';
import { fetchDataType } from './states';

import { getNotifications, readNotification } from '../../services/notify';

import { useLocalStorage } from '../hooks/useLocalStorage';
import * as API from './../../types/api';
import { getDefaultData } from './index';

import { UserContext } from './user';

export const NotificationsContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    'notifications' | 'fetchNotifications' | 'readNotify'
  >
> = createContext({
  notifications: defaultConfig.notifications,
  fetchNotifications: defaultConfig.fetchNotifications,
  readNotify: defaultConfig.readNotify,
});

export interface NotificationsContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, 'notifications'>>;
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
    'lms',
    'notifications',
    getDefaultData('notifications', {
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
      return token
        ? fetchDataType<API.Notification>({
            controllers: abortControllers.current,
            controller: `notifications/${JSON.stringify(filter)}`,
            mode: 'paginated',
            fetchAction: getNotifications.bind(null, apiUrl)(token, filter, {
              signal:
                abortControllers.current[
                  `notifications/${JSON.stringify(filter)}`
                ]?.signal,
            }),
            setState: setNotifications,
          })
        : Promise.reject('noToken');
    },
    [token]
  );

  const readNotify = useCallback(
    (id: string) => {
      return token
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
        : Promise.reject('noToken');
    },
    [token, notifications]
  );

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        fetchNotifications,
        readNotify,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
