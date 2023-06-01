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

export const SubjectsContext: React.Context<
  Pick<EscolaLMSContextConfig, "subjects" | "fetchSubjects">
> = createContext({
  subjects: defaultConfig.subjects,
  fetchSubjects: defaultConfig.fetchSubjects,
});

export interface SubjectsContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "subjects">>;
  ssrHydration?: boolean;
}

export const SubjectsContextProvider: FunctionComponent<
  PropsWithChildren<SubjectsContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (defaults) {
      defaults.subjects !== null &&
        setSubjects({
          loading: false,
          list: defaults.subjects?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [subjects, setSubjects] = useLocalStorage<
    ContextPaginatedMetaState<API.GroupSubject>
  >(
    "lms",
    "subjects",
    getDefaultData("subjects", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchSubjects = useCallback(() => {
    return token
      ? fetchDataType<API.GroupSubject>({
          controllers: abortControllers.current,
          controller: `subjects`,
          mode: "paginated",
          fetchAction: getSubjects.bind(null, apiUrl)(token, {
            signal: abortControllers.current?.subjects?.signal,
          }),
          setState: setSubjects,
        })
      : Promise.reject("noToken");
  }, [token]);
  return (
    <SubjectsContext.Provider
      value={{
        subjects,
        fetchSubjects,
      }}
    >
      {children}
    </SubjectsContext.Provider>
  );
};
