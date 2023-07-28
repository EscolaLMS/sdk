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
import { fetchDataType } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "./../../types/api";
import { getDefaultData } from "./index";

import {
  challenges as getChallenges,
  singleChallenge as getSingleChallenge,
} from "./../../services/challenges";
import { UserContext } from "./user";

export const ChallengesContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    "challenges" | "fetchChallenges" | "challenge" | "fetchChallenge"
  >
> = createContext({
  challenges: defaultConfig.challenges,
  fetchChallenges: defaultConfig.fetchChallenges,
  challenge: defaultConfig.challenge,
  fetchChallenge: defaultConfig.fetchChallenge,
});

export interface ChallengesContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "challenges">>;
  ssrHydration?: boolean;
}

export const ChallengesContextProvider: FunctionComponent<
  PropsWithChildren<ChallengesContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (defaults) {
      defaults.challenges !== null &&
        setChallenges({
          loading: false,
          list: defaults.challenges?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [challenges, setChallenges] = useLocalStorage<
    ContextPaginatedMetaState<API.CompetencyChallenge>
  >(
    "lms",
    "challenges",
    getDefaultData("challenges", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const [challenge, setChallenge] = useLocalStorage<
    ContextStateValue<API.CompetencyChallenge>
  >(
    "lms",
    "challenge",
    getDefaultData("challenge", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchChallenges = useCallback(
    (filter?: API.ChallengesParams) => {
      return token
        ? fetchDataType<API.CompetencyChallenge>({
            controllers: abortControllers.current,
            controller: `challenges/${JSON.stringify(filter)}`,
            mode: "paginated",
            fetchAction: getChallenges.bind(null, apiUrl)(token, filter, {
              signal:
                abortControllers.current[`challenges/${JSON.stringify(filter)}`]
                  ?.signal,
            }),
            setState: setChallenges,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchChallenge = useCallback(
    (id: number) => {
      return token
        ? fetchDataType<API.CompetencyChallenge>({
            controllers: abortControllers.current,
            controller: `challenge${id}`,
            id: id,
            mode: "value",
            fetchAction: getSingleChallenge.bind(null, apiUrl)(token, id, {
              signal: abortControllers.current?.[`challenge${id}`]?.signal,
            }),
            setState: setChallenge,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  return (
    <ChallengesContext.Provider
      value={{
        challenges,
        fetchChallenges,
        challenge,
        fetchChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};
