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
  ContextStateValue,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType, handleNoTokenError } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "../../types";
import { getDefaultData } from "./index";
import { attendances as getAttendances } from "./../../services/student/schedule";
import { UserContext } from "./user";

export const AttendancesContext: React.Context<
  Pick<EscolaLMSContextConfig, "attendances" | "fetchAttendances">
> = createContext({
  attendances: defaultConfig.attendances,
  fetchAttendances: defaultConfig.fetchAttendances,
});

export interface AttendancesContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "attendances">>;
  ssrHydration?: boolean;
}

export const AttendancesContextProvider: FunctionComponent<
  PropsWithChildren<AttendancesContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});
  const { token } = useContext(UserContext);

  const [attendances, setAttendances] = useLocalStorage<
    ContextStateValue<API.Attendance[]>
  >(
    "lms",
    "task",
    getDefaultData("attendances", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchAttendances = useCallback(
    (groupId: number) => {
      return handleNoTokenError(
        token
          ? fetchDataType<API.Attendance[]>({
              controllers: abortControllers.current,
              controller: `attendances${groupId}`,
              id: groupId,
              mode: "value",
              fetchAction: getAttendances.bind(null, apiUrl)(token, groupId, {
                signal:
                  abortControllers.current?.[`attendances${groupId}`]?.signal,
              }),
              setState: setAttendances,
            })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  return (
    <AttendancesContext.Provider
      value={{
        attendances,
        fetchAttendances,
      }}
    >
      {children}
    </AttendancesContext.Provider>
  );
};
