import request from "umi-request";
import * as API from "../types/api";

/**  GET /api/courses */
export async function uniqueTags() {
  return request<API.DataResponseSuccess<API.Tag[]>>(`/api/tags/unique`, {
    method: "GET",
  });
}
