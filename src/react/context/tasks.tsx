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
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType, handleNoTokenError } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "../../types";
import { getDefaultData } from "./index";

import {
  tasks as getTasks,
  createTask,
  deleteTask as deleteTaskCall,
} from "./../../services/tasks";
import { UserContext } from "./user";

export const TasksContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    "tasks" | "fetchTasks" | "addTask" | "deleteTask"
  >
> = createContext({
  tasks: defaultConfig.tasks,
  fetchTasks: defaultConfig.fetchTasks,
  addTask: defaultConfig.addTask,
  deleteTask: defaultConfig.deleteTask,
});

export interface TasksContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "tasks">>;
  ssrHydration?: boolean;
}

export const TasksContextProvider: FunctionComponent<
  PropsWithChildren<TasksContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const { token } = useContext(UserContext);

  useEffect(() => {
    if (defaults) {
      defaults.tasks !== null &&
        setTasks({
          loading: false,
          list: defaults.tasks?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [tasks, setTasks] = useLocalStorage<
    ContextPaginatedMetaState<API.Task>
  >(
    "lms",
    "tasks",
    getDefaultData("tasks", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchTasks = useCallback(
    (filter: API.TaskParams = { current: 0, pageSize: 25 }) => {
      return handleNoTokenError(
        token
          ? fetchDataType<API.Task>({
              controllers: abortControllers.current,
              controller: `tasks/${JSON.stringify(filter)}`,
              mode: "paginated",
              fetchAction: getTasks.bind(null, apiUrl)(token, filter, {
                signal:
                  abortControllers.current[`tasks/${JSON.stringify(filter)}`]
                    ?.signal,
              }),
              setState: setTasks,
            })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const addTask = useCallback(
    (data: EscolaLms.Tasks.Http.Requests.CreateTaskRequest) => {
      return handleNoTokenError(
        token ? createTask(apiUrl, token, data) : Promise.reject("noToken")
      );
    },
    [token]
  );

  const deleteTask = useCallback(
    (id: number) => {
      // TODO: remove task on list and byID once it fine
      // TODO: what about error ?
      return handleNoTokenError(
        token ? deleteTaskCall(apiUrl, token, id) : Promise.reject("noToken")
      );
    },
    [token]
  );

  return (
    <TasksContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
