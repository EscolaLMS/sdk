import {
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
  ContextPaginatedMetaState,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "./../../types/api";
import { getDefaultData } from "./index";

import { course as getCourses } from "./../../services/courses";

export const CoursesContext: React.Context<
  Pick<EscolaLMSContextConfig, "courses" | "fetchCourses">
> = createContext({
  courses: defaultConfig.courses,
  fetchCourses: defaultConfig.fetchCourses,
});

export interface CoursesContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "courses">>;
  ssrHydration?: boolean;
}

export const CoursesContextProvider: FunctionComponent<
  PropsWithChildren<CoursesContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  useEffect(() => {
    if (defaults) {
      defaults.courses !== null &&
        setCourses({
          loading: false,
          list: defaults.courses?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [courses, setCourses] = useLocalStorage<
    ContextPaginatedMetaState<API.CourseListItem>
  >(
    "lms",
    "courses",
    getDefaultData("courses", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchCourses = useCallback((filter: API.CourseParams) => {
    return fetchDataType<API.Course>({
      controllers: abortControllers.current,
      controller: `courses/${JSON.stringify(filter)}`,
      mode: "paginated",
      fetchAction: getCourses.bind(null, apiUrl)(filter, {
        signal:
          abortControllers.current[`courses/${JSON.stringify(filter)}`]?.signal,
      }),
      setState: setCourses,
    });
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        fetchCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
