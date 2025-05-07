import { PageParams, PaginationParams } from "./core";
import { QuestionType } from "./enums";

type QuizQuestionBase = {
  id: number;
  question: string;
  score: number;
  title: string;
  type: QuestionType;
};

export type QuizQuestion_MultipleChoice = QuizQuestionBase & {
  options: { answers: string[] };
  type: QuestionType.MULTIPLE_CHOICE;
};
export type QuizQuestion_MultipleChoiceWithMultipleRightAnswers =
  QuizQuestionBase & {
    options: { answers: string[] };
    type: QuestionType.MULTIPLE_CHOICE_WITH_MULTIPLE_RIGHT_ANSWERS;
  };
export type QuizQuestion_TrueFalse = QuizQuestionBase & {
  options: unknown[];
  type: QuestionType.TRUE_FALSE;
};
export type QuizQuestion_ShortAnswers = QuizQuestionBase & {
  options: unknown[];
  type: QuestionType.SHORT_ANSWERS;
};
export type QuizQuestion_Matching = QuizQuestionBase & {
  options: {
    sub_questions: string[];
    sub_answers: string[];
  };
  type: QuestionType.MATCHING;
};
export type QuizQuestion_NumericalQuestion = QuizQuestionBase & {
  options: unknown[];
  type: QuestionType.NUMERICAL_QUESTION;
};
export type QuizQuestion_Essay = QuizQuestionBase & {
  options: unknown[];
  type: QuestionType.ESSAY;
};
export type QuizQuestion_Description = QuizQuestionBase & {
  options: unknown[];
  type: QuestionType.DESCRIPTION;
};

export type QuizQuestion =
  | QuizQuestion_MultipleChoice
  | QuizQuestion_MultipleChoiceWithMultipleRightAnswers
  | QuizQuestion_TrueFalse
  | QuizQuestion_ShortAnswers
  | QuizQuestion_Matching
  | QuizQuestion_NumericalQuestion
  | QuizQuestion_Essay
  | QuizQuestion_Description;

export type QuizAttempt = EscolaLms.TopicTypeGift.Models.QuizAttempt & {
  max_score: number;
  questions: QuizQuestion[];
  result_score: number;
};

export type QuizAttemptsParams = PageParams &
  PaginationParams & { topic_gift_quiz_id: number };
