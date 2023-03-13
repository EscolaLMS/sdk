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

import { useLocalStorage } from '../hooks/useLocalStorage';
import * as API from './../../types/api';
import { getDefaultData } from './index';

import {
  consultationAccess as getConsultationAccess,
  createConsultationAccess,
  deleteConsultationAccess as deleteConsultationAccessCall,
  updateConsultationAccess as patchConsultationAccess,
} from './../../services/consultations_access';
import { UserContext } from './user';

export const ConsultationAccessContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    | 'consultationAccess'
    | 'fetchConsultationAccess'
    | 'addConsultationAccess'
    | 'deleteConsultationAccess'
    | 'updateConsultationAccess'
  >
> = createContext({
  consultationAccess: defaultConfig.consultationAccess,
  fetchConsultationAccess: defaultConfig.fetchConsultationAccess,
  addConsultationAccess: defaultConfig.addConsultationAccess,
  deleteConsultationAccess: defaultConfig.deleteConsultationAccess,
  updateConsultationAccess: defaultConfig.updateConsultationAccess,
});

export interface ConsultationAccessContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, 'consultationAccess'>>;
  ssrHydration?: boolean;
}

export const ConsultationAccessContextProvider: FunctionComponent<
  PropsWithChildren<ConsultationAccessContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const { token } = useContext(UserContext);

  useEffect(() => {
    if (defaults) {
      defaults.consultationAccess !== null &&
        setConsultationAccess({
          loading: false,
          list: defaults.consultationAccess?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [consultationAccess, setConsultationAccess] = useLocalStorage<
    ContextPaginatedMetaState<API.ConsultationsAccessEnquiry>
  >(
    'lms',
    'consultationAccess',
    getDefaultData('consultationAccess', {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchConsultationAccess = useCallback(
    (
      filter: API.ConsultationsAccessEnquiryParams = {
        current_page: 0,
        per_page: 25,
      }
    ) => {
      return token
        ? fetchDataType<API.ConsultationsAccessEnquiry>({
            controllers: abortControllers.current,
            controller: `consultationAccess/${JSON.stringify(filter)}`,
            mode: 'paginated',
            fetchAction: getConsultationAccess.bind(null, apiUrl)(
              token,
              filter,
              {
                signal:
                  abortControllers.current[
                    `consultationAccess/${JSON.stringify(filter)}`
                  ]?.signal,
              }
            ),
            setState: setConsultationAccess,
          })
        : Promise.reject('noToken');
    },
    [token]
  );

  const addConsultationAccess = useCallback(
    (data: API.ConsultationsAccessEnquiryCreateRequest) => {
      return token
        ? createConsultationAccess(apiUrl, token, data)
        : Promise.reject('noToken');
    },
    [token]
  );

  const updateConsultationAccess = useCallback(
    (id: number, data: API.ConsultationsAccessEnquiryUpdateRequest) => {
      return token
        ? patchConsultationAccess(apiUrl, token, id, data)
        : Promise.reject('noToken');
    },
    [token]
  );

  const deleteConsultationAccess = useCallback(
    (id: number) => {
      // TODO: remove task on list and byID once it fine
      // TODO: what about error ?
      return token
        ? deleteConsultationAccessCall(apiUrl, token, id)
        : Promise.reject('noToken');
    },
    [token]
  );

  return (
    <ConsultationAccessContext.Provider
      value={{
        consultationAccess,
        fetchConsultationAccess,
        addConsultationAccess,
        deleteConsultationAccess,
        updateConsultationAccess,
      }}
    >
      {children}
    </ConsultationAccessContext.Provider>
  );
};
