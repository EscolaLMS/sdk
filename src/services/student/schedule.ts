import request, { RequestOptionsInit } from "umi-request";
import * as API from "../../types/api";

/**  GET /api/schedule */
export async function schedule(
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.Schedule>(`${apiUrl}/api/schedules`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

export async function attendances(
  apiUrl: string,
  token: string,
  groupId: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Attendance[]>>(
    `${apiUrl}/api/schedules/groups/${groupId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...(options || {}),
    }
  );
}
