import { ProductItems } from "./cart";
import { ConsultationTerm } from "./consultation";
import { DefaultMetaResponse, Pdf } from "./core";
import { Course } from "./course";
import { EventTypes } from "./enums";
import { StationaryEvent, Webinar } from "./events";
import { Order, Payment } from "./purchase";
import { TopicableBase } from "./topic";

export type BulkNotificationSection = {
  bulk_notification_id: number;
  created_at: string;
  id: number;
  key: string;
  updated_at: string;
  value: string;
};

export type BulkNotification = {
  channel: EventTypes;
  created_at: string;
  id: number;
  updated_at: string;
  sections: BulkNotificationSection[];
};

export type NotificationData = {
  stationaryEvent?: StationaryEvent;
  productable?: ProductItems;
  product?: ProductItems;
  order?: Order;
  payment?: Payment;
  course?: Course;
  topicContent?: TopicableBase;
  consultationTerm?: ConsultationTerm;
  webinar?: Webinar;
  notification?: BulkNotification;
  pdf?: Pdf;
};

export type Notification = {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: NotificationData;
  read_at: null | Date;
  created_at: Date;
  updated_at: Date;
  event: EventTypes;
};

export type NotificationList = DefaultMetaResponse<Notification>;

export type NotificationsTokensBody = {
  token: string;
};
