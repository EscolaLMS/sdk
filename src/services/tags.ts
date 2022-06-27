import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";

/**  GET /api/courses */
export async function uniqueTags(options?: RequestOptionsInit) {
  return request<API.DefaultResponse<API.Tag[]>>(`/api/tags/unique`, {
    method: "GET",
    ...(options || {}),
  });
}
