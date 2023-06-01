import request, { RequestOptionsInit } from "umi-request";
import * as API from "../../types/api";

/**  GET /api/schedule */
export async function schedule(
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.Schedule>(`${apiUrl}/api/schedule`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}
