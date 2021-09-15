import * as API from "../types/api";
export declare function login(body: API.LoginRequest, options?: {
    [key: string]: any;
}): Promise<API.LoginResponse>;
export declare function profile(token: string): Promise<API.DefaultResponse<API.UserItem>>;
export declare function register(body: API.RegisterRequest, options?: {
    [key: string]: any;
}): Promise<API.DefaultResponse<API.RegisterResponse>>;
export declare function updateProfile(body: API.UserItem, token: string): Promise<API.DefaultResponse<API.UserItem>>;
export declare function updateAvatar(file: File, token: string): Promise<API.DefaultResponse<API.UserItem>>;
export declare function forgot(body: API.ForgotRequest, options?: {
    [key: string]: any;
}): Promise<API.ForgotResponse>;
export declare function reset(body: API.ResetPasswordRequest, options?: {
    [key: string]: any;
}): Promise<API.ResetPasswordResponse>;
