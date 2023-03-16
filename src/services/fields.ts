import request from "umi-request";
import type { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";

/**  GET /api/model-fields */
export async function fields(
  apiUrl: string,
  params: {
    class_type: string;
  },
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Metadata[]>>(
    `${apiUrl}/api/model-fields`,
    {
      method: "GET",
      params,
      ...(options || {}),
    }
  );
}
