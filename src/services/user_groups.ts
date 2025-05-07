import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types";

export async function registerableGroups(
  apiUrl: string,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupList>(`${apiUrl}/api/auth/registerable-groups`, {
    method: "GET",
    useCache: true,
    ...(options || {}),
  });
}

export async function userGroups(
  apiUrl: string,
  params: API.UserGroupsParams,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupList>(`${apiUrl}/api/admin/user-groups`, {
    params: {
      ...params,
      per_page: params.pageSize,
      page: params.current,
    },
    method: "GET",
    useCache: true,
    ...(options || {}),
  });
}

export async function userGroup(
  apiUrl: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupRow>(`${apiUrl}/api/admin/user-groups/${id}`, {
    method: "GET",
    useCache: true,
    ...(options || {}),
  });
}

export async function updateUserGroup(
  apiUrl: string,
  id: number,
  data: Partial<API.UserGroup>,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupRow>(`${apiUrl}/api/admin/user-groups/${id}`, {
    data,
    method: "PUT",
    ...(options || {}),
  });
}

export async function createUserGroup(
  apiUrl: string,
  data: Partial<API.UserGroup>,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupRow>(`${apiUrl}/api/admin/user-groups`, {
    data,
    method: "POST",
    ...(options || {}),
  });
}

export async function deleteUserGroup(
  apiUrl: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupRow>(`${apiUrl}/api/admin/user-groups/${id}`, {
    method: "DELETE",
    ...(options || {}),
  });
}

export async function addUserToGroup(
  apiUrl: string,
  group_id: number,
  user_id: number,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupAddRow>(
    `${apiUrl}/api/admin/user-groups/${group_id}/members`,
    {
      data: {
        user_id,
      },
      method: "POST",
      ...(options || {}),
    }
  );
}

export async function removeUserFromGroup(
  apiUrl: string,
  group_id: number,
  user_id: number,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupAddRow>(
    `${apiUrl}/api/admin/user-groups/${group_id}/members/${user_id}`,
    {
      method: "DELETE",
      ...(options || {}),
    }
  );
}
