import { IEvent } from "./enums";
import { UserItem } from "./user";

export type Nullable<T> = T | null | undefined;

export type AppCurrency = {
  default: string;
  enum: string[];
};

export type AppSettings = any & {
  currencies?: AppCurrency;
  consents?: {
    [key: string]: string;
  };
  faq?: {
    [key: string]: string;
  };
  homepage?: Record<string, Record<string, string>>;
  register?: {
    [key: string]: string;
  };
  env?: string;
  stripe?: {
    publishable_key: string;
  };
  global?: {
    [key: string]: string;
  };
};

export type AppConfig = Record<string, Record<string, string[] | string>>;

export type IStatement = {
  actor: unknown;
  context: {
    contextActivities: {
      category: IStatementCategory[];
      parent?: IStatementCategory[];
    };
  };
  object: unknown;
  result?: IResult;
  verb: { id: IEvent };
};

export type IStatementCategory = {
  id: string;
  objectType: "string";
};

export type IScore = {
  min: number;
  raw: number;
  max: number;
  scaled: number;
};

export type IResult = {
  completion: boolean;
  duration: string;
  response: string;
  score: IScore;
};

export type PaginatedList<Model> = {
  current_page: number;
  data: Model[];
  next_page_url: string;
  path: string;
  per_page: number | string;
  prev_page_url: string;
  to: number;
  total: number;
  last_page: number;
};

export type PaginatedMetaList<Model> = {
  data: Model[];
  meta: {
    current_page: number;
    next_page_url: string;
    last_page: number;
    path: string;
    per_page: number | string;
    prev_page_url: string | null;
    to: number;
    total: number;
    links:
      | {
          first: string;
          last: string;
          next: string;
          prev: string;
        }
      | { url: string | null; label: string; active: boolean }[];
  };
};

export type DefaultResponseSuccess<Model> = {
  success: true;
  data: Model;
  message: string;
};

export type DataResponseSuccess<Model> = {
  data: Model;
};

export type DefaultResponseError = {
  success: false;
  message: string;
  error: string;
  errors: { [key: string]: string[] };
};

export type DefaultResponse<Model> =
  | DefaultResponseSuccess<Model>
  | DefaultResponseError;

export type DataResponse<Model> =
  | DataResponseSuccess<Model>
  | DefaultResponseError;

export type DefaultMetaResponse<Model> =
  | (PaginatedMetaList<Model> & {
      message: string;
      success: true;
    })
  | DefaultResponseError;

export type RawResponse<Model> = Model | DefaultResponseError;

export type SuccessResponse = { success: true } | DefaultResponseError;

export type PaginationParams = {
  order_by?: string;
  order?: "ASC" | "DESC";
  page?: number;
  per_page?: number;
};

export type PageParams = {
  current?: number;
  pageSize?: number;
};

export type PaginatedListParams = {
  current_page: number;
  total?: number;
  per_page: number;
};

export type Json = string | number | Json[] | { [key: string]: Json };

export type Category = {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  parent_id?: number;
  icon?: string;
  icon_class: string;
  created_at: string;
  updated_at: string;
  order: number;
  pivot?: {
    course_id: number;
    category_id: number;
  };
  subcategories?: Category[];
  count?: number;
  count_free?: number;
  description?: string;
  name_with_breadcrumbs?: string;
};

export type Tag = {
  id: number;
  title: string;
  morphable_type: string;
  morphable_id: number;
  created_at: string;
  updated_at: string;
};

export type CategoryListItem = Category;

export type Pdf = {
  title: string;
};

export type FieldsParams = {
  class_type: string;
};

export type Metadata = Omit<EscolaLms.ModelFields.Models.Metadata, "rules"> & {
  rules: string | string[] | null;
};

export type Page = {
  id: number;
  slug: string;
  title: string;
  author_id: number;
  author: UserItem;
  content: string;
};

export type Template = {
  id: number;
  name: string;
  event: string;
  channel: string;
  created_at: Date;
  updated_at: Date;
  title: string | null;
  mail_theme: null;
  mail_markdown: null;
  is_default: boolean;
  assignable_type: null;
  assignable_id: null;
  default: boolean;
};

export type PageList = DefaultMetaResponse<Page>;
export type CategoryList = DataResponseSuccess<Category[]>;
export type PageListItem = Page;
