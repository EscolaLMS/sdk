import {
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
  ContextPaginatedMetaState,
} from "../types";
import { defaultConfig } from "../defaults";
import { fetchDataType } from "../states";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import * as API from "../../../types";
import { getDefaultData } from "../index";

import { dictionariesWords as getDictionariesWords } from "../../../services/dictionary";

export const DictionariesWordsContext: React.Context<
  Pick<EscolaLMSContextConfig, "dictionariesWords" | "fetchDictionariesWords">
> = createContext({
  dictionariesWords: defaultConfig.dictionariesWords,
  fetchDictionariesWords: defaultConfig.fetchDictionariesWords,
});

export interface DictionariesWordsContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "dictionariesWords">>;
  ssrHydration?: boolean;
}

export const DictionariesWordsContextProvider: FunctionComponent<
  PropsWithChildren<DictionariesWordsContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  useEffect(() => {
    if (defaults) {
      defaults.dictionariesWords !== null &&
        setDictionariesWords({
          loading: false,
          list: defaults.dictionariesWords?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [dictionariesWords, setDictionariesWords] = useLocalStorage<
    ContextPaginatedMetaState<API.DictionariesWords>
  >(
    "lms",
    "dictionariesWords",
    getDefaultData("dictionariesWords", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchDictionariesWords = useCallback(
    (slug: string, params?: API.DictionariesWordsParams) => {
      const abortString = params?.abort_prev
        ? `dictionaries/${slug}/words`
        : `dictionaries/${slug}/words/${JSON.stringify(params)}`;
      if (abortControllers.current[abortString]) {
        abortControllers.current[abortString]?.abort();
      }

      abortControllers.current = {
        [abortString]: new AbortController(),
      };
      return fetchDataType<API.DictionariesWords>({
        controllers: abortControllers.current,
        controller: abortString,
        mode: "paginated",
        fetchAction: getDictionariesWords.bind(
          null,
          apiUrl,
          slug
        )(params, {
          signal: abortControllers.current[abortString]?.signal,
        }),
        setState: setDictionariesWords,
      });
    },
    []
  );

  return (
    <DictionariesWordsContext.Provider
      value={{
        dictionariesWords,
        fetchDictionariesWords,
      }}
    >
      {children}
    </DictionariesWordsContext.Provider>
  );
};
