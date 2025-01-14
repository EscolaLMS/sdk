import { Category, PaginationParams } from "./core";

export type DictionariesParams = {
  word?: string;
  // Example: url?category_ids[]=1&category_ids[]=2category_ids[]=3
  "category_ids[]"?: number[];
  word_start?: string;
  abort_prev?: boolean;
};

export type DictionariesWordsParams = DictionariesParams & PaginationParams;

export type DictionariesWordsCategory = Pick<
  Category,
  "name" | "name_with_breadcrumbs" | "id"
>;

export type DictionaryWordData = {
  id?: number;
  title?: string;
  description?: string;
  video_url?: string;
};

export type DictionariesWords = {
  id: number;
  word: string;
  dictionary_id: number;
  created_at: string;
  updated_at: string;
  categories: DictionariesWordsCategory[];
  description?: string;
  data?: {
    descriptions?: DictionaryWordData[];
  };
};

export type DictionariesAccess = {
  dictionary_id: number;
  name: string;
  slug: string;
  end_date: string;
  is_active: boolean;
};
