import request from 'umi-request';
import * as API from '../types/api';

/**  GET /api/webinars */
export async function webinars(params: API.WebinarParams, options?: { [key: string]: any }) {
  return request<API.WebinarsList>(`/api/webinars`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/**  GET /api/webinars/:id */
export async function getWebinar(id: number, options?: { [key: string]: any }) {
  return request<API.DefaultResponse<API.Webinar>>(`/api/webinars/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}
