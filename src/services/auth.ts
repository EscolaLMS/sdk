import request from "umi-request";
import * as API from "../types/api";

export async function login(
  body: API.LoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginResponse>("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

export async function profile(token: string) {
  return request<API.DefaultResponse<API.UserItem & { roles: string[] }>>(
    "/api/profile/me",
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

export async function register(
  body: API.RegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.DefaultResponse<API.RegisterResponse>>(
    "/api/auth/register",
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
  body: API.UpdateUserDetails,
  token: string
) {
  return request<API.DefaultResponse<API.UserAsProfile>>("/api/profile/me", {
    method: "PUT",
    data: body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateAvatar(file: File, token: string) {
  const formData = new FormData();
  formData.append("avatar", file);
  return request<API.DefaultResponse<API.UserAsProfile>>(
    "/api/profile/upload-avatar",
    {
      method: "POST",
      data: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function forgot(
  body: API.ForgotRequest,
  options?: { [key: string]: any }
) {
  return request<API.AuthResponse>("/api/auth/password/forgot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

export async function reset(
  body: API.ResetPasswordRequest,
  options?: { [key: string]: any }
) {
  return request<API.AuthResponse>("/api/auth/password/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

export async function emailVerify(id: string, hash: string) {
  return request<API.AuthResponse>(`/api/auth/email/verify/${id}/${hash}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function refreshToken(token: string) {
  return request<API.DefaultResponse<{ token: string; expires_at: string }>>(
    "/api/auth/refresh",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
