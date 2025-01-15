import request, { type RequestOptionsInit } from "umi-request";
import * as API from "../types";
import { currentTimezone } from "../utils";

/**  GET /api/consultation-access-enquiries/:enquiryId */
export async function consultationAccessEnquiry(
  apiUrl: string,
  token: string,
  enquiryId: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.ConsultationsAccessEnquiry>>(
    `${apiUrl}/api/consultation-access-enquiries/${enquiryId}`,
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
