import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextListState,
} from "../types";
import { defaultConfig } from "../defaults";
import { fetchDataType } from "../states";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import * as API from "../../../types/api";
import { getDefaultData } from "../index";
import { dictionariesWordsCategories as getDictionariesWordsCategories } from "../../../services/dictionary";

export const DictionariesWordsCategoriesContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    "dictionariesWordsCategories" | "fetchDictionariesWordsCategories"
  >
> = createContext({
  dictionariesWordsCategories: defaultConfig.dictionariesWordsCategories,
  fetchDictionariesWordsCategories:
    defaultConfig.fetchDictionariesWordsCategories,
});

export interface DictionariesWordsCategoriesContextProviderType {
  apiUrl: string;
  defaults?: Partial<
    Pick<EscolaLMSContextReadConfig, "dictionariesWordsCategories">
  >;
  ssrHydration?: boolean;
}

export const DictionariesWordsCategoriesContextProvider: FunctionComponent<
  PropsWithChildren<DictionariesWordsCategoriesContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  useEffect(() => {
    if (defaults) {
      defaults.dictionariesWordsCategories !== null &&
        setDictionariesWordsCategories({
          loading: false,
          list: defaults.dictionariesWordsCategories?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [dictionariesWordsCategories, setDictionariesWordsCategories] =
    useLocalStorage<ContextListState<API.DictionariesWordsCategory>>(
      "lms",
      "dictionariesWordsCategories",
      getDefaultData("dictionariesWordsCategories", {
        ...defaultConfig,
        ...defaults,
      }),
      ssrHydration
    );

  const fetchDictionariesWordsCategories = useCallback(
    (slug: string, params?: API.DictionariesParams) => {
      return fetchDataType<API.DictionariesWordsCategory>({
        controllers: abortControllers.current,
        controller: `dictionaryWordsCategories`,
        mode: "list",
        fetchAction: getDictionariesWordsCategories.bind(null, apiUrl)(
          slug,
          params,
          {
            signal: abortControllers.current?.dictionaryWordsCategories?.signal,
          }
        ),
        setState: setDictionariesWordsCategories,
      });
    },
    []
  );

  return (
    <DictionariesWordsCategoriesContext.Provider
      value={{
        dictionariesWordsCategories,
        fetchDictionariesWordsCategories,
      }}
    >
      {children}
    </DictionariesWordsCategoriesContext.Provider>
  );
};
