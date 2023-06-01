import request, { RequestOptionsInit } from "umi-request";
import * as API from "../../types/api";

/**  GET /api/lesson-groups */
export async function subjects(
  apiUrl: string,
  token: string,
  params?: API.PaginationParams,
  options?: RequestOptionsInit
) {
  return request<API.SchedulesList>(`${apiUrl}/api/schedules`, {
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
