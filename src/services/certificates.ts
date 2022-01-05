import request from "umi-request";
import * as API from "../types/api";

/**  GET /api/pdfs */
export async function getCertificates(
  token: string,
  params?: API.PageParams,
  options?: { [key: string]: any }
) {
  return request<API.CertificateList>(`/api/pdfs`, {
    method: "GET",
    params,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

/**  GET /api/pdfs */
export async function getCertificate(
  token: string,
  id: number,
  options?: { [key: string]: any }
) {
  return request<API.DefaultResponse<API.Certificate>>(`/api/pdfs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}
