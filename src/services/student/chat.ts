import request, { RequestOptionsInit } from "umi-request";
import * as API from "../../types/api";

export async function postTeamsChat(
  apiUrl: string,
  token: string,
  userId: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.TeamsChatResponse>>(
    `${apiUrl}/api/chats/ms-teams`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        user_id: userId,
      },
      ...(options || {}),
    }
  );
}
