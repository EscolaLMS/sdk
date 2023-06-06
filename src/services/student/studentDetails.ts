import request, { RequestOptionsInit } from "umi-request";
import * as API from "../../types/api";

export async function semesters(
  apiUrl: string,
  token: string,
  yearId?: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.SemesterData[]>>(
    `${apiUrl}/api/semesters`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        academic_year_id: yearId,
      },
      ...(options || {}),
    }
  );
}

export async function academicYears(
  apiUrl: string,
  token: string,
  active?: boolean,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.AcademicYear[]>>(
    `${apiUrl}/api/academic-years`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        active: active,
      },
      ...(options || {}),
    }
  );
}
