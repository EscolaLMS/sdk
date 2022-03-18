import request from 'umi-request';
import * as API from '../types/api';

/**  GET /api/consultations */
export async function consultations(
  params: API.ConsultationParams,
  options?: { [key: string]: any },
) {
  return request<API.ConsultationsList>(`/api/consultations`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/**  GET /api/consultations/:id */
export async function getConsultation(id: number, options?: { [key: string]: any }) {
  return request<API.DefaultResponse<API.Consultation>>(`/api/consultations/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/**  GET /api/consultations/me */
export async function getUserConsultations(
  token: string,
  params: API.ConsultationParams,
  options?: { [key: string]: any },
) {
  return request<API.ConsultationsList>(`/api/consultations/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params,
    ...(options || {}),
  });
}
