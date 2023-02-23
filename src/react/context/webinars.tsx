import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextListState,
} from './types';
import { defaultConfig } from './defaults';
import { fetchDataType } from './states';

import { useLocalStorage } from '../hooks/useLocalStorage';
import * as API from './../../types/api';
import { getDefaultData } from './index';
import { webinars as getWebinars } from './../../services/webinars';

export const WebinarsContext: React.Context<
  Pick<EscolaLMSContextConfig, 'webinars' | 'fetchWebinars'>
> = createContext({
  webinars: defaultConfig.webinars,
  fetchWebinars: defaultConfig.fetchWebinars,
});

export interface WebinarsContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, 'webinars'>>;
  ssrHydration?: boolean;
}

export const WebinarsContextProvider: FunctionComponent<
  PropsWithChildren<WebinarsContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  useEffect(() => {
    if (defaults) {
      defaults.webinars !== null &&
        setWebinars({
          loading: false,
          list: defaults.webinars?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [webinars, setWebinars] = useLocalStorage<
    ContextListState<EscolaLms.Webinar.Models.Webinar>
  >(
    'lms',
    'webinars',
    getDefaultData('webinars', {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchWebinars = useCallback((filter: API.WebinarParams) => {
    return fetchDataType<EscolaLms.Webinar.Models.Webinar>({
      controllers: abortControllers.current,
      controller: `webinars/${JSON.stringify(filter)}`,
      mode: 'list',
      fetchAction: getWebinars.bind(null, apiUrl)(
        filter,

        {
          signal:
            abortControllers.current[`webinars/${JSON.stringify(filter)}`]
              ?.signal,
        }
      ),
      setState: setWebinars,
    });
  }, []);

  return (
    <WebinarsContext.Provider
      value={{
        webinars,
        fetchWebinars,
      }}
    >
      {children}
    </WebinarsContext.Provider>
  );
};
