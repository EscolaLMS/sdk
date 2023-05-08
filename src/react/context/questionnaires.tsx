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
  getQuestionnaireStars,
  getQuestionnaires,
  getQuestionnairesAnswer,
  questionnaireAnswer,
  questionnaireStars,
} from "../../services/questionnaire";
import { UserContext } from "./user";
import { PaginationParams } from "../../types/api";
import { API } from "../..";

export const QuestionnairesContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    | "fetchQuestionnaires"
    | "fetchQuestionnaire"
    | "fetchQuestionnairesAnswers"
    | "fetchQuestionnaireStars"
    | "sendQuestionnaireAnswer"
  >
> = createContext({
  fetchQuestionnaires: defaultConfig.fetchQuestionnaires,
  fetchQuestionnaire: defaultConfig.fetchQuestionnaire,
  fetchQuestionnairesAnswers: defaultConfig.fetchQuestionnairesAnswers,
  fetchQuestionnaireStars: defaultConfig.fetchQuestionnaireStars,
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
    (model: string, id: number) =>
      getQuestionnaires.bind(null, apiUrl)(model, id),
    []
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

  const fetchQuestionnairesAnswers = useCallback(
    (
      modelTypeTitle: string,
      modelID: number,
      id: number,
      params?: API.PaginationParams
    ) =>
      getQuestionnairesAnswer.bind(null, apiUrl)(
        modelTypeTitle,
        modelID,
        id,
        params
      ),
    []
  );

  const fetchQuestionnaireStars = useCallback(
    (modelTypeTitle: string, modelID: number, id: number) =>
      getQuestionnaireStars.bind(null, apiUrl)(modelTypeTitle, modelID, id),
    []
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
        fetchQuestionnairesAnswers,
        sendQuestionnaireAnswer,
        fetchQuestionnaireStars,
      }}
    >
      {children}
    </QuestionnairesContext.Provider>
  );
};
