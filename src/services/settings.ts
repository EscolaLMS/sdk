import request from "umi-request";
import * as API from "../types/api";
import type { RequestOptionsInit } from "umi-request";

export enum Currency {
  USD = "USD",
  EUR = "EUR",
}

/**  GET /api/courses */
export async function settings(options?: RequestOptionsInit) {
  return request<API.DefaultResponse<API.AppSettings>>(`/api/settings`, {
    method: "GET",
    ...(options || {}),
  });
}

/**  GET /api/config */
export async function config(options?: RequestOptionsInit) {
  return request<API.DefaultResponse<API.AppConfig>>(`/api/config`, {
    method: "GET",
    ...(options || {}),
  });
}
