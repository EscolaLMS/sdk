import * as API from "./../../types/api";

export interface ContextState<T> {
  loading: boolean;
  filter?: API.CourseParams;
  list: T[];
}

export interface ContextPaginatedMetaState<T> {
  loading: boolean;
  list?: API.PaginatedMetaList<T>;
  error?: API.DefaultResponseError;
}

export interface ContextPaginatedState<T> {
  loading: boolean;
  list?: API.PaginatedList<T>;
  error?: API.DefaultResponseError;
}

export interface ContextListState<T> {
  loading: boolean;
  list?: T[];
  error?: API.DefaultResponseError;
}

export interface ContextStateValue<T> {
  loading: boolean;
  value?: T;
  error?: API.DefaultResponseError;
}

export enum FontSize {
  small = 0,
  regular = 1,
  bigger = 2,
  big = 3,
}

export interface EscolaLMSContextReadConfig {
  courses: ContextPaginatedMetaState<API.CourseListItem>;
  userGroup: ContextStateValue<API.UserGroupRow>;
  userGroups: ContextListState<API.UserGroup>;
  registerableGroups: ContextListState<API.UserGroup>;
  course: ContextStateValue<API.CourseListItem>;
  program: ContextStateValue<API.CourseProgram>;
  settings: API.AppSettings;
  config: API.AppConfig;
  uniqueTags: ContextListState<API.Tag>;
  categoryTree: ContextListState<API.Category>;
  user: ContextStateValue<API.UserAsProfile>;
  cart: ContextStateValue<API.Cart>;
  progress: ContextStateValue<API.CourseProgress>;
  tutors: ContextListState<API.UserItem>;
  tutor: ContextStateValue<API.UserItem>;
  orders: ContextPaginatedMetaState<API.Order>;
  payments: ContextPaginatedMetaState<API.Payment>;
  certificates: ContextPaginatedMetaState<API.Certificate>;
  mattermostChannels: ContextStateValue<API.MattermostData>;
  pages: ContextPaginatedMetaState<API.PageListItem>;
  page: ContextStateValue<API.Page>;
  fontSize: FontSize;
  notifications: ContextListState<API.Notification>;
  h5p: ContextStateValue<API.H5PObject>;
  tokenExpireDate?: string | null;
  consultations: ContextPaginatedMetaState<API.Consultation>;
  consultation: ContextStateValue<API.Consultation>;
  fields: ContextListState<EscolaLms.ModelFields.Models.Metadata>;
  stationaryEvents: ContextListState<EscolaLms.StationaryEvents.Models.StationaryEvent>;
  userConsultations: ContextPaginatedMetaState<API.Consultation>;
  webinars: ContextListState<API.Webinar>;
  tutorConsultations: ContextPaginatedMetaState<API.AppointmentTerm>;
  events: ContextPaginatedMetaState<API.Event>;
  webinar: ContextStateValue<API.Webinar>;
  stationaryEvent: ContextStateValue<API.StationaryEvent>;
  userWebinars: ContextListState<API.Event>;
  products: ContextPaginatedMetaState<API.Product>;
  product: ContextStateValue<API.Product>;
  userStationaryEvents: ContextListState<API.StationaryEvent>;
}

export interface EscolaLMSContextAPIConfig {
  apiUrl: string;
  fetchCourses: (filter: API.CourseParams) => Promise<void>;
  fetchUserGroup: (id: number) => Promise<void>;
  fetchUserGroups: (params: API.UserGroupsParams) => Promise<void>;
  fetchRegisterableGroups: () => Promise<void>;
  fetchCourse: (id: number) => Promise<void>;
  fetchProgram: (id: number) => Promise<void>;
  fetchConfig: () => Promise<void>;
  login: (body: API.LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    body: API.RegisterRequest
  ) => Promise<API.DefaultResponse<API.RegisterResponse>>;
  forgot: (body: API.ForgotRequest) => Promise<API.AuthResponse>;
  reset: (body: API.ResetPasswordRequest) => Promise<API.AuthResponse>;
  emailVerify: (id: string, hash: string) => Promise<API.AuthResponse>;
  addToCart: (id: number, quantity?: number) => Promise<void>;
  addMisingProducts: (products: number[]) => Promise<void>;
  removeFromCart: (courseId: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  payWithStripe: (paymentMethodId: string) => Promise<void>;
  payWithP24: (email: string, return_url: string) => Promise<void>;
  fetchProgress: () => Promise<void>;
  sendProgress: (
    courseId: number,
    data: API.CourseProgressItemElement[]
  ) => Promise<void>;
  h5pProgress: (
    courseId: string,
    topicId: number,
    statement: API.IStatement
  ) => Promise<API.SuccessResponse> | null;
  fetchTutors: () => Promise<void>;
  fetchTutor: (id: number) => Promise<void>;
  fetchOrders: (params?: API.PaginationParams) => Promise<void>;
  fetchPayments: () => Promise<void>;
  fetchCertificates: () => Promise<void>;
  fetchCertificate: (
    id: number
  ) => Promise<API.DefaultResponse<API.Certificate>>;
  fetchMattermostChannels: () => Promise<void>;
  fetchPages: () => Promise<void>;
  fetchPage: (slug: string) => Promise<void>;
  updateProfile: (data: API.UpdateUserDetails) => Promise<void>;
  updateAvatar: (avatar: File) => Promise<void>;
  topicPing: (topicId: number) => Promise<Boolean>;
  topicIsFinished: (topicId: number) => Boolean;
  getNextPrevTopic: (topicId: number, next?: boolean) => API.Topic | null;
  courseProgress: (courseId: number) => number;
  fontSizeToggle: (bigger: boolean) => void;
  socialAuthorize: (token: string) => void;
  fetchNotifications: () => Promise<void>;
  readNotify: (id: string) => Promise<void>;
  fetchH5P: (id: string) => void;
  getRefreshedToken: () => Promise<void>;
  fetchConsultations: (filter: API.ConsultationParams) => Promise<void>;
  fetchConsultation: (id: number) => Promise<void>;
  fetchUserConsultations: () => Promise<void>;
  fetchFields: (filter: API.FieldsParams) => Promise<void>;
  fetchStationaryEvents: (filter: API.StationaryEventsParams) => Promise<void>;
  bookConsultationTerm: (
    id: number,
    term: string
  ) => Promise<API.ScheduleConsultationResponse>;
  getProductInfo: (id: number) => Promise<API.DefaultResponse<API.Product>>;
  fetchWebinars: (filter: API.WebinarParams) => Promise<void>;
  fetchEvents: (filter: API.EventsParams) => Promise<void>;
  fetchTutorConsultations: () => Promise<void>;
  approveConsultationTerm: (consultation: number) => Promise<void>;
  rejectConsultationTerm: (consultation: number) => Promise<void>;
  changePassword: (
    body: API.ChangePasswordRequest
  ) => Promise<API.AuthResponse>;
  generateConsultationJitsy: (
    consultation: number
  ) => Promise<API.DefaultResponse<API.JitsyData>>;
  generateWebinarJitsy: (
    webinarId: number
  ) => Promise<API.DefaultResponse<API.JitsyData>>;
  fetchUserWebinars: () => Promise<void>;
  realizeVoucher: (voucher: string) => Promise<API.AuthResponse>;
  fetchQuestionnaires: (
    model: string,
    id: number
  ) => Promise<
    API.DefaultMetaResponse<EscolaLms.Questionnaire.Models.Questionnaire>
  >;
  sendQuestionnaireAnswer: (
    model: string,
    modelID: number,
    id: number,
    body: Partial<EscolaLms.Questionnaire.Models.QuestionAnswer>
  ) => Promise<
    API.DefaultResponse<EscolaLms.Questionnaire.Models.QuestionAnswer>
  >;
  fetchUserStationaryEvents: () => Promise<void>;
  fetchOrderInvoice: (id: number) => Promise<Blob>;
}
export type EscolaLMSContextConfig = EscolaLMSContextReadConfig &
  EscolaLMSContextAPIConfig;

export type SortProgram = (lessons: API.Lesson[]) => API.Lesson[];
