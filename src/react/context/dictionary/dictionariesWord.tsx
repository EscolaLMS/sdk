import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextStateValue,
} from "../types";
import { defaultConfig } from "../defaults";
import { fetchDataType } from "../states";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import * as API from "../../../types/api";
import { getDefaultData } from "../index";

import { dictionariesWord as getDictionariesWord } from "../../../services/dictionary";

export const DictionariesWordContext: React.Context<
  Pick<EscolaLMSContextConfig, "dictionariesWord" | "fetchDictionariesWord">
> = createContext({
  dictionariesWord: defaultConfig.dictionariesWord,
  fetchDictionariesWord: defaultConfig.fetchDictionariesWord,
});

export interface DictionariesWordContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "dictionariesWord">>;
  ssrHydration?: boolean;
}

export const DictionariesWordContextProvider: FunctionComponent<
  PropsWithChildren<DictionariesWordContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const [dictionariesWord, setDictionariesWord] = useLocalStorage<
    ContextStateValue<API.DictionariesWords>
  >(
    "lms",
    "dictionariesWord",
    getDefaultData("dictionariesWord", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  useEffect(() => {
    if (defaults) {
      defaults.dictionariesWord !== null &&
        setDictionariesWord({
          loading: false,
          value: defaults.dictionariesWord?.value,
          error: undefined,
        });
    }
  }, [defaults]);

  const fetchDictionariesWord = useCallback((slug: string, id: number) => {
    return fetchDataType<API.DictionariesWords>({
      controllers: abortControllers.current,
      controller: `dictionariesWord${id}`,
      id: id,
      mode: "value",
      fetchAction: getDictionariesWord.bind(null, apiUrl)(slug, id, {
        signal: abortControllers.current?.[`dictionariesWord${id}`]?.signal,
      }),
      setState: setDictionariesWord,
    });
  }, []);

  return (
    <DictionariesWordContext.Provider
      value={{
        dictionariesWord,
        fetchDictionariesWord,
      }}
    >
      {children}
    </DictionariesWordContext.Provider>
  );
};
