import request from "umi-request";
import type { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";

/**  GET /api/stationary-events */
export async function stationaryEvents(
  params: API.StationaryEventsParams,
  options?: RequestOptionsInit,
) {
  return request<API.StationaryEventsList>(`/api/stationary-events`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/stationary-events/:id */
export async function getStationaryEvent(id: number, options?: RequestOptionsInit) {
  return request<API.DefaultResponse<API.StationaryEvent>>(`/api/stationary-events/${id}`, {
    method: "GET",
    ...(options || {}),
  });
}
