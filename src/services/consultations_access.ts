import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

/**  GET /api/course-access-enquiries */
export async function consultationAccess(
  apiUrl: string,
  token: string,
  params: API.ConsultationsAccessEnquiryParams,
  options?: RequestOptionsInit
) {
  return request<API.ConsultationsAccessEnquiryList>(
    `${apiUrl}/api/consultation-access-enquiries`,
    {
      method: "GET",
      params,
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

/**  DELETE /api/course-access-enquiries/:id */
export async function deleteConsultationAccess(
  apiUrl: string,
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.ConsultationsAccessEnquiry>>(
    `${apiUrl}/api/consultation-access-enquiries/${id}`,
    {
      method: "DELETE",
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

/**  POST /api/course-access-enquiries */
export async function createConsultationAccess(
  apiUrl: string,
  token: string,
  body: API.ConsultationsAccessEnquiryCreateRequest,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.ConsultationsAccessEnquiry>>(
    `${apiUrl}/api/consultation-access-enquiries`,
    {
      method: "POST",
      data: body,
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

/**  PATCH /api/course-access-enquiries */
export async function updateConsultationAccess(
  apiUrl: string,
  token: string,
  id: number,
  body: API.ConsultationsAccessEnquiryUpdateRequest,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.ConsultationsAccessEnquiry>>(
    `${apiUrl}/api/consultation-access-enquiries/${id}`,
    {
      method: "PATCH",
      data: body,
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
