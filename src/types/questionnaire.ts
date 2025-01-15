import { API } from "..";

export type QuestionnaireStarsRated = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

export type QuestionnaireStars = {
  sum_rates: number;
  count_answers: number;
  avg_rate: number;
  rates: QuestionnaireStarsRated;
};

export type QuestionnaireStarsModel = {
  sum_rates: number;
  count_answers: number;
  avg_rate: number;
};

export type QuestionnaireQuestion = {
  active: boolean;
  description: string;
  id: number;
  position: number;
  public_answers: boolean;
  questionnaire_id: number;
  title: string;
  type: string;
};

export type QuestionnaireModel = {
  id: number;
  model_id: number;
  model_title: string;
  model_type_class: string;
  model_type_id: number;
  model_type_title: string;
  target_goroup?: "user" | "author";
  display_frequency_minutes?: number;
};

export type Questionnaire = Pick<
  EscolaLms.Questionnaire.Models.Questionnaire,
  "active" | "id" | "title"
> & {
  models: QuestionnaireModel[];
  questions: QuestionnaireQuestion[];
  taget_group: "user" | "author";
  display_frequency_minutes: number;
};

export type QuestionnaireAnswerResponse = {
  id: number;
  questions: QuestionnaireQuestionWithAnswer[];
  title: string;
};

export type QuestionnaireQuestionWithAnswer = {
  id: number;
  title: string;
  description: string;
  rate: number | null;
  type: QuestionnaireType;
  note: string | null;
};

export type QuestionnaireType = "rate" | "review" | "text";

export type QuestionAnswer = {
  id: number;
  user_id: number;
  question_id: number;
  question_title: string;
  questionnaire_model_id: number;
  rate: number;
  note: string;
  updated_at: string;
  visible_on_front: boolean;
  user: Pick<API.UserItem, "avatar" | "id" | "name">;
};

export type QuestionnaireAnswersParams = {
  type: QuestionnaireType;
  order_by: "created_at" | "updated_at" | "rate";
  order: "ASC" | "DESC";
};
