import request from "umi-request";
import type { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";

/**  GET /api/events */
export async function events(params: API.EventsParams, options?: RequestOptionsInit) {
  return request<API.EventsList>(`/api/events`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}
