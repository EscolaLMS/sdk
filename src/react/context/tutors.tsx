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
import { tutors as getTutors } from "./../../services/courses";

export const TutorsContext: React.Context<
  Pick<EscolaLMSContextConfig, "tutors" | "fetchTutors">
> = createContext({
  tutors: defaultConfig.tutors,
  fetchTutors: defaultConfig.fetchTutors,
});

export interface TutorsContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "tutors">>;
  ssrHydration?: boolean;
}

export const TutorsContextProvider: FunctionComponent<
  PropsWithChildren<TutorsContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  useEffect(() => {
    if (defaults) {
      defaults.tutors !== null &&
        setTutors({
          loading: false,
          list: defaults.tutors?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [tutors, setTutors] = useLocalStorage<ContextListState<API.UserItem>>(
    "lms",
    "tutors",
    getDefaultData("tutors", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchTutors = useCallback(() => {
    return fetchDataType<API.UserItem>({
      controllers: abortControllers.current,
      controller: `tutors`,
      mode: "list",
      fetchAction: getTutors.bind(
        null,
        apiUrl
      )({
        signal: abortControllers.current?.tutors?.signal,
      }),
      setState: setTutors,
    });
  }, []);

  return (
    <TutorsContext.Provider
      value={{
        tutors,
        fetchTutors,
      }}
    >
      {children}
    </TutorsContext.Provider>
  );
};
