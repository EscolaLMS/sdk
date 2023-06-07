import request, { RequestOptionsInit } from "umi-request";
import * as API from "../../types/api";

export async function semesters(
  apiUrl: string,
  token: string,
  params?: API.SemestersParams,
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
      params,
      ...(options || {}),
    }
  );
}

export async function academicYears(
  apiUrl: string,
  token: string,
  params?: API.AcademicYearParams,
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
      params,
      ...(options || {}),
    }
  );
}
