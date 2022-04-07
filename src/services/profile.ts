import request from "umi-request";
import * as API from "../types/api";

export async function changePassword(token: string, body: API.ChangePasswordRequest) {
  return request<API.AuthResponse>("/api/profile/password", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: body,
  });
}
