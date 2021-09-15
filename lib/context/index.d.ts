import React, { FunctionComponent } from "react";
interface IMock {
    children?: React.ReactElement[] | React.ReactElement;
    apiUrl: string;
}
interface ContextPaginatedState<T> {
    loading: boolean;
    list?: API.PaginatedList<T>;
    error?: API.DefaultResponseError;
}
interface ContextListState<T> {
    loading: boolean;
    list?: T[];
    error?: API.DefaultResponseError;
}
interface ContextStateValue<T> {
    loading: boolean;
    value?: T;
    error?: API.DefaultResponseError;
}
declare enum FontSize {
    small = 0,
    regular = 1,
    bigger = 2,
    big = 3
}
interface EscolaLMSContextConfig {
    apiUrl: string;
    courses: ContextPaginatedState<API.CourseListItem>;
    fetchCourses: (filter?: API.CourseParams) => Promise<void>;
    course: ContextStateValue<API.CourseListItem>;
    fetchCourse: (id: number) => Promise<void>;
    program: ContextStateValue<API.CourseProgram>;
    fetchProgram: (id: number) => Promise<void>;
    settings: API.AppSettings;
    uniqueTags: ContextListState<API.Tag>;
    categoryTree: ContextListState<API.Category>;
    login: (body: API.LoginRequest) => Promise<void>;
    logout: () => Promise<void>;
    register: (body: API.RegisterRequest) => Promise<API.DefaultResponse<API.RegisterResponse>>;
    forgot: (body: API.ForgotRequest) => Promise<void>;
    reset: (body: API.ResetPasswordRequest) => Promise<void>;
    user: ContextStateValue<API.UserItem>;
    addToCart: (courseId: number) => Promise<void>;
    removeFromCart: (courseId: number) => Promise<void>;
    fetchCart: () => Promise<void>;
    cart: ContextStateValue<API.Cart>;
    payWithStripe: (paymentMethodId: string) => Promise<void>;
    fetchProgress: () => Promise<void>;
    progress: ContextStateValue<API.CourseProgress>;
    sendProgress: (courseId: number, data: API.CourseProgressItemElement[]) => Promise<void>;
    h5pProgress: (courseId: string, topicId: number, statement: API.IStatement) => Promise<API.SuccessResponse> | null;
    tutors: ContextListState<API.UserItem>;
    fetchTutors: () => Promise<void>;
    tutor: ContextStateValue<API.UserItem>;
    fetchTutor: (id: number) => Promise<void>;
    orders: ContextListState<API.Order>;
    fetchOrders: () => Promise<void>;
    fetchPayments: () => Promise<void>;
    payments: ContextListState<API.Payment>;
    updateProfile: (data: API.UserItem) => Promise<void>;
    updateAvatar: (avatar: File) => Promise<void>;
    topicPing: (topicId: number) => Promise<Boolean>;
    topicIsFinished: (topicId: number) => Boolean;
    getNextPrevTopic: (topicId: number, next?: boolean) => API.Topic | null;
    courseProgress: (courseId: number) => number;
    fontSizeToggle: (bigger: boolean) => void;
    fontSize: FontSize;
    isDisabledNextTopicButton: boolean;
    setIsDisabledNextTopicButton: (state: boolean) => void;
}
export declare const SCORMPlayer: React.FC<{
    uuid: string;
}>;
export declare const EscolaLMSContext: React.Context<EscolaLMSContextConfig>;
declare type SortProgram = (lessons: API.Lesson[]) => API.Lesson[];
export declare const sortProgram: SortProgram;
/**
 *
 *
 */
export declare const EscolaLMSContextProvider: FunctionComponent<IMock>;
export {};
