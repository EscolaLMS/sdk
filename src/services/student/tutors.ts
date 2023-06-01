import request, { RequestOptionsInit } from "umi-request";
import * as API from "../../types/api";

export async function tutors(
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.LessonTutors>(`${apiUrl}/api/lesson-groups/tutors`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}
