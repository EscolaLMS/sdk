import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

export async function login(
  apiUrl: string,
  body: API.LoginRequest,
  options?: RequestOptionsInit
) {
  return request<API.LoginResponse>(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

export async function profile(
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.UserItem & { roles: string[] }>>(
    `${apiUrl}/api/profile/me`,
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

export async function register(
  apiUrl: string,
  body: API.RegisterRequest,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.RegisterResponse>>(
    `${apiUrl}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

export async function updateProfile(
  apiUrl: string,
  body: API.UpdateUserDetails,
  token: string
) {
  return request<API.DefaultResponse<API.UserAsProfile>>(
    `${apiUrl}/api/profile/me`,
    {
      method: "PUT",
      data: body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
    }
  );
}

export async function updateAvatar(apiUrl: string, file: File, token: string) {
  const formData = new FormData();
  formData.append("avatar", file);
  return request<API.DefaultResponse<API.UserAsProfile>>(
    `${apiUrl}/api/profile/upload-avatar`,
    {
      method: "POST",
      data: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
    }
  );
}

export async function forgot(
  apiUrl: string,
  body: API.ForgotRequest,
  options?: RequestOptionsInit
) {
  return request<API.AuthResponse>(`${apiUrl}/api/auth/password/forgot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

export async function reset(
  apiUrl: string,
  body: API.ResetPasswordRequest,
  options?: RequestOptionsInit
) {
  return request<API.AuthResponse>(`${apiUrl}/api/auth/password/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

export async function emailVerify(apiUrl: string, id: string, hash: string) {
  return request<API.AuthResponse>(
    `${apiUrl}/api/auth/email/verify/${id}/${hash}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function refreshToken(apiUrl: string, token: string) {
  return request<API.DefaultResponse<{ token: string; expires_at: string }>>(
    `${apiUrl}/api/auth/refresh`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
    }
  );
}

export async function completeSocialAuth(
  apiUrl: string,
  token: string,
  body: API.CompleteSocialAuth
) {
  return request<API.DefaultResponse<undefined>>(
    `${apiUrl}/api/auth/social/complete/${token}`,
    {
      method: "POST",
      data: body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Current-timezone": currentTimezone(),
      },
    }
  );
}

export async function startAccountDelete(
  apiUrl: string,
  token: string,
  returnUrl: string
) {
  return request<API.DefaultResponse<API.AuthResponse>>(
    `${apiUrl}/api/profile/delete/init`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        return_url: returnUrl,
      },
    }
  );
}

export async function finishAccountDelete(
  apiUrl: string,
  token: string,
  userId: string,
  deleteToken: string
) {
  return request<API.DefaultResponse<API.AuthResponse>>(
    `${apiUrl}/api/profile/delete/${userId}/${deleteToken}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
