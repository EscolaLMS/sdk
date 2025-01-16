import {
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
  ContextStateValue,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType, handleNoTokenError } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "../../types";
import { getDefaultData } from "./index";

import {
  courseAccess as getCourseAccess,
  createCourseAccess,
  deleteCourseAccess as deleteCourseAccessCall,
  myCourses as getMyCourses,
} from "./../../services/course_access";
import { UserContext } from "./user";

export const CourseAccessContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    | "courseAccess"
    | "fetchCourseAccess"
    | "addCourseAccess"
    | "deleteCourseAccess"
    | "myCourses"
    | "fetchMyCourses"
  >
> = createContext({
  courseAccess: defaultConfig.courseAccess,
  fetchCourseAccess: defaultConfig.fetchCourseAccess,
  addCourseAccess: defaultConfig.addCourseAccess,
  deleteCourseAccess: defaultConfig.deleteCourseAccess,
  myCourses: defaultConfig.myCourses,
  fetchMyCourses: defaultConfig.fetchMyCourses,
});

export interface CourseAccessContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "courseAccess">>;
  ssrHydration?: boolean;
}

export const CourseAccessContextProvider: FunctionComponent<
  PropsWithChildren<CourseAccessContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const { token } = useContext(UserContext);

  useEffect(() => {
    if (defaults) {
      defaults.courseAccess !== null &&
        setCourseAccess({
          loading: false,
          list: defaults.courseAccess?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [courseAccess, setCourseAccess] = useLocalStorage<
    ContextPaginatedMetaState<API.CourseAccessEnquiry>
  >(
    "lms",
    "courseAccess",
    getDefaultData("courseAccess", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const [myCourses, setMyCourses] = useLocalStorage<
    ContextStateValue<number[]>
  >(
    "lms",
    "myCourses",
    getDefaultData("myCourses", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchMyCourses = useCallback(() => {
    return handleNoTokenError(
      token
        ? getMyCourses(apiUrl, token).then((response) => {
            if (response.success) {
              setMyCourses((prevState) => ({
                value: response.data,
                loading: false,
                error: undefined,
              }));
            } else {
              setMyCourses((prevState) => ({
                ...prevState,
                loading: false,
                error: response,
              }));
            }
          })
        : Promise.reject("noToken")
    );
  }, [token]);

  const fetchCourseAccess = useCallback(
    (
      filter: API.CourseAccessEnquiryListParams = {
        current_page: 0,
        per_page: 25,
      }
    ) => {
      return handleNoTokenError(
        token
          ? fetchDataType<API.CourseAccessEnquiry>({
              controllers: abortControllers.current,
              controller: `courseAccess/${JSON.stringify(filter)}`,
              mode: "paginated",
              fetchAction: getCourseAccess.bind(null, apiUrl)(token, filter, {
                signal:
                  abortControllers.current[
                    `courseAccess/${JSON.stringify(filter)}`
                  ]?.signal,
              }),
              setState: setCourseAccess,
            })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const addCourseAccess = useCallback(
    (data: API.CourseAccessEnquiryCreateRequest) => {
      return handleNoTokenError(
        token
          ? createCourseAccess(apiUrl, token, data)
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const deleteCourseAccess = useCallback(
    (id: number) => {
      // TODO: remove task on list and byID once it fine
      // TODO: what about error ?
      return handleNoTokenError(
        token
          ? deleteCourseAccessCall(apiUrl, token, id)
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  return (
    <CourseAccessContext.Provider
      value={{
        courseAccess,
        fetchCourseAccess,
        addCourseAccess,
        deleteCourseAccess,
        myCourses,
        fetchMyCourses,
      }}
    >
      {children}
    </CourseAccessContext.Provider>
  );
};
