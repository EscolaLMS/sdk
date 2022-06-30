import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

/**  GET /api/webinars */
export async function webinars(
  apiUrl: string,
  params: API.WebinarParams,
  options?: RequestOptionsInit
) {
  return request<API.WebinarsList>(`${apiUrl}/api/webinars`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/webinars/:id */
export async function getWebinar(
  apiUrl: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Webinar>>(
    `${apiUrl}/api/webinars/${id}`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/**  GET /api/webinars/me */
export async function getMyWebinars(
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultMetaResponse<API.Event>>(
    `${apiUrl}/api/webinars/me`,
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

/**  GET /api/webinars/generate-jitsi*/
export async function generateJitsyWebinar(
  apiUrl: string,
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.JitsyData>>(
    `${apiUrl}/api/webinars/generate-jitsi/${id}`,
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
