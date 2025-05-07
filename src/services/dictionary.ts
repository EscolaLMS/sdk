import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types";

/**  GET /api/dictionaries/{slug}/words */
export async function dictionariesWords(
  apiUrl: string,
  slug: string,
  params?: API.DictionariesWordsParams,
  options?: RequestOptionsInit
) {
  return request<API.DefaultMetaResponse<API.DictionariesWords>>(
    `${apiUrl}/api/dictionaries/${slug}/words`,
    {
      method: "GET",
      params,
      ...(options || {}),
    }
  );
}

/**  GET /api/dictionaries/{slug}/words/{id} */
export async function dictionariesWord(
  apiUrl: string,
  slug: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.DictionariesWords>>(
    `${apiUrl}/api/dictionaries/${slug}/words/${id}`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/**  GET /api/dictionaries/{slug}/words/categories */
export async function dictionariesWordsCategories(
  apiUrl: string,
  slug: string,
  params?: API.DictionariesParams,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.DictionariesWordsCategory[]>>(
    `${apiUrl}/api/dictionaries/${slug}/words/categories`,
    {
      method: "GET",
      params,
      ...(options || {}),
    }
  );
}

/**  GET /api/dictionaries/access */
export async function dictionariesAccess(
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.DictionariesAccess>>(
    `${apiUrl}/api/dictionaries/access`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...(options || {}),
    }
  );
}
