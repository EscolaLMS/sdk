import request, { RequestOptionsInit } from "umi-request";
import * as API from "../../types";

export async function exams(
  apiUrl: string,
  token: string,
  params?: API.ExamsParams,
  options?: RequestOptionsInit
) {
  return request<API.ExamsList>(`${apiUrl}/api/exams`, {
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
