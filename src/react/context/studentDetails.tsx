import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useContext,
} from "react";
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextPaginatedMetaState,
  ContextStateValue,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "./../../types/api";
import { getDefaultData } from "./index";

import {
  semesters as getSemesters,
  academicYears as getAcademicYears,
} from "./../../services/student/studentDetails";

import { changePassword as postNewPassword } from "../../services/profile";
import { UserContext } from "./user";

type StudentDetailsContextType = Pick<
  EscolaLMSContextConfig,
  "fetchSemesters" | "semesters" | "fetchAcademicYears" | "academicYears"
>;

export const StudentDetailsContext: React.Context<StudentDetailsContextType> =
  createContext<StudentDetailsContextType>({
    semesters: defaultConfig.semesters,
    fetchSemesters: defaultConfig.fetchSemesters,
    academicYears: defaultConfig.academicYears,
    fetchAcademicYears: defaultConfig.fetchAcademicYears,
  });

export interface StudentDetailsContextProviderType {
  apiUrl: string;
  defaults?: Partial<
    Pick<EscolaLMSContextReadConfig, "semesters" | "academicYears">
  >;

  ssrHydration?: boolean;
}

export const StudentDetailsContextProvider: FunctionComponent<
  PropsWithChildren<StudentDetailsContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});
  const { token } = useContext(UserContext);

  const [academicYears, setAcademicYears] = useLocalStorage<
    ContextStateValue<API.AcademicYear>
  >(
    "lms",
    "academicYears",
    getDefaultData("academicYears", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const [semesters, setSemesters] = useLocalStorage<
    ContextStateValue<API.SemesterData>
  >(
    "lms",
    "semesters",
    getDefaultData("semesters", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchSemesters = useCallback(
    (yearId: number) => {
      return token
        ? fetchDataType<API.SemesterData>({
            controllers: abortControllers.current,
            controller: `semesters`,
            mode: "list",
            fetchAction: getSemesters.bind(null, apiUrl)(token, yearId, {
              signal: abortControllers.current?.semesters?.signal,
            }),
            setState: setSemesters,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchAcademicYears = useCallback(
    (active?: boolean) => {
      return token
        ? fetchDataType<API.AcademicYear>({
            controllers: abortControllers.current,
            controller: `academicYears`,
            mode: "list",
            fetchAction: getAcademicYears.bind(null, apiUrl)(token, active, {
              signal: abortControllers.current?.semesters?.signal,
            }),
            setState: setAcademicYears,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  return (
    <StudentDetailsContext.Provider
      value={{
        academicYears,
        fetchAcademicYears,
        fetchSemesters,
        semesters,
      }}
    >
      {children}
    </StudentDetailsContext.Provider>
  );
};
