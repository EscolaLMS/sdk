import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
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

import { dictionariesAccess as getDictionariesAccess } from "../../../services/dictionary";

export const DictionariesAccessContext: React.Context<
  Pick<EscolaLMSContextConfig, "dictionariesAccess" | "fetchDictionariesAccess">
> = createContext({
  dictionariesAccess: defaultConfig.dictionariesAccess,
  fetchDictionariesAccess: defaultConfig.fetchDictionariesAccess,
});

export interface DictionariesAccessContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "dictionariesAccess">>;
  ssrHydration?: boolean;
}

export const DictionariesAccessContextProvider: FunctionComponent<
  PropsWithChildren<DictionariesAccessContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const [dictionariesAccess, setDictionariesAccess] = useLocalStorage<
    ContextStateValue<API.DictionariesAccess>
  >(
    "lms",
    "dictionariesAccess",
    getDefaultData("dictionariesAccess", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchDictionariesAccess = useCallback(() => {
    return fetchDataType<API.DictionariesAccess>({
      controllers: abortControllers.current,
      controller: `dictionariesAccess`,
      mode: "value",
      fetchAction: getDictionariesAccess.bind(null, apiUrl)({
        signal: abortControllers.current?.[`dictionariesAccess`]?.signal,
      }),
      setState: setDictionariesAccess,
    });
  }, []);

  return (
    <DictionariesAccessContext.Provider
      value={{
        dictionariesAccess,
        fetchDictionariesAccess,
      }}
    >
      {children}
    </DictionariesAccessContext.Provider>
  );
};
