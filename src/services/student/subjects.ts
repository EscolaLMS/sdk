import request, { RequestOptionsInit } from "umi-request";
import * as API from "../../types";

/**  GET /api/lesson-groups */
export async function subjects(
  apiUrl: string,
  token: string,
  params?: API.SubjectsParams,
  options?: RequestOptionsInit
) {
  return request<API.SubjectsList>(`${apiUrl}/api/lesson-groups`, {
    method: "GET",
    params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}
