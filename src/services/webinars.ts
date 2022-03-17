import request from 'umi-request';
import * as API from '../types/api';

/**  GET /api/webinars */
export async function webinars(params: API.ConsultationParams, options?: { [key: string]: any }) {
  return request<API.ConsultationsList>(`/api/webinars`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/**  GET /api/webinars/:id */
export async function getWebinar(id: number, options?: { [key: string]: any }) {
  return request<API.DefaultResponse<API.Consultation>>(`/api/webinars/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}
