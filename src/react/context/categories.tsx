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
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "../../types";
import { getDefaultData } from "./index";
import { categoryTree as getCategoryTree } from "./../../services/categories";

export const CategoriesContext: React.Context<
  Pick<EscolaLMSContextConfig, "categoryTree" | "fetchCategories">
> = createContext({
  categoryTree: defaultConfig.categoryTree,
  fetchCategories: defaultConfig.fetchCategories,
});

export interface CategoriesContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "categoryTree">>;
  ssrHydration?: boolean;
}

export const CategoriesContextProvider: FunctionComponent<
  PropsWithChildren<CategoriesContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  useEffect(() => {
    if (defaults) {
      defaults.categoryTree !== null &&
        setCategoryTree({
          loading: false,
          list: defaults.categoryTree?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [categoryTree, setCategoryTree] = useLocalStorage<
    ContextListState<API.Category>
  >(
    "lms",
    "categoryTree",
    getDefaultData("categoryTree", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchCategories = useCallback(() => {
    return fetchDataType<API.Category>({
      controllers: abortControllers.current,
      controller: `categories`,
      mode: "list",
      fetchAction: getCategoryTree.bind(
        null,
        apiUrl
      )({
        signal: abortControllers.current?.categories?.signal,
      }),
      setState: setCategoryTree,
    });
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categoryTree,
        fetchCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
