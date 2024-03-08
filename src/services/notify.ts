import request from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

export async function getNotifications(
  apiUrl: string,
  token: string,
  params: API.PageParams & API.PaginationParams = { per_page: 15, page: 1 },
  options?: Record<string, any>
) {
  return request<API.NotificationList>(`${apiUrl}/api/notifications`, {
    method: "GET",
    params,
    /* useCache: true */ useCache: false,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    ...(options || {}),
  });
}

export async function readNotification(
  apiUrl: string,
  id: string,
  token: string,
  options?: Record<string, any>
) {
  return request<API.DefaultResponse<API.Notification[]>>(
    `${apiUrl}/api/notifications/${id}/read`,
    {
      method: "POST",
      /* useCache: true */ useCache: false,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      ...(options || {}),
    }
  );
}

export async function readAll(
  apiUrl: string,
  token: string,
  options?: Record<string, any>
) {
  return request<API.DefaultResponse<API.Notification[]>>(
    `${apiUrl}/api/notifications/read-all`,
    {
      method: "POST",
      /* useCache: true */ useCache: false,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      ...(options || {}),
    }
  );
}

export async function notyficationTokens(
  apiUrl: string,
  token: string,
  body: API.NotificationsTokensBody,
  options?: Record<string, any>
) {
  return request<API.DefaultResponse<unknown>>(
    `${apiUrl}/api/notifications/tokens`,
    {
      method: "POST",
      useCache: false,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      data: body,
      ...(options || {}),
    }
  );
}
