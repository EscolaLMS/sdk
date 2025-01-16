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
  ContextListState,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType, handleNoTokenError } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "../../types";
import { getDefaultData } from "./index";
import { tutors as getTutors } from "./../../services/student/tutors";
import { UserContext } from "./user";

export const ScheduleTutorsContext: React.Context<
  Pick<EscolaLMSContextConfig, "scheduleTutors" | "fetchScheduleTutors">
> = createContext({
  scheduleTutors: defaultConfig.scheduleTutors,
  fetchScheduleTutors: defaultConfig.fetchScheduleTutors,
});

export interface ScheduleTutorsContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "scheduleTutors">>;
  ssrHydration?: boolean;
}

export const ScheduleTutorsContextProvider: FunctionComponent<
  PropsWithChildren<ScheduleTutorsContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (defaults) {
      defaults.scheduleTutors !== null &&
        setScheduleTutors({
          loading: false,
          list: defaults.scheduleTutors?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [scheduleTutors, setScheduleTutors] = useLocalStorage<
    ContextListState<API.LessonTutor>
  >(
    "lms",
    "scheduleTutors",
    getDefaultData("scheduleTutors", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchScheduleTutors = useCallback(() => {
    return handleNoTokenError(
      token
        ? fetchDataType<API.LessonTutor>({
            controllers: abortControllers.current,
            controller: `scheduleTutors`,
            mode: "list",
            fetchAction: getTutors.bind(null, apiUrl)(token, {
              signal: abortControllers.current?.scheduleTutors?.signal,
            }),
            setState: setScheduleTutors,
          })
        : Promise.reject("noToken")
    );
  }, [token]);

  return (
    <ScheduleTutorsContext.Provider
      value={{
        scheduleTutors,
        fetchScheduleTutors,
      }}
    >
      {children}
    </ScheduleTutorsContext.Provider>
  );
};
