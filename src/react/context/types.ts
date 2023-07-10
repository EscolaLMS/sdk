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
  byId?: Record<
    number | string,
    { loading: boolean; value?: T; error?: API.DefaultResponseError }
  >;
}

export interface EscolaLMSContextReadConfig {
  token?: string | null;
  courses: ContextPaginatedMetaState<API.CourseListItem>;
  userGroup: ContextStateValue<API.UserGroup>;
  userGroups: ContextPaginatedMetaState<API.UserGroup>;
  registerableGroups: ContextListState<API.UserGroup>;
  course: ContextStateValue<API.CourseListItem>;
  program: ContextStateValue<API.CourseProgram>;
  settings: ContextStateValue<API.AppSettings>;
  config: ContextStateValue<API.AppConfig>;
  uniqueTags: ContextListState<API.Tag>;
  categoryTree: ContextListState<API.Category>;
  user: ContextStateValue<API.UserAsProfile>;
  cart: ContextStateValue<API.Cart>;
  progress: ContextStateValue<API.CourseProgress>;
  courseProgressDetails: ContextStateValue<API.CourseProgressDetails>;
  tutors: ContextListState<API.UserItem>;
  tutor: ContextStateValue<API.UserItem>;
  orders: ContextPaginatedMetaState<API.Order>;
  payments: ContextPaginatedMetaState<API.Payment>;
  certificates: ContextPaginatedMetaState<API.Certificate>;
  mattermostChannels: ContextStateValue<API.MattermostData>;
  pages: ContextPaginatedMetaState<API.PageListItem>;
  page: ContextStateValue<API.Page>;
  notifications: ContextPaginatedMetaState<API.Notification>;
  h5p: ContextStateValue<API.H5PObject>;
  tokenExpireDate?: string | null;
  consultations: ContextPaginatedMetaState<API.Consultation>;
  consultation: ContextStateValue<API.Consultation>;
  fields: ContextListState<API.Metadata>;
  stationaryEvents: ContextPaginatedMetaState<API.StationaryEvent>;
  userConsultations: ContextPaginatedMetaState<API.Consultation>;
  webinars: ContextPaginatedMetaState<API.Webinar>;
  tutorConsultations: ContextPaginatedMetaState<API.AppointmentTerm>;
  events: ContextPaginatedMetaState<API.Event>;
  webinar: ContextStateValue<API.Webinar>;
  stationaryEvent: ContextStateValue<API.StationaryEvent>;
  userWebinars: ContextListState<API.Event>;
  products: ContextPaginatedMetaState<API.Product>;
  product: ContextStateValue<API.Product>;
  userStationaryEvents: ContextListState<API.StationaryEvent>;
  tasks: ContextPaginatedMetaState<API.Task>;
  task: ContextStateValue<API.Task>;
  courseAccess: ContextPaginatedMetaState<API.CourseAccessEnquiry>;
  myCourses: ContextStateValue<number[]>;
  consultationAccess: ContextPaginatedMetaState<API.ConsultationsAccessEnquiry>;
  bookmarkNotes: ContextPaginatedMetaState<API.BookmarkNote>;
  subjects: ContextPaginatedMetaState<API.GroupSubject>;
  schedule: ContextListState<API.ScheduleData>;
  scheduleTutors: ContextListState<API.LessonTutor>;
  attendances: ContextStateValue<API.Attendance[]>;
  exams: ContextStateValue<API.Exam[]>;
  semesters: ContextListState<API.SemesterData>;
  academicYears: ContextListState<API.AcademicYear>;
}

export interface EscolaLMSContextAPIConfig {
  apiUrl: string;
  getImagePrefix: () => string;
  getImageSvgPrefix: () => string;
  fetchCourses: (
    filter: API.CourseParams
  ) => Promise<API.DefaultMetaResponse<API.Course>>;

  fetchUserGroup: (
    id: number
  ) => Promise<
    | void
    | API.DefaultResponse<API.UserGroup>
    | API.DefaultMetaResponse<API.UserGroup>
  >;
  fetchUserGroups: (
    params: API.UserGroupsParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.UserGroup>
    | API.DefaultMetaResponse<API.UserGroup>
  >;
  fetchRegisterableGroups: () => Promise<
    | void
    | API.DefaultResponse<API.UserGroup>
    | API.DefaultMetaResponse<API.UserGroup>
  >;
  fetchCourse: (id: number) => Promise<API.DefaultResponse<API.Course>>;
  fetchProgram: (id: number) => Promise<API.DefaultResponse<API.CourseProgram>>;
  fetchConfig: () => Promise<
    | void
    | API.DefaultResponse<API.AppConfig>
    | API.DefaultMetaResponse<API.AppConfig>
  >;
  fetchSettings: () => Promise<
    | void
    | API.DefaultResponse<API.AppSettings>
    | API.DefaultMetaResponse<API.AppSettings>
  >;
  fetchCategories: () => Promise<
    | void
    | API.DefaultResponse<API.Category>
    | API.DefaultMetaResponse<API.Category>
  >;
  fetchTags: () => Promise<
    void | API.DefaultResponse<API.Tag> | API.DefaultMetaResponse<API.Tag>
  >;
  login: (body: API.LoginRequest) => Promise<API.LoginResponse>;
  logout: () => Promise<void>;
  register: (
    body: API.RegisterRequest
  ) => Promise<API.DefaultResponse<API.RegisterResponse>>;
  forgot: (body: API.ForgotRequest) => Promise<API.AuthResponse>;
  reset: (body: API.ResetPasswordRequest) => Promise<API.AuthResponse>;
  emailVerify: (id: string, hash: string) => Promise<API.AuthResponse>;
  initAccountDelete: (returnUrl: string) => Promise<API.AuthResponse>;
  confirmAccountDelete: (
    userId: string,
    deleteToken: string
  ) => Promise<API.AuthResponse>;
  addToCart: (id: number, quantity?: number) => Promise<API.AddProductResponse>;
  addMissingProducts: (products: number[]) => Promise<void>;
  removeFromCart: (courseId: number) => Promise<void>;
  fetchCart: () => Promise<
    void | API.DefaultResponse<API.Cart> | API.DefaultMetaResponse<API.Cart>
  >;
  resetCart: () => void;
  payWithStripe: (payment_method: string, return_url: string) => Promise<void>;
  payWithP24: (
    email: string,
    return_url: string,
    data?: API.InvoiceData
  ) => Promise<void>;
  fetchProgress: () => Promise<
    | void
    | API.DefaultResponse<API.CourseProgress>
    | API.DefaultMetaResponse<API.CourseProgress>
  >;
  fetchCourseProgress: (courseId: number) => Promise<void>;
  sendProgress: (
    courseId: number,
    data: API.CourseProgressItemElement[]
  ) => Promise<void>;
  h5pProgress: (
    courseId: string,
    topicId: number,
    statement: API.IStatement
  ) => Promise<API.SuccessResponse> | null;
  fetchTutors: () => Promise<
    | void
    | API.DefaultResponse<API.UserItem>
    | API.DefaultMetaResponse<API.UserItem>
  >;
  fetchTutor: (
    id: number
  ) => Promise<
    | void
    | API.DefaultResponse<API.UserItem>
    | API.DefaultMetaResponse<API.UserItem>
  >;
  fetchOrders: (
    params?: API.PaginationParams
  ) => Promise<
    void | API.DefaultResponse<API.Order> | API.DefaultMetaResponse<API.Order>
  >;
  fetchPayments: () => Promise<
    | void
    | API.DefaultResponse<API.Payment>
    | API.DefaultMetaResponse<API.Payment>
  >;
  fetchProfile: () => Promise<
    | void
    | API.DefaultResponse<API.UserAsProfile>
    | API.DefaultMetaResponse<API.UserAsProfile>
  >;
  fetchCertificates: (
    params?: API.PaginationParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.Certificate>
    | API.DefaultMetaResponse<API.Certificate>
  >;
  fetchCertificate: (
    id: number
  ) => Promise<API.DefaultResponse<API.Certificate>>;
  generateCertificate: (id: number) => Promise<Blob>;
  fetchMattermostChannels: () => Promise<
    | void
    | API.DefaultResponse<API.MattermostData>
    | API.DefaultMetaResponse<API.MattermostData>
  >;
  fetchPages: () => Promise<
    void | API.DefaultResponse<API.Page> | API.DefaultMetaResponse<API.Page>
  >;
  fetchPage: (
    slug: string
  ) => Promise<
    void | API.DefaultResponse<API.Page> | API.DefaultMetaResponse<API.Page>
  >;
  updateProfile: (
    data: API.UpdateUserDetails
  ) => Promise<API.DefaultResponse<API.UserAsProfile>>;
  updateAvatar: (
    avatar: File
  ) => Promise<API.DefaultResponse<API.UserAsProfile>>;
  topicPing: (topicId: number) => Promise<Boolean>;
  topicIsFinished: (topicId: number) => Boolean;
  getNextPrevTopic: (topicId: number, next?: boolean) => API.Topic | null;
  courseProgress: (courseId: number) => number;
  socialAuthorize: (token: string) => void;
  fetchNotifications: (
    filter?: API.PaginationParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.Notification>
    | API.DefaultMetaResponse<API.Notification>
  >;
  readNotify: (id: string) => Promise<void>;
  readAllNotifications: () => Promise<void>;
  fetchH5P: (uuid: string) => void;
  getRefreshedToken: () => Promise<void>;
  fetchConsultations: (
    filter: API.ConsultationParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.Consultation>
    | API.DefaultMetaResponse<API.Consultation>
  >;
  fetchConsultation: (
    id: number
  ) => Promise<
    | void
    | API.DefaultResponse<API.Consultation>
    | API.DefaultMetaResponse<API.Consultation>
  >;
  fetchUserConsultations: () => Promise<
    | void
    | API.DefaultResponse<API.Consultation>
    | API.DefaultMetaResponse<API.Consultation>
  >;
  fetchFields: (
    filter: API.FieldsParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.Metadata>
    | API.DefaultMetaResponse<API.Metadata>
  >;
  fetchStationaryEvents: (
    filter: API.StationaryEventsParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.StationaryEvent>
    | API.DefaultMetaResponse<API.StationaryEvent>
  >;
  fetchStationaryEvent: (
    id: number
  ) => Promise<
    | void
    | API.DefaultResponse<API.StationaryEvent>
    | API.DefaultMetaResponse<API.StationaryEvent>
  >;
  bookConsultationTerm: (
    id: number,
    term: string
  ) => Promise<API.ScheduleConsultationResponse>;
  fetchProducts: (
    filter: API.PageParams &
      API.PaginationParams & { type?: string; "tags[]"?: string; name?: string }
  ) => Promise<API.DefaultMetaResponse<API.Product>>;
  fetchProduct: (id: number) => Promise<API.DefaultResponse<API.Product>>;
  getProductInfo: (id: number) => Promise<API.DefaultResponse<API.Product>>;
  fetchWebinars: (
    filter: API.WebinarParams
  ) => Promise<API.DefaultMetaResponse<API.Webinar>>;
  fetchWebinar: (id: number) => Promise<API.DefaultResponse<API.Webinar>>;
  fetchEvents: (
    filter: API.EventsParams
  ) => Promise<
    void | API.DefaultResponse<API.Event> | API.DefaultMetaResponse<API.Event>
  >;
  fetchTutorConsultations: () => Promise<
    | void
    | API.DefaultResponse<API.AppointmentTerm>
    | API.DefaultMetaResponse<API.AppointmentTerm>
  >;
  approveConsultationTerm: (
    consultation: number
  ) => Promise<
    | void
    | API.DefaultResponse<API.AppointmentTerm>
    | API.DefaultMetaResponse<API.AppointmentTerm>
  >;
  rejectConsultationTerm: (
    consultation: number
  ) => Promise<
    | void
    | API.DefaultResponse<API.AppointmentTerm>
    | API.DefaultMetaResponse<API.AppointmentTerm>
  >;
  changePassword: (
    body: API.ChangePasswordRequest
  ) => Promise<API.AuthResponse>;
  generateConsultationJitsy: (
    consultation: number
  ) => Promise<API.DefaultResponse<API.JitsyData>>;
  generateWebinarJitsy: (
    webinarId: number
  ) => Promise<API.DefaultResponse<API.JitsyData>>;
  fetchUserWebinars: () => Promise<
    void | API.DefaultResponse<API.Event> | API.DefaultMetaResponse<API.Event>
  >;
  realizeVoucher: (voucher: string) => Promise<API.AuthResponse>;
  createTeamsChat: (id: number) => Promise<API.TeamsChatResponse>;
  removeVoucher: () => Promise<API.AuthResponse>;
  fetchQuestionnaires: (
    model: string,
    id: number
  ) => Promise<API.DefaultMetaResponse<API.Questionnaire>>;
  fetchQuestionnaire: (
    modelTypeTitle: string,
    modelID: number,
    id: number
  ) => Promise<API.DefaultResponse<API.QuestionnaireAnswerResponse>>;
  fetchQuestionnaireStars: (
    modelTypeTitle: string,
    modelID: number,
    id: number
  ) => Promise<API.DefaultResponse<API.QuestionnaireStars>>;
  fetchQuestionnairesAnswers: (
    modelTypeTitle: string,
    modelID: number,
    id: number,
    params?: API.PaginationParams
  ) => Promise<API.DefaultMetaResponse<API.QuestionAnswer>>;
  sendQuestionnaireAnswer: (
    model: string,
    modelID: number,
    id: number,
    body: Partial<EscolaLms.Questionnaire.Models.QuestionAnswer>
  ) => Promise<
    API.DefaultResponse<EscolaLms.Questionnaire.Models.QuestionAnswer>
  >;
  fetchUserStationaryEvents: () => Promise<
    | void
    | API.DefaultResponse<API.StationaryEvent>
    | API.DefaultMetaResponse<API.StationaryEvent>
  >;
  fetchOrderInvoice: (id: number) => Promise<Blob>;
  changeConsultationTerm: (
    termId: number,
    newDate: string
  ) => Promise<API.DefaultResponse<object>>;
  fetchTasks: (
    filter: API.TaskParams
  ) => Promise<
    void | API.DefaultResponse<API.Task> | API.DefaultMetaResponse<API.Task>
  >;
  fetchCourseAccess: (
    filter?: API.CourseAccessEnquiryListParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.CourseAccessEnquiry>
    | API.DefaultMetaResponse<API.CourseAccessEnquiry>
  >;
  fetchMyCourses: () => Promise<void>;
  addCourseAccess: (
    data: API.CourseAccessEnquiryCreateRequest
  ) => Promise<API.DefaultResponse<API.CourseAccessEnquiry>>;
  deleteCourseAccess: (
    id: number
  ) => Promise<API.DefaultResponse<API.CourseAccessEnquiry>>;

  fetchConsultationAccess: (
    filter?: API.CourseAccessEnquiryListParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.ConsultationsAccessEnquiry>
    | API.DefaultMetaResponse<API.ConsultationsAccessEnquiry>
  >;
  addConsultationAccess: (
    data: API.ConsultationsAccessEnquiryCreateRequest
  ) => Promise<API.DefaultResponse<API.ConsultationsAccessEnquiry>>;
  deleteConsultationAccess: (
    id: number
  ) => Promise<API.DefaultResponse<API.ConsultationsAccessEnquiry>>;
  updateConsultationAccess: (
    id: number,
    data: API.ConsultationsAccessEnquiryUpdateRequest
  ) => Promise<API.DefaultResponse<API.ConsultationsAccessEnquiry>>;

  addTask: (
    data: EscolaLms.Tasks.Http.Requests.CreateTaskRequest
  ) => Promise<API.DefaultResponse<API.Task>>;
  deleteTask: (id: number) => Promise<API.DefaultResponse<API.Task>>;
  fetchAttendances: (
    groupId: number
  ) => Promise<
    | void
    | API.DefaultResponse<API.Attendance[]>
    | API.DefaultMetaResponse<API.Attendance[]>
  >;
  fetchTask: (
    id: number
  ) => Promise<
    void | API.DefaultResponse<API.Task> | API.DefaultMetaResponse<API.Task>
  >;
  updateTask: (
    id: number,
    data: EscolaLms.Tasks.Http.Requests.UpdateTaskRequest
  ) => Promise<API.DefaultResponse<API.Task>>;
  updateTaskStatus: (
    id: number,
    done: boolean
  ) => Promise<API.DefaultResponse<API.Task>>;

  createTaskNote: (
    id: number,
    note: string
  ) => Promise<API.DefaultResponse<API.TaskNote>>;
  updateTaskNote: (
    id: number,
    taskNoteId: number,
    note: string
  ) => Promise<API.DefaultResponse<API.TaskNote>>;
  deleteTaskNote: (
    taskNoteId: number
  ) => Promise<API.DefaultResponse<API.TaskNote>>;

  fetchBookmarkNotes: (
    filter?: API.BookmarkNoteParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.BookmarkNote>
    | API.DefaultMetaResponse<API.BookmarkNote>
  >;
  createBookmarkNote: (
    body: EscolaLms.Bookmarks.Http.Requests.CreateBookmarkRequest
  ) => Promise<API.DefaultResponse<API.BookmarkNote>>;
  updateBookmarkNote: (
    id: number,
    body: EscolaLms.Bookmarks.Http.Requests.UpdateBookmarkRequest
  ) => Promise<API.DefaultResponse<API.BookmarkNote>>;
  deleteBookmarkNote: (
    id: number
  ) => Promise<API.DefaultResponse<API.BookmarkNote>>;
  fetchSubjects: (
    params?: API.SubjectsParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.GroupSubject>
    | API.DefaultMetaResponse<API.GroupSubject>
  >;
  fetchSchedule: () => Promise<
    | void
    | API.DefaultResponse<API.ScheduleData>
    | API.DefaultMetaResponse<API.ScheduleData>
  >;
  fetchScheduleTutors: () => Promise<
    | void
    | API.DefaultResponse<API.LessonTutor>
    | API.DefaultMetaResponse<API.LessonTutor>
  >;
  fetchExams: (
    params?: API.ExamsParams
  ) => Promise<
    void | API.DefaultResponse<API.Exam[]> | API.DefaultMetaResponse<API.Exam[]>
  >;
  fetchSemesters: (
    params?: API.SemestersParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.SemesterData>
    | API.DefaultMetaResponse<API.SemesterData>
  >;
  fetchAcademicYears: (
    params?: API.AcademicYearParams
  ) => Promise<
    | void
    | API.DefaultResponse<API.AcademicYear>
    | API.DefaultMetaResponse<API.AcademicYear>
  >;
}
export type EscolaLMSContextConfig = EscolaLMSContextReadConfig &
  EscolaLMSContextAPIConfig;

export type SortProgram = (lessons: API.Lesson[]) => API.Lesson[];
