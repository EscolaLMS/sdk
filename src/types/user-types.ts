import { Subject } from "./api";
import { AppointmentTerm } from "./consultation-types";
import {
  Category,
  DefaultMetaResponse,
  DefaultResponse,
  PaginatedMetaList,
} from "./core-types";

export type User = EscolaLms.Auth.Models.User & {
  url_avatar: string | null;
};

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

export type Tutor = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};

export type Author = {
  first_name: string;
  last_name: string;
  id: number;
  path_avatar: string | null;
} & Record<string, string | number | boolean | null>;

export type LessonTutor = {
  subjects: Subject[];
  tutor: Tutor & {
    degree_name: string;
    department: string;
    organization_unit: string;
    path_avatar?: string;
  };
};

export type UserGroupsParams = {
  current?: number;
  pageSize?: number;
  search?: string;
};

export type MembershipDetails = {
  id: number;
  value: string;
};

export type UserAsProfile = Omit<UserItem, "roles"> & {
  roles: string[];
  membership_info?: {
    course: MembershipDetails;
    faculty: MembershipDetails;
    kind: MembershipDetails;
    type: MembershipDetails;
  }[];
};

export type UserGroups = UserGroup[];

export type UserGroupRow = DefaultResponse<UserGroup>;

export type UserGroupAddRow = DefaultResponse<UserItem[]>;

export type UserGroupList = DefaultMetaResponse<UserGroup>;

export type UserList = PaginatedMetaList<UserItem>;

export type UserListItem = UserItem;

export type TutorSingle = DefaultResponse<UserItem>;

export type TutorList = DefaultResponse<UserItem[]>;

export type LessonTutors = DefaultResponse<LessonTutor[]>;

export type TutorConsultationList = DefaultMetaResponse<AppointmentTerm>;
