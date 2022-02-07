import * as API from "./../../types/api";

import {
  ContextState,
  ContextPaginatedMetaState,
  ContextPaginatedState,
  ContextListState,
  ContextStateValue,
  FontSize,
  EscolaLMSContextReadConfig,
  EscolaLMSContextAPIConfig,
  EscolaLMSContextConfig,
  SortProgram,
} from "./types";

export const blackList: API.IEvent[] = [
  "http://adlnet.gov/expapi/verbs/attended",
  "http://adlnet.gov/expapi/verbs/attempted",
  "http://adlnet.gov/expapi/verbs/interacted",
  "http://adlnet.gov/expapi/verbs/imported",
  "http://adlnet.gov/expapi/verbs/created",
];

export const completed: API.IEvent[] = [
  "http://adlnet.gov/expapi/verbs/completed",
  // "http://adlnet.gov/expapi/verbs/answered",
  "http://activitystrea.ms/schema/1.0/consume",
  "http://adlnet.gov/expapi/verbs/passed",
  "http://adlnet.gov/expapi/verbs/mastered",
];

export const attempted: API.IEvent = "http://adlnet.gov/expapi/verbs/attempted";

export const guessTheAnswer: API.IEventException = "GuessTheAnswer";
export const questionSet: API.IEventException = "QuestionSet";

export const defaultReadConfig: EscolaLMSContextConfig = {
  apiUrl: "",
  courses: {
    loading: false,
  },
  fetchCourses: () => Promise.reject(),
  userGroup: {
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
  settings: {},
  config: {
    escola_auth: {
      additional_fields: [],
      additional_fields_required: [],
    },
  },
  fetchConfig: () => Promise.reject(),
  uniqueTags: {
    loading: false,
    list: [],
  },
  categoryTree: {
    loading: false,
    list: [],
  },
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
  addToCart: (id) => Promise.reject(id),
  removeFromCart: (id) => Promise.reject(id),
  fetchCart: () => Promise.reject(),
  cart: {
    loading: false,
    value: { total: 0, subtotal: 0, tax: 0, items: [] },
  },
  payWithStripe: (paymentMethodId: string) => Promise.reject(paymentMethodId),
  fetchProgress: () => Promise.reject(),
  progress: {
    loading: false,
    value: [],
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
    list: [],
  },
  fetchOrders: () => Promise.reject(),
  payments: {
    loading: false,
  },
  certificates: {
    loading: false,
  },
  fetchCertificates: () => Promise.reject(),
  fetchCertificate: (id) => Promise.reject(id),
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
  updateProfile: (data: API.UserItem) => Promise.reject(data),
  updateAvatar: (avatar: File) => Promise.reject(avatar),
  topicPing: (topicId: number) => Promise.reject(topicId),
  topicIsFinished: (topicId: number) => false,
  courseProgress: (courseId: number) => 0,
  getNextPrevTopic: (topicId: number, next?: boolean) => null,
  fontSizeToggle: (bigger: boolean) => 0,
  fontSize: FontSize.regular,
  socialAuthorize: (token: string) => Promise.reject(),
  notifications: {
    loading: false,
    list: [],
  },
  fetchNotifications: () => Promise.reject(),
  readNotify: (id: string) => Promise.reject(),
  h5p: {
    loading: false,
  },
  fetchH5P: (id: string) => Promise.reject(),
};

export const defaultApiConfig: EscolaLMSContextConfig = {
  apiUrl: "",
  courses: {
    loading: false,
  },
  fetchCourses: () => Promise.reject(),
  userGroup: {
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
  settings: {},
  config: {
    escola_auth: {
      additional_fields: [],
      additional_fields_required: [],
    },
  },
  fetchConfig: () => Promise.reject(),
  uniqueTags: {
    loading: false,
    list: [],
  },
  categoryTree: {
    loading: false,
    list: [],
  },
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
  addToCart: (id) => Promise.reject(id),
  removeFromCart: (id) => Promise.reject(id),
  fetchCart: () => Promise.reject(),
  cart: {
    loading: false,
    value: { total: 0, subtotal: 0, tax: 0, items: [] },
  },
  payWithStripe: (paymentMethodId: string) => Promise.reject(paymentMethodId),
  fetchProgress: () => Promise.reject(),
  progress: {
    loading: false,
    value: [],
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
    list: [],
  },
  fetchOrders: () => Promise.reject(),
  payments: {
    loading: false,
  },
  certificates: {
    loading: false,
  },
  fetchCertificates: () => Promise.reject(),
  fetchCertificate: (id) => Promise.reject(id),
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
  updateProfile: (data: API.UserItem) => Promise.reject(data),
  updateAvatar: (avatar: File) => Promise.reject(avatar),
  topicPing: (topicId: number) => Promise.reject(topicId),
  topicIsFinished: (topicId: number) => false,
  courseProgress: (courseId: number) => 0,
  getNextPrevTopic: (topicId: number, next?: boolean) => null,
  fontSizeToggle: (bigger: boolean) => 0,
  fontSize: FontSize.regular,
  socialAuthorize: (token: string) => Promise.reject(),
  notifications: {
    loading: false,
    list: [],
  },
  fetchNotifications: () => Promise.reject(),
  readNotify: (id: string) => Promise.reject(),
  h5p: {
    loading: false,
  },
  fetchH5P: (id: string) => Promise.reject(),
};

export const defaultConfig = Object.assign(
  {},
  defaultReadConfig,
  defaultApiConfig
);
