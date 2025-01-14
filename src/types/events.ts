import { API } from "..";
import { Product } from "./cart";
import { DefaultMetaResponse, PageParams, PaginationParams } from "./core";

export type Webinar = Omit<EscolaLms.Webinar.Models.Webinar, "trainers"> & {
  product?: Product;
  program?: string;
  trainers: Array<API.User> | null;
  image_url: string | null;
  is_ended: boolean;
  is_started: boolean;
  in_coming: boolean;
  deadline?: string | null;
};

export type StationaryEvent =
  EscolaLms.StationaryEvents.Models.StationaryEvent & {
    date?: string;
    title?: string;
    isScheduled?: boolean;
    appointmentDate?: string;
    product?: Product | null;
    is_ended?: boolean;
    is_started?: boolean;
    in_coming?: boolean;
  };

export type Event = {
  id: number;
  created_at: string;
  updated_at: string | null;
  name: string;
  description?: string | null;
  short_desc: string | null;
  started_at?: string | null;
  active_from?: string | null;
  finished_at?: string | null;
  active_to?: string;
  max_participants?: number | null;
  place?: string | null;
  program?: string | null;
  categories?: EscolaLms.Categories.Models.Category[] | null;
  authors?: EscolaLms.Auth.Models.User[] | null;
  agenda?: string | null;
  duration?: string | null;
  image_path: string | null;
  image_url?: string | null;
  product?: Product | null;
  base_price?: string | null;
  status?: string;
  trainers?: EscolaLms.Auth.Models.User[] | null;
  tags?: EscolaLms.Tags.Models.Tag[] | null;
  yt_url?: string | null;
  model?: string;
  in_coming?: boolean;
  is_ended?: boolean;
  is_started?: boolean;
};

export type WebinarsList = DefaultMetaResponse<Webinar>;
export type StationaryEventsList = DefaultMetaResponse<StationaryEvent>;
export type EventsList = DefaultMetaResponse<Event>;

export type WebinarParams = PageParams &
  PaginationParams & {
    name?: string;
    product?: Product;
    "status[]"?: string[];
    only_incoming?: 0 | 1;
  };

export type StationaryEventsParams = PageParams &
  PaginationParams & {
    name?: string;
  };

export type EventsParams = PageParams &
  PaginationParams & {
    name?: string;
  };
