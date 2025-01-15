import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types";
import { currentTimezone } from "../utils";

/**  GET /api/mattermost/me */
export async function getMattermostChannels(
  apiUrl: string,
  token: string,
  params?: API.PageParams,
  options?: RequestOptionsInit
) {
  return request<API.MattermostChannelList>(`${apiUrl}/api/mattermost/me`, {
    method: "GET",
    params,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    ...(options || {}),
  });
}
