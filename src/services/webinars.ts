import request from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

/**  GET /api/webinars */
export async function webinars(
  params: API.WebinarParams,
  options?: { [key: string]: any }
) {
  return request<API.WebinarsList>(`/api/webinars`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/webinars/:id */
export async function getWebinar(id: number, options?: { [key: string]: any }) {
  return request<API.DefaultResponse<API.Webinar>>(`/api/webinars/${id}`, {
    method: "GET",
    ...(options || {}),
  });
}

/**  GET /api/webinars/me */
export async function getMyWebinars(token: string) {
  return request<API.DefaultMetaResponse<API.Event>>(`/api/webinars/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
  });
}

/**  GET /api/webinars/generate-jitsi*/
export async function genereteJitsyWebinar(token: string, id: number) {
  return request<API.DefaultResponse<API.JitsyData>>(
    `/api/webinars/generate-jitsi/${id}`,
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
