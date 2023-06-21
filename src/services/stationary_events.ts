import request from "umi-request";
import type { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

/**  GET /api/stationary-events */
export async function stationaryEvents(
  apiUrl: string,
  params: API.StationaryEventsParams,
  options?: RequestOptionsInit
) {
  return request<API.StationaryEventsList>(`${apiUrl}/api/stationary-events`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/stationary-events/:id */
export async function getStationaryEvent(
  apiUrl: string,
  id: number,
  token?: string | null,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.StationaryEvent>>(
    `${apiUrl}/api/stationary-events/${id}`,
    {
      method: "GET",
      ...(options || {}),
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Current-timezone": currentTimezone(),
          }
        : {
            "Content-Type": "application/json",
          },
    }
  );
}

/**  GET /api/stationary-events/me */
export async function getMyStationaryEvents(
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultMetaResponse<API.StationaryEvent>>(
    `${apiUrl}/api/stationary-events/me`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      ...(options || {}),
    }
  );
}
