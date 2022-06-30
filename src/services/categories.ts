import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";

/**  GET /api/courses */
export async function categoryTree(
  apiUrl: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Category[]>>(
    `${apiUrl}/api/categories/tree`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
