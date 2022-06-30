import request from "umi-request";
import * as API from "../types/api";
import type { RequestOptionsInit } from "umi-request";

export enum Currency {
  USD = "USD",
  EUR = "EUR",
}

/**  GET /api/courses */
export async function settings(apiUrl: string, options?: RequestOptionsInit) {
  return request<API.DefaultResponse<API.AppSettings>>(
    `${apiUrl}/api/settings`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/**  GET /api/config */
export async function config(apiUrl: string, options?: RequestOptionsInit) {
  return request<API.DefaultResponse<API.AppConfig>>(`${apiUrl}/api/config`, {
    method: "GET",
    ...(options || {}),
  });
}
