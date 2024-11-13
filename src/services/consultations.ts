import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

/**  GET /api/consultations */
export async function consultations(
  apiUrl: string,
  params: API.ConsultationParams,
  options?: RequestOptionsInit
) {
  return request<API.ConsultationsList>(`${apiUrl}/api/consultations`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/consultations/:id */
export async function getConsultation(
  apiUrl: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Consultation>>(
    `${apiUrl}/api/consultations/${id}`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/**  GET /api/consultations/me */
export async function getUserConsultations(
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.ConsultationsList>(`${apiUrl}/api/consultations/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    ...(options || {}),
  });
}

/**  GET /api/consultations/reserve-term */
export async function bookConsultationDate(
  apiUrl: string,
  token: string,
  id: number,
  term: string,
  options?: RequestOptionsInit
) {
  return request<API.ScheduleConsultationResponse>(
    `${apiUrl}/api/consultations/report-term/${id}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      data: {
        term: term,
      },
      ...(options || {}),
    }
  );
}

/**  GET /api/consultations/my-schedule*/
export async function getTutorConsultations(
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.TutorConsultationList>(
    `${apiUrl}/api/consultations/my-schedule`,
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

/**  GET /api/consultations/approve-term*/
export async function approveConsultation(
  apiUrl: string,
  token: string,
  id: number,
  term: string,
  options?: RequestOptionsInit
) {
  return request<API.TutorConsultationList>(
    `${apiUrl}/api/consultations/approve-term/${id}?term=${term}`,
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

/**  GET /api/consultations/reject-term*/
export async function rejectConsultation(
  apiUrl: string,
  token: string,
  id: number,
  term: string,
  options?: RequestOptionsInit
) {
  return request<API.TutorConsultationList>(
    `${apiUrl}/api/consultations/reject-term/${id}?term=${term}`,
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

/**  GET /api/consultations/generate-jitsi*/
export async function generateJitsy(
  apiUrl: string,
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.JitsyData>>(
    `${apiUrl}/api/consultations/generate-jitsi/${id}`,
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

/**  POST /api/consultations/change-term/{termId} */
export async function changeTermDate(
  apiUrl: string,
  termId: number,
  newDate: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Consultation>>(
    `${apiUrl}/api/consultations/change-term/${termId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      data: {
        executed_at: newDate,
      },
      ...(options || {}),
    }
  );
}
