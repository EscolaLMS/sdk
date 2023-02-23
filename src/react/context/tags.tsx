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
import { uniqueTags as getUniqueTags } from './../../services/tags';

export const TagsContext: React.Context<
  Pick<EscolaLMSContextConfig, 'uniqueTags' | 'fetchTags'>
> = createContext({
  uniqueTags: defaultConfig.uniqueTags,
  fetchTags: defaultConfig.fetchTags,
});

export interface TagsContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, 'uniqueTags'>>;
  ssrHydration?: boolean;
}

export const TagsContextProvider: FunctionComponent<
  PropsWithChildren<TagsContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  useEffect(() => {
    if (defaults) {
      defaults.uniqueTags !== null &&
        setUniqueTags({
          loading: false,
          list: defaults.uniqueTags?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [uniqueTags, setUniqueTags] = useLocalStorage<
    ContextListState<API.Tag>
  >(
    'lms',
    'tags',
    getDefaultData('uniqueTags', {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchTags = useCallback(() => {
    return fetchDataType<API.Tag>({
      controllers: abortControllers.current,
      controller: `tags`,
      mode: 'list',
      fetchAction: getUniqueTags.bind(
        null,
        apiUrl
      )({
        signal: abortControllers.current?.tags?.signal,
      }),
      setState: setUniqueTags,
    });
  }, []);

  return (
    <TagsContext.Provider
      value={{
        uniqueTags,
        fetchTags,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};
