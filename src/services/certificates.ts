import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

/**  GET /api/pdfs */
export async function getCertificates(
  token: string,
  params?: API.PaginationParams,
  options?: RequestOptionsInit
) {
  return request<API.CertificateList>(`/api/pdfs`, {
    method: "GET",
    params,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    ...(options || {}),
  });
}

/**  GET /api/pdfs */
export async function getCertificate(
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Certificate>>(`/api/pdfs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    ...(options || {}),
  });
}
