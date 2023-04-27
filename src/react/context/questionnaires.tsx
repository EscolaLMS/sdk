import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";
import { EscolaLMSContextConfig, EscolaLMSContextReadConfig } from "./types";
import { defaultConfig } from "./defaults";
import {
  getQuestionnaire,
  getQuestionnaires,
  questionnaireAnswer,
} from "../../services/questionnaire";
import { UserContext } from "./user";

export const QuestionnairesContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    "fetchQuestionnaires" | "fetchQuestionnaire" | "sendQuestionnaireAnswer"
  >
> = createContext({
  fetchQuestionnaires: defaultConfig.fetchQuestionnaires,
  fetchQuestionnaire: defaultConfig.fetchQuestionnaire,
  sendQuestionnaireAnswer: defaultConfig.sendQuestionnaireAnswer,
});

export interface QuestionnairesContextProviderType {
  apiUrl: string;
  ssrHydration?: boolean;
}

export const QuestionnairesContextProvider: FunctionComponent<
  PropsWithChildren<QuestionnairesContextProviderType>
> = ({ children, apiUrl, ssrHydration }) => {
  const { token } = useContext(UserContext);

  const fetchQuestionnaires = useCallback(
    (model: string, id: number) => {
      return token
        ? getQuestionnaires.bind(null, apiUrl)(token, model, id)
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchQuestionnaire = useCallback(
    (modelTypeTitle: string, modelID: number, id: number) => {
      return token
        ? getQuestionnaire.bind(null, apiUrl)(
            token,
            modelTypeTitle,
            modelID,
            id
          )
        : Promise.reject("noToken");
    },
    [token]
  );

  const sendQuestionnaireAnswer = useCallback(
    (
      model: string,
      modelID: number,
      id: number,
      body: Partial<EscolaLms.Questionnaire.Models.QuestionAnswer>
    ) => {
      return token
        ? questionnaireAnswer.bind(null, apiUrl)(
            token,
            model,
            modelID,
            id,
            body
          )
        : Promise.reject("noToken");
    },
    [token]
  );

  return (
    <QuestionnairesContext.Provider
      value={{
        fetchQuestionnaires,
        fetchQuestionnaire,
        sendQuestionnaireAnswer,
      }}
    >
      {children}
    </QuestionnairesContext.Provider>
  );
};
