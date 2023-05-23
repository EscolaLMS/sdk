import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

/**  GET /api/pdfs */
export async function getCertificates(
  apiUrl: string,
  token: string,
  params?: API.PaginationParams,
  options?: RequestOptionsInit
) {
  return request<API.CertificateList>(`${apiUrl}/api/pdfs`, {
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
  apiUrl: string,
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Certificate>>(
    `${apiUrl}/api/pdfs/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      ...(options || {}),
    }
  );
}

/**  GET /api/pdfs */
export async function generateCertificatePdf(
  apiUrl: string,
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<Blob>(`${apiUrl}/api/pdfs/generate/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/pdf",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    responseType: "blob",
    ...(options || {}),
  });
}
