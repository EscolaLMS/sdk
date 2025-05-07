import request from "umi-request";
import type { RequestOptionsInit } from "umi-request";
import * as API from "../types";

/**  GET /api/events */
export async function events(
  apiUrl: string,
  params: API.EventsParams,
  options?: RequestOptionsInit
) {
  return request<API.EventsList>(`${apiUrl}/api/events`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}
