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
  ContextStateValue,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "./../../types/api";
import { getDefaultData } from "./index";
import { page as getPage } from "./../../services/pages";

export const PageContext: React.Context<
  Pick<EscolaLMSContextConfig, "page" | "fetchPage">
> = createContext({
  page: defaultConfig.page,
  fetchPage: defaultConfig.fetchPage,
});

export interface PageContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "page">>;
}

export const PageContextProvider: FunctionComponent<
  PropsWithChildren<PageContextProviderType>
> = ({ children, defaults, apiUrl }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const [page, setPage] = useLocalStorage<ContextStateValue<API.Page>>(
    "lms",
    "page",
    getDefaultData("page", {
      ...defaultConfig,
      ...defaults,
    })
  );

  const fetchPage = useCallback((slug: string) => {
    return fetchDataType<API.PageListItem>({
      controllers: abortControllers.current,
      controller: "page",
      mode: "value",
      fetchAction: getPage.bind(null, apiUrl)(slug, {
        signal: abortControllers.current?.page?.signal,
      }),
      setState: setPage,
    });
  }, []);

  return (
    <PageContext.Provider
      value={{
        page,
        fetchPage,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
