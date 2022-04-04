import request from "umi-request";
import * as API from "../types/api";

/**  GET /api/consultations */
export async function consultations(
  params: API.ConsultationParams,
  options?: { [key: string]: any },
) {
  return request<API.ConsultationsList>(`/api/consultations`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/consultations/:id */
export async function getConsultation(id: number, options?: { [key: string]: any }) {
  return request<API.DefaultResponse<API.Consultation>>(`/api/consultations/${id}`, {
    method: "GET",
    ...(options || {}),
  });
}

/**  GET /api/consultations/me */
export async function getUserConsultations(token: string) {
  return request<API.ConsultationsList>(`/api/consultations/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

/**  GET /api/consultations/reserve-term */
export async function bookConsultationDate(token: string, id: number, term: string) {
  return request<API.ScheduleConsultationResponse>(`/api/consultations/report-term/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      term: term,
    },
  });
}

/**  GET /api/consultations/my-schedule*/
export async function getTutorConsultations(token: string) {
  return request<API.TutorConsultationList>(`/api/consultations/my-schedule`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

/**  GET /api/consultations/approve-term*/
export async function approveConsultation(token: string, id: number) {
  return request<API.TutorConsultationList>(`/api/consultations/approve-term/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

/**  GET /api/consultations/reject-term*/
export async function rejectConsultation(token: string, id: number) {
  return request<API.TutorConsultationList>(`/api/consultations/reject-term/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

/**  GET /api/consultations/generate-jitsi*/
export async function genereteJitsy(token: string, id: number) {
  return request<API.DefaultResponse<API.JitsyData>>(`/api/consultations/generate-jitsi/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
