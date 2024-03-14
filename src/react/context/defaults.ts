import * as API from "./../../types/api";

import { EscolaLMSContextConfig } from "./types";

export const blackList: API.IEvent[] = [
  "http://adlnet.gov/expapi/verbs/attended",
  "http://adlnet.gov/expapi/verbs/attempted",
  "http://adlnet.gov/expapi/verbs/interacted",
  "http://adlnet.gov/expapi/verbs/imported",
  "http://adlnet.gov/expapi/verbs/created",
];

export const completed: API.IEvent[] = [
  "http://adlnet.gov/expapi/verbs/completed",
  "http://adlnet.gov/expapi/verbs/answered",
  "http://activitystrea.ms/schema/1.0/consume",
  "http://adlnet.gov/expapi/verbs/passed",
  "http://adlnet.gov/expapi/verbs/mastered",
];

export const attempted: API.IEvent = "http://adlnet.gov/expapi/verbs/attempted";

export const guessTheAnswer: API.IEventException = "GuessTheAnswer";
export const questionSet: API.IEventException = "QuestionSet";

/** TODO this should be divide into each file and just imported here and merged into one object   */
export const defaultReadConfig: EscolaLMSContextConfig = {
  apiUrl: "",

  getImagePrefix: () => "",
  getImageSvgPrefix: () => "",
  courses: {
    loading: false,
  },
  fetchCourses: () => Promise.reject(),
  userGroup: {
    loading: false,
  },
  fetchChallenges: () => Promise.reject(),
  challenges: {
    loading: false,
  },
  fetchUserGroup: () => Promise.reject(),
  userGroups: {
    loading: false,
  },
  fetchUserGroups: () => Promise.reject(),
  registerableGroups: {
    loading: false,
  },
  fetchRegisterableGroups: () => Promise.reject(),
  course: {
    loading: false,
  },
  fetchCourse: (id: number) => Promise.reject(),
  program: {
    loading: false,
  },
  fetchProgram: (id: number) => Promise.reject(),
  login: (body: API.LoginRequest) => Promise.reject(),
  logout: () => Promise.reject(),
  settings: { loading: false, value: {} },
  fetchSettings: () => Promise.reject(),
  config: {
    loading: false,
    value: {},
  },
  fetchConfig: () => Promise.reject(),
  uniqueTags: {
    loading: false,
    list: [],
  },
  fetchTags: () => Promise.reject(),
  categoryTree: {
    loading: false,
    list: [],
  },
  fetchCategories: () => Promise.reject(),
  user: {
    loading: false,
  },
  register: () =>
    Promise.reject({
      success: false,
      message: "register method not implemented",
    }),
  forgot: (body: API.ForgotRequest) => Promise.reject(),
  reset: (body: API.ResetPasswordRequest) => Promise.reject(),
  emailVerify: (id: string, hash: string) => Promise.reject(),
  initAccountDelete: () => Promise.reject(),
  confirmAccountDelete: () => Promise.reject(),
  addToCart: (id: number, quantity?: number) => Promise.reject(),
  addMissingProducts: (products: number[]) => Promise.reject(),
  removeFromCart: (id) => Promise.reject(id),
  fetchCart: () => Promise.reject(),
  resetCart: () => Promise.reject(),
  cart: {
    loading: false,
    value: {
      total: 0,
      subtotal: 0,
      tax: 0,
      items: [],
      coupon: null,
      total_with_tax: 0,
    },
  },
  payWithStripe: (payment_method: string, return_url: string) =>
    Promise.reject(payment_method),
  payWithP24: (email: string, return_url: string, data?: API.InvoiceData) =>
    Promise.reject(),
  fetchProgress: () => Promise.reject(),
  fetchPaginatedProgress: () => Promise.reject(),
  paginatedProgress: {
    loading: false,
  },
  fetchMyAuthoredCourses: () => Promise.reject(),
  fetchCourseProgress: (id: number) => Promise.reject(),
  courseProgressDetails: {
    loading: false,
    byId: {},
  },
  progress: {
    loading: false,
    value: [],
  },
  myAuthoredCourses: {
    loading: false,
  },
  sendProgress: (courseId: number, data: API.CourseProgressItemElement[]) =>
    Promise.reject(),
  h5pProgress: (courseId: string, topicId: number, statement: API.IStatement) =>
    Promise.reject(),

  tutors: {
    loading: false,
    list: [],
  },
  fetchTutors: () => Promise.reject(),
  tutor: {
    loading: false,
  },
  fetchTutor: (id: number) => Promise.reject(id),
  orders: {
    loading: false,
  },
  fetchOrders: (filter?: API.PaginationParams) => Promise.reject(),
  payments: {
    loading: false,
  },
  certificates: {
    loading: false,
  },
  fetchCertificates: (params?: API.PaginationParams) => Promise.reject(),
  fetchCertificate: (id) => Promise.reject(id),
  generateCertificate: (id) => Promise.reject(id),
  getProductInfo: (id: number) => Promise.reject(id),
  pages: {
    loading: false,
  },
  mattermostChannels: {
    loading: false,
    value: { server: "", teams: [] },
  },
  fetchMattermostChannels: () => Promise.reject(),
  fetchPages: () => Promise.reject(),
  page: {
    loading: false,
  },
  fetchPage: (slug: string) => Promise.reject(),
  fetchPayments: () => Promise.reject(),
  fetchProfile: () => Promise.reject(),
  updateProfile: (data: API.UpdateUserDetails) => Promise.reject(data),
  updateProfileEmail: (data: API.UpdateUserEmail) => Promise.reject(data),
  updateAvatar: (avatar: File) => Promise.reject(avatar),
  topicPing: (topicId: number) => Promise.reject(topicId),
  topicIsFinished: (topicId: number) => false,
  courseProgress: (courseId: number) => 0,
  getNextPrevTopic: (topicId: number, next?: boolean) => null,
  socialAuthorize: (token: string) => Promise.reject(),
  notifications: {
    loading: false,
  },
  fetchNotifications: (params?: API.PaginationParams) => Promise.reject(),
  readAllNotifications: () => Promise.reject(),
  readNotify: (id: string) => Promise.reject(),
  h5p: {
    loading: false,
  },
  fetchH5P: (id: string) => Promise.reject(),
  getRefreshedToken: () => Promise.reject(),
  fetchConsultations: () => Promise.reject(),
  fetchConsultation: (id: number) => Promise.reject(),
  fetchUserConsultations: () => Promise.reject(),
  consultation: {
    loading: false,
  },
  consultations: {
    loading: false,
  },
  userConsultations: {
    loading: false,
  },
  userWebinars: { loading: false },
  fetchUserWebinars: () => Promise.reject(),
  fetchWebinar: (id: number) => Promise.reject(),
  fetchProducts: (
    filter: API.PageParams &
      API.PaginationParams & { type?: string; "tags[]"?: string; name?: string }
  ) => Promise.reject(),
  fetchProduct: (id: number) => Promise.reject(),
  fields: {
    loading: false,
    list: [],
  },
  fetchFields: (filter: API.FieldsParams) => Promise.reject(),
  stationaryEvents: {
    loading: false,
  },
  stationaryEvent: {
    loading: false,
  },
  tutorConsultations: {
    loading: false,
  },
  fetchStationaryEvents: (filter: API.StationaryEventsParams) =>
    Promise.reject(),
  fetchStationaryEvent: (id: number) => Promise.reject(),
  bookConsultationTerm: (id: number, term: string) => Promise.reject(),
  fetchWebinars: (filter: API.WebinarParams) => Promise.reject(),
  fetchTutorConsultations: () => Promise.reject(),
  approveConsultationTerm: (consultationTermId: number) => Promise.reject(),
  rejectConsultationTerm: (consultationTermId: number) => Promise.reject(),
  generateConsultationJitsy: (consultationTermId: number) =>
    Promise.reject(consultationTermId),
  generateWebinarJitsy: (webinarId: number) => Promise.reject(webinarId),
  webinars: {
    loading: false,
  },
  webinar: {
    loading: false,
  },
  events: { loading: false },
  fetchEvents: (filter: API.EventsParams) => Promise.reject(),
  changePassword: () => Promise.reject(),
  realizeVoucher: () => Promise.reject(),
  removeVoucher: () => Promise.reject(),
  createTeamsChat: () => Promise.reject(),
  products: {
    loading: false,
  },
  product: {
    loading: false,
  },
  fetchQuestionnaires: (model: string, id: number) => Promise.reject(),
  fetchQuestionnaire: (modelTypeTitle: string, modelID: number, id: number) =>
    Promise.reject(),
  fetchQuestionnairesAnswers: (
    modelTypeTitle: string,
    modelID: number,
    id: number,
    params?: API.PaginationParams
  ) => Promise.reject(),
  fetchQuestionnaireStars: (
    modelTypeTitle: string,
    modelID: number,
    id: number
  ) => Promise.reject(),
  fetchQuestionnaireStarsByModel: (modelTypeTitle: string, modelID: number) =>
    Promise.reject(),
  sendQuestionnaireAnswer: (
    model: string,
    modelID: number,
    id: number,
    body: Partial<EscolaLms.Questionnaire.Models.QuestionAnswer>
  ) => Promise.reject(),
  fetchUserStationaryEvents: () => Promise.reject(),
  userStationaryEvents: {
    loading: false,
  },
  fetchOrderInvoice: (id: number) => Promise.reject(id),
  changeConsultationTerm: (termId: number, newDate: string) => Promise.reject(),
  tasks: {
    loading: false,
  },
  fetchTasks: (filter: API.TaskParams) => Promise.reject(),
  courseAccess: {
    loading: false,
  },
  myCourses: {
    loading: false,
    value: [],
  },
  fetchMyCourses: () => Promise.reject(),
  fetchCourseAccess: (filter?: API.CourseAccessEnquiryListParams) =>
    Promise.reject(),
  addCourseAccess: (data: API.CourseAccessEnquiryCreateRequest) =>
    Promise.reject(),
  deleteCourseAccess: (id: number) => Promise.reject(),
  task: {
    loading: false,
  },
  challenge: {
    loading: false,
  },
  attendances: {
    loading: false,
  },

  consultationAccessEnquiry: {
    loading: false,
  },
  fetchConsultationAccessEnquiry: (enquiryId: number) => Promise.reject(),

  consultationAccess: {
    loading: false,
  },
  fetchConsultationAccess: (filter?: API.CourseAccessEnquiryListParams) =>
    Promise.reject(),
  addConsultationAccess: (data: API.ConsultationsAccessEnquiryCreateRequest) =>
    Promise.reject(),
  deleteConsultationAccess: (id: number) => Promise.reject(),
  updateConsultationAccess: (
    id: number,
    data: API.ConsultationsAccessEnquiryUpdateRequest
  ) => Promise.reject(),

  fetchTask: (id: number) => Promise.reject(),
  fetchChallenge: (id: number) => Promise.reject(),
  fetchAttendances: (groupId: number) => Promise.reject(),
  deleteTask: (id: number) => Promise.reject(),
  addTask: (data: EscolaLms.Tasks.Http.Requests.CreateTaskRequest) =>
    Promise.reject(),
  updateTask: (
    id: number,
    data: EscolaLms.Tasks.Http.Requests.UpdateTaskRequest
  ) => Promise.reject(),
  updateTaskStatus: (id: number, done: boolean) => Promise.reject(id),
  createTaskNote: (id: number, note: string) => Promise.reject(id),
  updateTaskNote: (id: number, taskNoteId: number, note: string) =>
    Promise.reject(id),
  deleteTaskNote: (taskNoteId: number) => Promise.reject(taskNoteId),
  schedule: {
    loading: false,
    list: [],
  },
  scheduleTutors: {
    loading: false,
    list: [],
  },
  fetchSchedule: () => Promise.reject(),
  fetchScheduleTutors: () => Promise.reject(),
  bookmarkNotes: {
    loading: false,
  },
  fetchBookmarkNotes: (filter?: API.BookmarkNoteParams) => Promise.reject(),
  createBookmarkNote: (
    body: EscolaLms.Bookmarks.Http.Requests.CreateBookmarkRequest
  ) => Promise.reject(),
  updateBookmarkNote: (
    id: number,
    body: EscolaLms.Bookmarks.Http.Requests.UpdateBookmarkRequest
  ) => Promise.reject(id),
  deleteBookmarkNote: (id: number) => Promise.reject(id),

  subjects: {
    loading: false,
  },
  fetchExams: (params?: API.ExamsParams) => Promise.reject(),
  exams: {
    loading: false,
  },
  fetchSubjects: (params?: API.SubjectsParams) => Promise.reject(),
  fetchSemesters: (params?: API.SemestersParams) => Promise.reject(),
  semesters: {
    loading: false,
    list: [],
  },
  academicYears: {
    loading: false,
    list: [],
  },
  fetchAcademicYears: (params?: API.AcademicYearParams) => Promise.reject(),
  dictionariesWords: {
    loading: false,
  },
  fetchDictionariesWords: () => Promise.reject(),
  dictionariesWord: {
    loading: false,
  },
  fetchDictionariesWord: () => Promise.reject(),
};

export const defaultApiConfig: EscolaLMSContextConfig = {
  apiUrl: "",
  myCourses: {
    loading: false,
    value: [],
  },
  fetchMyCourses: () => Promise.reject(),
  getImagePrefix: () => "",
  getImageSvgPrefix: () => "",
  courses: {
    loading: false,
  },
  fetchCourses: () => Promise.reject(),
  userGroup: {
    loading: false,
  },
  fetchChallenges: () => Promise.reject(),
  challenges: {
    loading: false,
  },
  fetchUserGroup: () => Promise.reject(),
  userGroups: {
    loading: false,
  },
  fetchUserGroups: () => Promise.reject(),
  registerableGroups: {
    loading: false,
  },
  fetchRegisterableGroups: () => Promise.reject(),
  course: {
    loading: false,
  },
  fetchCourse: (id: number) => Promise.reject(),
  program: {
    loading: false,
  },
  fetchProgram: (id: number) => Promise.reject(),
  login: (body: API.LoginRequest) => Promise.reject(),
  logout: () => Promise.reject(),
  settings: {
    loading: false,
    value: [],
  },
  fetchSettings: () => Promise.reject(),
  config: {
    loading: false,
    value: {
      escola_auth: {
        additional_fields: [],
        additional_fields_required: [],
      },
    },
  },
  fetchConfig: () => Promise.reject(),
  uniqueTags: {
    loading: false,
    list: [],
  },
  fetchTags: () => Promise.reject(),
  categoryTree: {
    loading: false,
    list: [],
  },
  fetchCategories: () => Promise.reject(),

  user: {
    loading: false,
  },
  register: () =>
    Promise.reject({
      success: false,
      message: "register method not implemented",
    }),
  forgot: (body: API.ForgotRequest) => Promise.reject(),
  reset: (body: API.ResetPasswordRequest) => Promise.reject(),
  emailVerify: (id: string, hash: string) => Promise.reject(),
  initAccountDelete: () => Promise.reject(),
  confirmAccountDelete: () => Promise.reject(),
  addToCart: (id: number, quantity?: number) => Promise.reject(),
  addMissingProducts: (products: number[]) => Promise.reject(),
  removeFromCart: (id) => Promise.reject(id),
  fetchCart: () => Promise.reject(),
  resetCart: () => Promise.reject(),
  cart: {
    loading: false,
    value: {
      total: 0,
      subtotal: 0,
      tax: 0,
      items: [],
      coupon: null,
      total_with_tax: 0,
    },
  },
  payWithStripe: (payment_method: string, return_url: string) =>
    Promise.reject(payment_method),
  payWithP24: (email: string, return_url: string, data?: API.InvoiceData) =>
    Promise.reject(),
  fetchProgress: () => Promise.reject(),
  fetchPaginatedProgress: () => Promise.reject(),
  paginatedProgress: {
    loading: false,
  },
  fetchMyAuthoredCourses: () => Promise.reject(),
  fetchCourseProgress: (id) => Promise.reject(),
  courseProgressDetails: {
    loading: false,
    byId: {},
  },
  progress: {
    loading: false,
    value: [],
  },
  myAuthoredCourses: {
    loading: false,
  },
  sendProgress: (courseId: number, data: API.CourseProgressItemElement[]) =>
    Promise.reject(),
  h5pProgress: (courseId: string, topicId: number, statement: API.IStatement) =>
    Promise.reject(),

  tutors: {
    loading: false,
    list: [],
  },
  fetchTutors: () => Promise.reject(),
  tutor: {
    loading: false,
  },
  fetchTutor: (id: number) => Promise.reject(id),
  orders: {
    loading: false,
  },
  fetchOrders: (filter?: API.PaginationParams) => Promise.reject(),
  payments: {
    loading: false,
  },
  certificates: {
    loading: false,
  },
  fetchCertificates: (params?: API.PaginationParams) => Promise.reject(),
  fetchCertificate: (id) => Promise.reject(id),
  generateCertificate: (id) => Promise.reject(id),
  getProductInfo: (id: number) => Promise.reject(id),
  pages: {
    loading: false,
  },
  mattermostChannels: {
    loading: false,
    value: { server: "", teams: [] },
  },
  fetchMattermostChannels: () => Promise.reject(),
  fetchPages: () => Promise.reject(),
  page: {
    loading: false,
  },
  fetchPage: (slug: string) => Promise.reject(),
  fetchPayments: () => Promise.reject(),
  fetchProfile: () => Promise.reject(),
  updateProfile: (data: API.UpdateUserDetails) => Promise.reject(data),
  updateProfileEmail: (data: API.UpdateUserEmail) => Promise.reject(data),
  updateAvatar: (avatar: File) => Promise.reject(avatar),
  topicPing: (topicId: number) => Promise.reject(topicId),
  topicIsFinished: (topicId: number) => false,
  courseProgress: (courseId: number) => 0,
  getNextPrevTopic: (topicId: number, next?: boolean) => null,
  getRefreshedToken: () => Promise.reject(),
  socialAuthorize: (token: string) => Promise.reject(),
  notifications: {
    loading: false,
  },
  fetchNotifications: (params?: API.PaginationParams) => Promise.reject(),
  readNotify: (id: string) => Promise.reject(),
  readAllNotifications: () => Promise.reject(),
  h5p: {
    loading: false,
  },
  fetchH5P: (uuid: string) => Promise.reject(),
  fetchConsultations: () => Promise.reject(),
  fetchConsultation: (id: number) => Promise.reject(),
  fetchUserConsultations: () => Promise.reject(),
  consultation: {
    loading: false,
  },
  consultations: {
    loading: false,
  },
  fields: {
    loading: false,
    list: [],
  },
  userConsultations: {
    loading: false,
  },

  tutorConsultations: {
    loading: false,
  },
  userWebinars: { loading: false },
  fetchUserWebinars: () => Promise.reject(),
  fetchWebinar: (id: number) => Promise.reject(),
  fetchProducts: (
    filter: API.PageParams &
      API.PaginationParams & { type?: string; "tags[]"?: string; name?: string }
  ) => Promise.reject(),
  fetchProduct: (id: number) => Promise.reject(),
  fetchFields: (filter: API.FieldsParams) => Promise.reject(),
  stationaryEvents: {
    loading: false,
  },
  stationaryEvent: {
    loading: false,
  },
  fetchStationaryEvents: (filter: API.StationaryEventsParams) =>
    Promise.reject(),
  fetchStationaryEvent: (id: number) => Promise.reject(),
  bookConsultationTerm: (id: number, term: string) => Promise.reject(),
  fetchWebinars: (filter: API.WebinarParams) => Promise.reject(),
  webinars: { loading: false },
  webinar: {
    loading: false,
  },
  fetchTutorConsultations: () => Promise.reject(),
  approveConsultationTerm: (consultationTermId: number) => Promise.reject(),
  rejectConsultationTerm: (consultationTermId: number) => Promise.reject(),
  generateConsultationJitsy: (consultationTermId: number) =>
    Promise.reject(consultationTermId),
  generateWebinarJitsy: (webinarId: number) => Promise.reject(webinarId),
  events: {
    loading: false,
  },
  fetchEvents: (filter: API.EventsParams) => Promise.reject(),
  changePassword: () => Promise.reject(),
  realizeVoucher: () => Promise.reject(),
  removeVoucher: () => Promise.reject(),
  createTeamsChat: () => Promise.reject(),
  products: {
    loading: false,
  },
  product: {
    loading: false,
  },
  fetchQuestionnaires: (model: string, id: number) => Promise.reject(),
  fetchQuestionnaire: (modelTypeTitle: string, modelID: number, id: number) =>
    Promise.reject(),
  fetchQuestionnairesAnswers: (
    modelTypeTitle: string,
    modelID: number,
    id: number,
    params?: API.PaginationParams
  ) => Promise.reject(),
  sendQuestionnaireAnswer: (
    model: string,
    modelID: number,
    id: number,
    body: Partial<EscolaLms.Questionnaire.Models.QuestionAnswer>
  ) => Promise.reject(),
  fetchQuestionnaireStars: (
    modelTypeTitle: string,
    modelID: number,
    id: number
  ) => Promise.reject(),
  fetchQuestionnaireStarsByModel: (modelTypeTitle: string, modelID: number) =>
    Promise.reject(),
  fetchUserStationaryEvents: () => Promise.reject(),
  userStationaryEvents: {
    loading: false,
  },
  fetchOrderInvoice: (id: number) => Promise.reject(id),
  changeConsultationTerm: (termId: number, newDate: string) => Promise.reject(),
  tasks: {
    loading: false,
  },
  fetchTasks: (filter: API.TaskParams) => Promise.reject(),

  courseAccess: {
    loading: false,
  },
  fetchCourseAccess: (filter?: API.CourseAccessEnquiryListParams) =>
    Promise.reject(),
  deleteCourseAccess: (id: number) => Promise.reject(),
  addCourseAccess: (data: API.CourseAccessEnquiryCreateRequest) =>
    Promise.reject(),

  consultationAccessEnquiry: { loading: false },
  fetchConsultationAccessEnquiry: (enquiryId: number) => Promise.reject(),

  consultationAccess: {
    loading: false,
  },
  fetchConsultationAccess: (filter?: API.ConsultationsAccessEnquiryParams) =>
    Promise.reject(),
  deleteConsultationAccess: (id: number) => Promise.reject(),
  addConsultationAccess: (data: API.ConsultationsAccessEnquiryCreateRequest) =>
    Promise.reject(),
  updateConsultationAccess: (
    id: number,
    data: API.ConsultationsAccessEnquiryUpdateRequest
  ) => Promise.reject(),

  task: {
    loading: false,
  },
  challenge: {
    loading: false,
  },
  attendances: {
    loading: false,
  },
  fetchTask: (id: number) => Promise.reject(id),
  fetchChallenge: (id: number) => Promise.reject(id),
  fetchAttendances: (groupId: number) => Promise.reject(groupId),
  deleteTask: (id: number) => Promise.reject(),
  addTask: (data: EscolaLms.Tasks.Http.Requests.CreateTaskRequest) =>
    Promise.reject(),
  updateTask: (
    id: number,
    data: EscolaLms.Tasks.Http.Requests.UpdateTaskRequest
  ) => Promise.reject(id),
  updateTaskStatus: (id: number, done: boolean) => Promise.reject(id),
  createTaskNote: (id: number, note: string) => Promise.reject(id),
  updateTaskNote: (id: number, taskNoteId: number, note: string) =>
    Promise.reject(id),
  deleteTaskNote: (taskNoteId: number) => Promise.reject(taskNoteId),
  schedule: {
    loading: false,
    list: [],
  },
  scheduleTutors: {
    loading: false,
    list: [],
  },
  fetchSchedule: () => Promise.reject(),
  fetchScheduleTutors: () => Promise.reject(),
  bookmarkNotes: {
    loading: false,
  },
  fetchBookmarkNotes: (filter?: API.BookmarkNoteParams) => Promise.reject(),
  createBookmarkNote: (
    body: EscolaLms.Bookmarks.Http.Requests.CreateBookmarkRequest
  ) => Promise.reject(),
  updateBookmarkNote: (
    id: number,
    body: EscolaLms.Bookmarks.Http.Requests.UpdateBookmarkRequest
  ) => Promise.reject(id),
  deleteBookmarkNote: (id: number) => Promise.reject(id),
  subjects: {
    loading: false,
  },
  fetchSubjects: () => Promise.reject(),
  fetchExams: () => Promise.reject(),
  exams: {
    loading: false,
  },
  fetchSemesters: () => Promise.reject(),
  semesters: {
    loading: false,
    list: [],
  },
  fetchAcademicYears: () => Promise.reject(),
  academicYears: {
    loading: false,
    list: [],
  },
  dictionariesWords: {
    loading: false,
  },
  fetchDictionariesWords: () => Promise.reject(),
  dictionariesWord: {
    loading: false,
  },
  fetchDictionariesWord: () => Promise.reject(),
};

export const defaultConfig = Object.assign(
  {},
  defaultReadConfig,
  defaultApiConfig
);
