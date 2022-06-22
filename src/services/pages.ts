import request from "umi-request";
import * as API from "../types/api";
import type { RequestOptionsInit } from "umi-request";

/**  GET /api/pages */
export async function pages(options?: RequestOptionsInit) {
  return request<API.PageList>(`/api/pages`, {
    method: "GET",
    ...(options || {}),
  });
}

/**  GET /api/pages/:slug */
export async function page(slug: string, options?: RequestOptionsInit) {
  return request<API.DefaultResponse<API.PageListItem>>(`/api/pages/${slug}`, {
    method: "GET",
    ...(options || {}),
  });
}
