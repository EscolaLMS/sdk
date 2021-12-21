import request from "umi-request";
import * as API from "../types/api";

export enum Currency {
  USD = "USD",
  EUR = "EUR",
}

/**  GET /api/courses */
export async function settings() {
  return request<API.DataResponseSuccess<API.AppSettings>>(`/api/settings`, {
    method: "GET",
  });
}

/**  GET /api/config */
export async function config() {
  return request<API.DataResponseSuccess<API.AppConfig>>(`/api/config`, {
    method: "GET",
  });
}
