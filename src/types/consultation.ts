import {
  Category,
  DefaultMetaResponse,
  DefaultResponseError,
  PageParams,
  PaginationParams,
} from "./core";
import { User, UserItem } from "./user";
import { API } from "..";
import { Product } from "./cart";

export type Consultation = EscolaLms.Consultations.Models.Consultation & {
  product?: Product;
  executed_status?: null | "reported" | "not_reported" | "reject" | "approved";
  executed_at?: string;
  consultation_term_id?: number;
  is_ended?: boolean;
  is_started?: boolean;
  in_coming?: boolean;
  author: User & { categories: Category[] } & Record<
      string,
      string | number | boolean
    >;
  busy_terms: string[];
  teachers: User[];
  public?: boolean;
};

export type ConsultationTerm = {
  consultation: Consultation;
  consultation_id: number;
  created_at: string;
  executed_at: string;
  executed_status: string;
  id: number;
  product_id: number;
  reminder_status: string | null;
  updated_at: string;
  user: UserItem;
  user_id: number;
};

export type AppointmentTerm = {
  consultation_term_id: number;
  consultation_id: number;
  consultation_media: any;
  date: string;
  duration: string;
  // TODO: enum status
  status: string;
  users: ApointmentTermUser[];
  is_started?: boolean;
  is_ended?: boolean;
  in_coming?: boolean;
  related_product?: API.Product;
};

export type ConsultationsAccessEnquiry =
  EscolaLms.ConsultationAccess.Models.ConsultationAccessEnquiry;

export type ConsultationAccessEnquiryUrl = {
  id: number;
  meeting_link: string;
  meeting_link_type: string;
};

export type ConsultationsAccessEnquiryTerm =
  EscolaLms.ConsultationAccess.Models.ConsultationAccessEnquiryProposedTerm;

export type ConsultationsAccessEnquiryParams = PaginationParams & {
  consultation_id?: number;
  status?: string;
  proposed_at_from?: Date | string;
  proposed_at_to?: Date | string;
  is_coming?: boolean;
  consultation_term_ids?: number[];
};

export type ConsultationsAccessEnquiryList =
  DefaultMetaResponse<ConsultationsAccessEnquiry>;

export type ConsultationsAccessEnquiryCreateRequest =
  EscolaLms.ConsultationAccess.Http.Requests.CreateConsultationAccessEnquiryRequest & {
    description?: string;
  };

export type ConsultationsAccessEnquiryUpdateRequest = Omit<
  EscolaLms.ConsultationAccess.Http.Requests.CreateConsultationAccessEnquiryRequest,
  "consultation_id"
> & {
  description?: string;
};

export type ConsultationParams = PageParams &
  PaginationParams & {
    name?: string;
    status?: string;
    base_price?: number;
    only_with_categories?: boolean;
  };

export type ScheduleConsultationResponse =
  | {
      success: true;
      message: string;
    }
  | DefaultResponseError;

export type JitsyConfig = {
  domain: string;
  roomName: string;
  configOverwrite: Record<string, string>[];
  interfaceConfigOverwrite: Record<string, string>;
  userInfo: {
    displayName: string;
    email: string;
    id: number;
  };
  jwt: string;
  app_id: string;
};

export type JitsyData = {
  data: JitsyConfig;
  domain: string;
  url: string;
  yt_url: string;
  yt_stream_url: string;
  yt_stream_key: string;
};

export type ApointmentTermUser = UserItem & Record<string, string>;
export type ConsultationsList = DefaultMetaResponse<Consultation>;
