import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";

export async function registerableGroups(options?: { [key: string]: any }) {
  return request<API.UserGroupList>("/api/auth/registerable-groups", {
    method: "GET",
    useCache: true,
    ...(options || {}),
  });
}

export async function userGroups(
  params: API.UserGroupsParams,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupList>("/api/admin/user-groups", {
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

export async function userGroup(id: number, options?: RequestOptionsInit) {
  return request<API.UserGroupRow>(`/api/admin/user-groups/${id}`, {
    method: "GET",
    useCache: true,
    ...(options || {}),
  });
}

export async function updateUserGroup(
  id: number,
  data: Partial<API.UserGroup>,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupRow>(`/api/admin/user-groups/${id}`, {
    data,
    method: "PUT",
    ...(options || {}),
  });
}

export async function createUserGroup(
  data: Partial<API.UserGroup>,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupRow>(`/api/admin/user-groups`, {
    data,
    method: "POST",
    ...(options || {}),
  });
}

export async function deleteUserGroup(
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupRow>(`/api/admin/user-groups/${id}`, {
    method: "DELETE",
    ...(options || {}),
  });
}

export async function addUserToGroup(
  group_id: number,
  user_id: number,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupAddRow>(
    `/api/admin/user-groups/${group_id}/members`,
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
  group_id: number,
  user_id: number,
  options?: RequestOptionsInit
) {
  return request<API.UserGroupAddRow>(
    `/api/admin/user-groups/${group_id}/members/${user_id}`,
    {
      method: "DELETE",
      ...(options || {}),
    }
  );
}
