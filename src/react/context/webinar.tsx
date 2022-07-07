import React, {
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
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType } from "./states";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "./../../types/api";
import { getDefaultData } from "./index";
import { getWebinar } from "./../../services/webinars";

export const WebinarContext: React.Context<
  Pick<EscolaLMSContextConfig, "webinar" | "fetchWebinar">
> = createContext({
  webinar: defaultConfig.webinar,
  fetchWebinar: defaultConfig.fetchWebinar,
});

export interface WebinarContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "webinar">>;
}

export const WebinarContextProvider: FunctionComponent<
  PropsWithChildren<WebinarContextProviderType>
> = ({ children, defaults, apiUrl }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const [webinar, setWebinar] = useLocalStorage<
    ContextStateValue<EscolaLms.Webinar.Models.Webinar>
  >(
    "lms",
    "webinar",
    getDefaultData("webinar", {
      ...defaultConfig,
      ...defaults,
    })
  );

  const fetchWebinar = useCallback((id: number) => {
    return fetchDataType<API.Webinar>({
      controllers: abortControllers.current,
      controller: `webinar`,
      mode: "value",
      fetchAction: getWebinar.bind(null, apiUrl)(id, {
        signal: abortControllers.current?.webinar?.signal,
      }),
      setState: setWebinar,
    });
  }, []);

  return (
    <WebinarContext.Provider
      value={{
        webinar,
        fetchWebinar,
      }}
    >
      {children}
    </WebinarContext.Provider>
  );
};
