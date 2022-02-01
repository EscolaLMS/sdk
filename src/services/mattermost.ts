import request from "umi-request";
import * as API from "../types/api";

/**  GET /api/mattermost/me */
export async function getMattermostChannels(
  token: string,
  params?: API.PageParams,
  options?: { [key: string]: any }
) {
  return request<API.MattermostChannelList>(`/api/mattermost/me`, {
    method: "GET",
    params,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}
