import request from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

export async function changePassword(
  token: string,
  body: API.ChangePasswordRequest
) {
  return request<API.AuthResponse>("/api/profile/password", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Current_timezone: currentTimezone(),
    },
    data: body,
  });
}
