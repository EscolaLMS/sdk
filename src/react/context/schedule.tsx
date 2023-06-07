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
import { fetchDataType } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "./../../types/api";
import { getDefaultData } from "./index";
import { schedule as getSchedule } from "./../../services/student/schedule";
import { UserContext } from "./user";

export const ScheduleContext: React.Context<
  Pick<EscolaLMSContextConfig, "schedule" | "fetchSchedule">
> = createContext({
  schedule: defaultConfig.schedule,
  fetchSchedule: defaultConfig.fetchSchedule,
});

export interface ScheduleContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "schedule">>;
  ssrHydration?: boolean;
}

export const ScheduleContextProvider: FunctionComponent<
  PropsWithChildren<ScheduleContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (defaults) {
      defaults.schedule !== null &&
        setSchedule({
          loading: false,
          list: defaults.schedule?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [schedule, setSchedule] = useLocalStorage<
    ContextListState<API.ScheduleData>
  >(
    "lms",
    "schedule",
    getDefaultData("schedule", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchSchedule = useCallback(
    (params?: API.ScheduleParams) => {
      return token
        ? fetchDataType<API.ScheduleData>({
            controllers: abortControllers.current,
            controller: `schedule`,
            mode: "list",
            fetchAction: getSchedule.bind(null, apiUrl)(token, params, {
              signal: abortControllers.current?.schedule?.signal,
            }),
            setState: setSchedule,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  return (
    <ScheduleContext.Provider
      value={{
        schedule,
        fetchSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
