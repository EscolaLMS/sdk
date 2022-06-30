import request from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

export async function changePassword(
  apiUrl: string,
  token: string,
  body: API.ChangePasswordRequest
) {
  return request<API.AuthResponse>(`${apiUrl}/api/profile/password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    data: body,
  });
}
