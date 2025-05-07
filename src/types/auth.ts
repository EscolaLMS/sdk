import { DefaultResponse, DefaultResponseError } from "./core";

export type LoginRequest = {
  email: string;
  password: string;
  remember_me?: 1 | 0;
};

export type LoginResponse = DefaultResponse<{
  token: string;
  expires_at: string;
}>;

export type RegisterRequest = {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  return_url: string;
} & Record<string, string | number | boolean>;

export type RegisterResponse =
  | {
      success: true;
      token: string;
    }
  | DefaultResponseError;

export type ForgotRequest = {
  email: string;
  return_url: string;
};

export type AuthResponse =
  | {
      message: string;
      success: boolean;
    }
  | DefaultResponseError;

export type ResetPasswordRequest = {
  token: string;
  password: string;
  email: string;
};

export type ChangePasswordRequest = {
  current_password: string;
  new_password: string;
  new_confirm_password: string;
};

export type UpdateUserEmail = {
  email?: string;
};

export interface CompleteSocialAuth {
  email: string;
  return_url: string;
}
