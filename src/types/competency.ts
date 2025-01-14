import { DefaultMetaResponse, Nullable, PaginationParams } from "./core";
import { CompetencyChallengeType } from "./enums";
import { Author } from "./user";

export type Scale = {
  parent_category_id: number;
  category_id: number;
  scale_min: number;
};

export type ResultValue = {
  category_id: number;
  scale_category_id: number;
  parent_category_id: number;
  score: number;
  max_score: number;
  matched_course: number[];
};

export type CompetencyTestResults = {
  attempt_id: number;
  created_at: string;
  id: number;
  scale: Scale[][];
  value: ResultValue[];
};

export type CompetencyChallengeCategory = {
  id: number;
  name: string;
  parent_id?: number;
};

export type BaseCompetencyChallenge = {
  id: number;
  name: string;
  description: string;
  summary: string;
  image_path?: Nullable<string>;
  is_active: boolean;
  is_highlighted: boolean;
  quiz_id?: Nullable<number>;
  created_at: Date | string;
  categories?: number[];
  authors?: Author[];
  results: CompetencyTestResults[];
  results_count: number;
};

export type SimpleCompetencyChallenge = BaseCompetencyChallenge & {
  type: CompetencyChallengeType.Simple;
  category: CompetencyChallengeCategory;
};

export type ComplexCompetencyChallenge = BaseCompetencyChallenge & {
  type: CompetencyChallengeType.Complex;
};

export type CompetencyChallenge =
  | SimpleCompetencyChallenge
  | ComplexCompetencyChallenge;

export type ChallengesList = DefaultMetaResponse<CompetencyChallenge>;

export type ChallengesParams = PaginationParams & {
  order_by?: "id" | "name" | "created_at";
  type?: "simple" | "complex";
  order?: "ASC" | "DESC";
  name?: string;
};
