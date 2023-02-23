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
  ContextPaginatedMetaState,
} from './types';
import { defaultConfig } from './defaults';
import { fetchDataType } from './states';

import { useLocalStorage } from '../hooks/useLocalStorage';
import * as API from './../../types/api';
import { getDefaultData } from './index';
import { pages as getPages } from './../../services/pages';

export const PagesContext: React.Context<
  Pick<EscolaLMSContextConfig, 'pages' | 'fetchPages'>
> = createContext({
  pages: defaultConfig.pages,
  fetchPages: defaultConfig.fetchPages,
});

export interface PagesContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, 'pages'>>;
  ssrHydration?: boolean;
}

export const PagesContextProvider: FunctionComponent<
  PropsWithChildren<PagesContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const [pages, setPages] = useLocalStorage<
    ContextPaginatedMetaState<API.PageListItem>
  >(
    'lms',
    'pages',
    getDefaultData('pages', {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchPages = useCallback(() => {
    return fetchDataType<API.PageListItem>({
      controllers: abortControllers.current,
      controller: 'pages',
      mode: 'paginated',
      fetchAction: getPages.bind(
        null,
        apiUrl
      )({
        signal: abortControllers.current?.pages?.signal,
      }),
      setState: setPages,
    });
  }, []);

  return (
    <PagesContext.Provider
      value={{
        pages,
        fetchPages,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};
