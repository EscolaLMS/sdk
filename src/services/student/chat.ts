import request, { RequestOptionsInit } from "umi-request";
import * as API from "../../types";

export async function postTeamsChat(
  apiUrl: string,
  token: string,
  userId: number,
  options?: RequestOptionsInit
) {
  return request<API.TeamsChatResponse>(`${apiUrl}/api/chats/ms-teams`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_id: userId,
    },
    ...(options || {}),
  });
}
