import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";

/**  GET /api/courses */
export async function categoryTree(options?: RequestOptionsInit) {
  return request<API.DefaultResponse<API.Category[]>>(`/api/categories/tree`, {
    method: "GET",
    ...(options || {}),
  });
}
