import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextPaginatedMetaState,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "./../../types/api";
import { getDefaultData } from "./index";
import { exams as getExams } from "./../../services/student/exams";
import { UserContext } from "./user";

export const ExamsContext: React.Context<
  Pick<EscolaLMSContextConfig, "exams" | "fetchExams">
> = createContext({
  exams: defaultConfig.exams,
  fetchExams: defaultConfig.fetchExams,
});

export interface ExamsContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "exams">>;
  ssrHydration?: boolean;
}

export const ExamsContextProvider: FunctionComponent<
  PropsWithChildren<ExamsContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (defaults) {
      defaults.exams !== null &&
        setExams({
          loading: false,
          list: defaults.exams?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [exams, setExams] = useLocalStorage<
    ContextPaginatedMetaState<API.Exam>
  >(
    "lms",
    "exams",
    getDefaultData("exams", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchExams = useCallback(
    (params?: API.ExamsParams) => {
      return token
        ? fetchDataType<API.Exam>({
            controllers: abortControllers.current,
            controller: `exams/${JSON.stringify(params)}`,
            mode: "paginated",
            fetchAction: getExams.bind(null, apiUrl)(token, params, {
              signal:
                abortControllers.current[`exams/${JSON.stringify(params)}`]
                  ?.signal,
            }),
            setState: setExams,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  return (
    <ExamsContext.Provider
      value={{
        exams,
        fetchExams,
      }}
    >
      {children}
    </ExamsContext.Provider>
  );
};
