import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useContext,
} from "react";
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextStateValue,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType, handleNoTokenError } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "../../types";
import { getDefaultData } from "./index";

import {
  semesters as getSemesters,
  academicYears as getAcademicYears,
} from "./../../services/student/studentDetails";

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
    (params?: API.SemestersParams) => {
      return handleNoTokenError(
        token
          ? fetchDataType<API.SemesterData>({
              controllers: abortControllers.current,
              controller: `semesters`,
              mode: "list",
              fetchAction: getSemesters.bind(null, apiUrl)(token, params, {
                signal: abortControllers.current?.semesters?.signal,
              }),
              setState: setSemesters,
            })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const fetchAcademicYears = useCallback(
    (params?: API.AcademicYearParams) => {
      return handleNoTokenError(
        token
          ? fetchDataType<API.AcademicYear>({
              controllers: abortControllers.current,
              controller: `academicYears`,
              mode: "list",
              fetchAction: getAcademicYears.bind(null, apiUrl)(token, params, {
                signal: abortControllers.current?.semesters?.signal,
              }),
              setState: setAcademicYears,
            })
          : Promise.reject("noToken")
      );
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
