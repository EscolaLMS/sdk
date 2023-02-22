import request, { RequestOptionsInit } from 'umi-request';
import * as API from '../types/api';
import { currentTimezone } from '../utils';

/**  GET /api/tasks */
export async function tasks(
  apiUrl: string,
  token: string,
  params: API.TaskParams,
  options?: RequestOptionsInit
) {
  return request<API.TasksList>(`${apiUrl}/api/tasks`, {
    method: 'GET',
    params,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Current-timezone': currentTimezone(),
    },
    ...(options || {}),
  });
}

/**  GET /api/tasks/:id */
export async function getTask(
  apiUrl: string,
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Task>>(`${apiUrl}/api/tasks/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Current-timezone': currentTimezone(),
    },
    ...(options || {}),
  });
}

/** POST /api/task */
export async function createTask(
  apiUrl: string,
  token: string,
  body: EscolaLms.Tasks.Http.Requests.CreateTaskRequest
) {
  return request<API.DefaultResponse<API.Task>>(`${apiUrl}/api/tasks`, {
    method: 'POST',
    data: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Current-timezone': currentTimezone(),
    },
  });
}
