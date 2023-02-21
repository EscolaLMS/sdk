import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

/**  GET /api/tasks */
export async function tasks(
  apiUrl: string,
  params: API.TaskParams,
  options?: RequestOptionsInit
) {
  return request<API.TasksList>(`${apiUrl}/api/tasks`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/tasks/:id */
export async function getTask(
  apiUrl: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Task>>(`${apiUrl}/api/tasks/${id}`, {
    method: "GET",
    ...(options || {}),
  });
}

/** POST /api/task */
export async function createTask(
  apiUrl: string,
  body: EscolaLms.Tasks.Http.Requests.CreateTaskRequest,
  token: string
) {
  return request<API.DefaultResponse<API.Task>>(`${apiUrl}/api/tasks`, {
    method: "POST",
    data: body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
  });
}
