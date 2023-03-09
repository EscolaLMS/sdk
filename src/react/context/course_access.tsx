import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from 'react';
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextPaginatedMetaState,
} from './types';
import { defaultConfig } from './defaults';
import { fetchDataType } from './states';

import { useLocalStorage } from '../hooks/useLocalStorage';
import * as API from './../../types/api';
import { getDefaultData } from './index';

import {
  courseAccess as getCourseAccess,
  createCourseAccess,
  deleteCourseAccess as deleteCourseAccessCall,
} from './../../services/course_access';
import { UserContext } from './user';

export const CourseAccessContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    | 'courseAccess'
    | 'fetchCourseAccess'
    | 'addCourseAccess'
    | 'deleteCourseAccess'
  >
> = createContext({
  courseAccess: defaultConfig.courseAccess,
  fetchCourseAccess: defaultConfig.fetchCourseAccess,
  addCourseAccess: defaultConfig.addCourseAccess,
  deleteCourseAccess: defaultConfig.deleteCourseAccess,
});

export interface CourseAccessContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, 'courseAccess'>>;
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
    'lms',
    'courseAccess',
    getDefaultData('courseAccess', {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchCourseAccess = useCallback(
    (
      filter: API.CourseAccessEnquiryListParams = {
        current_page: 0,
        per_page: 25,
      }
    ) => {
      return token
        ? fetchDataType<API.CourseAccessEnquiry>({
            controllers: abortControllers.current,
            controller: `courseAccess/${JSON.stringify(filter)}`,
            mode: 'paginated',
            fetchAction: getCourseAccess.bind(null, apiUrl)(token, filter, {
              signal:
                abortControllers.current[
                  `courseAccess/${JSON.stringify(filter)}`
                ]?.signal,
            }),
            setState: setCourseAccess,
          })
        : Promise.reject('noToken');
    },
    [token]
  );

  const addCourseAccess = useCallback(
    (
      data: EscolaLms.CourseAccess.Http.Requests.CreateCourseAccessEnquiryApiRequest & {
        data?: object;
      }
    ) => {
      return token
        ? createCourseAccess(apiUrl, token, data)
        : Promise.reject('noToken');
    },
    [token]
  );

  const deleteCourseAccess = useCallback(
    (id: number) => {
      // TODO: remove task on list and byID once it fine
      // TODO: what about error ?
      return token
        ? deleteCourseAccessCall(apiUrl, token, id)
        : Promise.reject('noToken');
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
      }}
    >
      {children}
    </CourseAccessContext.Provider>
  );
};
