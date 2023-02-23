import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
} from 'react';
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextStateValue,
} from './types';
import { defaultConfig } from './defaults';
import { fetchDataType } from './states';

import { useLocalStorage } from '../hooks/useLocalStorage';
import * as API from './../../types/api';
import { getDefaultData } from './index';
import { getH5p } from '../../services/h5p';

export const H5pContext: React.Context<
  Pick<EscolaLMSContextConfig, 'h5p' | 'fetchH5P'>
> = createContext({
  h5p: defaultConfig.h5p,
  fetchH5P: defaultConfig.fetchH5P,
});

export interface H5pContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, 'h5p'>>;
  ssrHydration?: boolean;
}

export const H5pContextProvider: FunctionComponent<
  PropsWithChildren<H5pContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const [h5p, setH5P] = useLocalStorage<ContextStateValue<API.H5PObject>>(
    'lms',
    'h5p',
    getDefaultData('h5p', {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchH5P = useCallback((uuid: string) => {
    return fetchDataType<API.H5PObject>({
      controllers: abortControllers.current,
      controller: `h5p${uuid}`,
      id: uuid,
      mode: 'value',
      fetchAction: getH5p.bind(null, apiUrl)(uuid, {
        signal: abortControllers.current?.[`h5p${uuid}`]?.signal,
      }),
      setState: setH5P,
    });
  }, []);

  return (
    <H5pContext.Provider
      value={{
        h5p,
        fetchH5P,
      }}
    >
      {children}
    </H5pContext.Provider>
  );
};
