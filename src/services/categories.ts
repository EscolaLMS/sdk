import request from "umi-request";
import * as API from "../types/api";

/**  GET /api/courses */
export async function categoryTree() {
  return request<API.DataResponseSuccess<API.Category[]>>(
    `/api/categories/tree`,
    {
      method: "GET",
    }
  );
}
