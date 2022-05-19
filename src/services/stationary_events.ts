import request from "umi-request";
import type { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

/**  GET /api/stationary-events */
export async function stationaryEvents(
  params: API.StationaryEventsParams,
  options?: RequestOptionsInit
) {
  return request<API.StationaryEventsList>(`/api/stationary-events`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/stationary-events/:id */
export async function getStationaryEvent(
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.StationaryEvent>>(
    `/api/stationary-events/${id}`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/**  GET /api/stationary-events/me */
export async function getMyStationaryEvents(token: string) {
  return request<API.DefaultMetaResponse<API.StationaryEvent>>(
    `/api/stationary-events/me`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
    }
  );
}
