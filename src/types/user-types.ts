import { Category, DefaultMetaResponse, DefaultResponse } from "./core-types";

export type UserItem = Partial<
  Exclude<
    EscolaLms.Auth.Models.User,
    | "password"
    | "remember_token"
    | "password_reset_token"
    | "email_verified_at"
    | "is_active"
  >
> & {
  // id: number;
  // name: string;
  // first_name: string;
  // last_name: string;
  // email: string;
  // is_active: boolean;
  // created_at: string;
  // onboarding_completed: boolean;
  // email_verified: boolean;
  avatar?: string;
  url_avatar: string | null;
  // path_avatar: string | null;
  bio?: string | null;
  categories?: Category[] | null;
  interests?: Array<EscolaLms.Categories.Models.Category> | null | never[];
};

export type UpdateUserDetails = {
  first_name?: string;
  last_name?: string;
  age?: number;
  gender?: number;
  country?: string;
  city?: string;
  street?: string;
  postcode?: string;
  phone?: string;
} & Record<string, string | number | boolean | null>;

export type UserGroup = {
  id: number;
  name: string;
  users: UserItem[];
  name_with_breadcrumbs?: string;
  parent_id?: null | number;
  registerable?: boolean;
};

export type UserGroups = UserGroup[];

export type UserGroupRow = DefaultResponse<UserGroup>;

export type UserGroupAddRow = DefaultResponse<UserItem[]>;

export type UserGroupList = DefaultMetaResponse<UserGroup>;
