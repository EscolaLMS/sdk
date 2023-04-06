import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

export async function addProject(
  apiUrl: string,
  token: string,
  body: API.AddProjectBody,
  options?: RequestOptionsInit
) {
  const formData = new FormData();
  Object.entries(body).forEach(([key, val]) => {
    formData.append(key, val);
  });

  return request<API.DefaultResponse<API.ProjectFile>>(
    `${apiUrl}/api/topic-project-solutions`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      data: formData,
      ...(options || {}),
    }
  );
}

export async function fetchProjects(
  apiUrl: string,
  token: string,
  { per_page, page, ...params }: API.ProjectParams,
  options?: RequestOptionsInit
) {
  return request<API.DefaultMetaResponse<API.ProjectFile>>(
    `${apiUrl}/api/topic-project-solutions`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      params: { per_page: per_page ?? 15, page: page ?? 1, ...params },
      ...(options || {}),
    }
  );
}
export async function removeProject(
  apiUrl: string,
  token: string,
  project_file_id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<undefined>>(
    `${apiUrl}/api/topic-project-solutions/${project_file_id}`,
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
