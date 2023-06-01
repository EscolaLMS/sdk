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
import { subjects as getSubjects } from "./../../services/student/subjects";
import { UserContext } from "./user";

export const SchedulesContext: React.Context<
  Pick<EscolaLMSContextConfig, "schedules" | "fetchSchedules">
> = createContext({
  schedules: defaultConfig.schedules,
  fetchSchedules: defaultConfig.fetchSchedules,
});

export interface SchedulesContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "schedules">>;
  ssrHydration?: boolean;
}

export const SchedulesContextProvider: FunctionComponent<
  PropsWithChildren<SchedulesContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (defaults) {
      defaults.schedules !== null &&
        setSchedules({
          loading: false,
          list: defaults.schedules?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [schedules, setSchedules] = useLocalStorage<
    ContextPaginatedMetaState<API.ScheduleData>
  >(
    "lms",
    "schedules",
    getDefaultData("schedules", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchSchedules = useCallback(
    (params?: API.PaginationParams) => {
      return token
        ? fetchDataType<any>({
            controllers: abortControllers.current,
            controller: `schedules/${JSON.stringify(params)}`,
            mode: "paginated",
            fetchAction: getSubjects.bind(null, apiUrl)(token, params, {
              signal:
                abortControllers.current[`schedules/${JSON.stringify(params)}`]
                  ?.signal,
            }),
            setState: setSchedules,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  return (
    <SchedulesContext.Provider
      value={{
        schedules,
        fetchSchedules,
      }}
    >
      {children}
    </SchedulesContext.Provider>
  );
};
