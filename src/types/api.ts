import { API } from "..";
import { CartItem, Product, ProductItems } from "./cart-types";
import { ConsultationTerm } from "./consultation-types";
import {
  IStatementCategory,
  IResult,
  Nullable,
  PaginatedList,
  PaginatedMetaList,
  DefaultResponseSuccess,
  PaginationParams,
  DefaultResponse,
  DefaultMetaResponse,
  PageParams,
  DefaultResponseError,
  DataResponseSuccess,
  Category,
} from "./core-types";
import {
  Course,
  CourseProgressItem,
  CourseProgressItemElement,
} from "./course-types";
import {
  BookmarkableType,
  IEvent,
  TopicType,
  CertificateAssignableTypes,
  CompetencyChallengeType,
  CourseProgressItemElementStatus,
  QuestionType,
  AttendanceStatus,
  EventTypes,
  PaymentStatusType,
} from "./enums";
import { TopicableBase } from "./topic-types";

import { Author, Tutor, User, UserItem } from "./user-types";

export type IStatement = {
  actor: unknown;
  context: {
    contextActivities: {
      category: IStatementCategory[];
      parent?: IStatementCategory[];
    };
  };
  object: unknown;
  result?: IResult;
  verb: { id: IEvent };
};

export type IEventException =
  | "GuessTheAnswer"
  | "Questionnaire"
  | "QuestionSet";

export type Scale = {
  parent_category_id: number;
  category_id: number;
  scale_min: number;
};

export type ResultValue = {
  category_id: number;
  scale_category_id: number;
  parent_category_id: number;
  score: number;
  max_score: number;
  matched_course: number[];
};

export type CompetencyTestResults = {
  attempt_id: number;
  created_at: string;
  id: number;
  scale: Scale[][];
  value: ResultValue[];
};

export type CompetencyChallengeCategory = {
  id: number;
  name: string;
  parent_id?: number;
};

export type BaseCompetencyChallenge = {
  id: number;
  name: string;
  description: string;
  summary: string;
  image_path?: Nullable<string>;
  is_active: boolean;
  is_highlighted: boolean;
  quiz_id?: Nullable<number>;
  created_at: Date | string;
  categories?: number[];
  authors?: Author[];
  results: CompetencyTestResults[];
  results_count: number;
};

export type SimpleCompetencyChallenge = BaseCompetencyChallenge & {
  type: CompetencyChallengeType.Simple;
  category: CompetencyChallengeCategory;
};

export type ComplexCompetencyChallenge = BaseCompetencyChallenge & {
  type: CompetencyChallengeType.Complex;
};

export type CompetencyChallenge =
  | SimpleCompetencyChallenge
  | ComplexCompetencyChallenge;

export type ChallengesList = DefaultMetaResponse<CompetencyChallenge>;

export type CertificateList = DefaultMetaResponse<Certificate>;

export type MattermostChannelList = DefaultResponseSuccess<MattermostData>;

export type P24Response =
  DefaultResponseSuccess<EscolaLms.Payments.Models.Payment>;

export type OrderList = DefaultMetaResponse<Order>;

export type CategoryList = DataResponseSuccess<Category[]>;

export type OrderListItem = Order;

export type PaymentList = DefaultMetaResponse<Payment>;

export type PaymentListItem = Payment;

export type PageList = DefaultMetaResponse<Page>;

export type PageListItem = Page;

export type SubjectsList = DefaultMetaResponse<GroupSubject>;

export type ExamsList = DefaultMetaResponse<Exam>;

export type Schedule = DefaultResponse<ScheduleData[]>;

export type WebinarsList = DefaultMetaResponse<Webinar>;

export type ProductList = DefaultMetaResponse<Product>;

export type StationaryEventsList = DefaultMetaResponse<StationaryEvent>;

export type EventsList = DefaultMetaResponse<Event>;

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

export type ExamsParams = PaginationParams & {
  group_id?: number;
};

export type ChallengesParams = PaginationParams & {
  order_by?: "id" | "name" | "created_at";
  type?: "simple" | "complex";
  order?: "ASC" | "DESC";
  name?: string;
};

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

export type FieldsParams = {
  class_type: string;
};

export type QuizAttemptsParams = PageParams &
  PaginationParams & { topic_gift_quiz_id: number };

export type LoginRequest = {
  email: string;
  password: string;
  remember_me?: 1 | 0;
};

export type TeamsChatResponse = DefaultResponse<{
  web_url: string;
}>;

export type LoginResponse = DefaultResponse<{
  token: string;
  expires_at: string;
}>;

export type RegisterRequest = {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  return_url: string;
} & Record<string, string | number | boolean>;

export type RegisterResponse =
  | {
      success: true;
      token: string;
    }
  | DefaultResponseError;

export type ForgotRequest = {
  email: string;
  return_url: string;
};

export type AuthResponse =
  | {
      message: string;
      success: boolean;
    }
  | DefaultResponseError;

export type ResetPasswordRequest = {
  token: string;
  password: string;
  email: string;
};

export type ChangePasswordRequest = {
  current_password: string;
  new_password: string;
  new_confirm_password: string;
};

export type SemesterData = {
  id: number;
  name: string;
  type: string;
  speciality: string;
  study_plan_id: number;
  academic_year_id: number;
  is_active: boolean;
};

export type AcademicYear = {
  id: number;
  name: string;
  year: number;
  year_name: string;
  summer_semester_start: string;
  summer_semester_end: string;
  winter_semester_start: string;
  winter_semester_end: string;
  active: boolean;
};

export type UpdateUserEmail = {
  email?: string;
};

export interface CompleteSocialAuth {
  email: string;
  return_url: string;
}

export type Page = {
  id: number;
  slug: string;
  title: string;
  author_id: number;
  author: UserItem;
  content: string;
};

// TODO: create proper type
export type AppSettings = any & {
  currencies?: AppCurrency;
  consents?: {
    [key: string]: string;
  };
  faq?: {
    [key: string]: string;
  };
  homepage?: Record<string, Record<string, string>>;
  register?: {
    [key: string]: string;
  };
  env?: string;
  stripe?: {
    publishable_key: string;
  };
  global?: {
    [key: string]: string;
  };
};

export type AppConfig = Record<string, Record<string, string[] | string>>;

export type AppCurrency = {
  default: string;
  enum: string[];
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

export type OrderItems = EscolaLms.Cart.Models.CartItem & {
  name?: string;
  product?: Product;
};

export type Order = {
  id: number;
  status: PaymentStatusType;
  items?: OrderItems[] | null;
  updated_at: string | null;
  total: number;
  subtotal: number;
  tax: number;
  created_at: string | null;
  user_id: number | null;
  client_name: string | null;
  client_street: string | null;
  client_postal: string | null;
  client_city: string | null;
  client_country: string | null;
  client_company: string | null;
  client_taxid: string | null;
  client_email: string | null;
  client_street_number: string | null;
};

export type Payment = {
  amount: number;
  billable_id: number;
  billable_type: string;
  created_at: string;
  currency: string;
  description: string;
  id: number;
  order_id: number;
  payable_id: null;
  payable_type: null;
  status: PaymentStatusType;
  updated_at: string;
  payable: Order;
};

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

export type Pdf = {
  title: string;
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

// Shouldn't it be union of type based on EventType?
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

export type Certificate = {
  id: number;
  template: Template;
  created_at: Date;
  updated_at: Date;
  path?: null;
  content?: any;
  title?: string;
  assignable_id?: number;
};

export type CertificateParams = PaginationParams & {
  assignable_type?: CertificateAssignableTypes;
  assignable_id?: number;
};

export type MattermostData = {
  server: string;
  teams: MattermostChannels[];
};

export type MattermostChannels = {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  display_name: string;
  name: string;
  description: string;
  email: string;
  type: string;
  company_name: string;
  allowed_domains: string;
  invite_id: string;
  allow_open_invite: boolean;
  scheme_id: string | null;
  group_constrained: boolean | null;
  policy_id: string | null;
  channels: Channel[];
};

export type Channel = {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  team_id: string;
  type: string;
  display_name: string;
  name: string;
  header: string;
  purpose: string;
  last_post_at: number;
  total_msg_count: number;
  extra_update_at: number;
  creator_id: string;
  scheme_id: string | null;
  props: string | null;
  group_constrained: boolean | null;
  shared: string | null;
  total_msg_count_root: number;
  policy_id: string | null;
  last_root_post_at: number;
  url: string;
};

export type Template = {
  id: number;
  name: string;
  event: string;
  channel: string;
  created_at: Date;
  updated_at: Date;
  title: string | null;
  mail_theme: null;
  mail_markdown: null;
  is_default: boolean;
  assignable_type: null;
  assignable_id: null;
  default: boolean;
};

export type QuestionnaireStarsRated = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

export type QuestionnaireStars = {
  sum_rates: number;
  count_answers: number;
  avg_rate: number;
  rates: QuestionnaireStarsRated;
};

export type QuestionnaireStarsModel = {
  sum_rates: number;
  count_answers: number;
  avg_rate: number;
};

export type InvoiceData = {
  client_email: string;
  client_name?: string;
  client_street?: string;
  client_street_number?: string;
  client_postal?: string;
  client_city?: string;
  client_country?: string;
  client_company?: string;
  client_taxid?: string;
};

export type TasksList = DefaultMetaResponse<Task>;

export type TaskRelatedType =
  | "EscolaLMS\\Courses\\Course"
  | "EscolaLMS\\Courses\\Topic"
  | "EscolaLMS\\Courses\\Lesson";

export type TaskNote = EscolaLms.Tasks.Models.TaskNote & {
  note: string;
};

type AbstractTask = EscolaLms.Tasks.Models.Task & {
  title: string;
  due_date?: string;
  notes?: TaskNote[];
};

export type Task =
  | AbstractTask
  | (AbstractTask & {
      related_type: TaskRelatedType;
      related_id: number;
    });

export type TaskParams = PageParams &
  PaginationParams & {
    title?: string;
    type?: string;
    user_id?: number;
    created_by_id?: number;
    related_type?: TaskRelatedType;
    related_id?: number;
    due_date_from?: Date | string;
    due_date_to?: Date | string;
  };

export type Metadata = Omit<EscolaLms.ModelFields.Models.Metadata, "rules"> & {
  rules: string | string[] | null;
};

export type BookmarkNoteList = DefaultMetaResponse<BookmarkNote>;

export type BookmarkNoteBase = {
  id: number;
  value: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  bookmarkable_id: number;
  user_id: number;
  user: Nullable<User>;
};

export type BookmarkCourse = BookmarkNoteBase & {
  bookmarkable_type: BookmarkableType.Course;
  // TODO: after backend support this should be typed well
  bookmarkable: null;
};

export type BookmarkLesson = BookmarkNoteBase & {
  bookmarkable_type: BookmarkableType.Lesson;
  // TODO: after backend support this should be typed well
  bookmarkable: null;
};

export type BookmarkTopic = BookmarkNoteBase & {
  bookmarkable_type: BookmarkableType.Topic;
  bookmarkable: {
    id: number;
    title: string;
    type: TopicType;
    lesson_id: number;
    course_id: number;
    course_title: string;
  };
};

export type BookmarkNote = BookmarkCourse | BookmarkLesson | BookmarkTopic;

export type BookmarkNoteParams =
  EscolaLms.Bookmarks.Http.Requests.ListBookmarkRequest &
    PaginationParams & {
      order_by?: "created_at" | "id" | "value";
      order?: "ASC" | "DESC";
      has_value?: boolean | 1 | 0;
      bookmarkable_id?: number;
      bookmarkable_ids?: number[];
      bookmarkable_type?: BookmarkableType;
    };

export type CreateBookmarkNote = {
  value: Nullable<string>;
  bookmarkable_id: number;
  bookmarkable_type: BookmarkableType;
};

type QuizQuestionBase = {
  id: number;
  question: string;
  score: number;
  title: string;
  type: QuestionType;
};

export type QuizQuestion_MultipleChoice = QuizQuestionBase & {
  options: { answers: string[] };
  type: QuestionType.MULTIPLE_CHOICE;
};
export type QuizQuestion_MultipleChoiceWithMultipleRightAnswers =
  QuizQuestionBase & {
    options: { answers: string[] };
    type: QuestionType.MULTIPLE_CHOICE_WITH_MULTIPLE_RIGHT_ANSWERS;
  };
export type QuizQuestion_TrueFalse = QuizQuestionBase & {
  options: unknown[];
  type: QuestionType.TRUE_FALSE;
};
export type QuizQuestion_ShortAnswers = QuizQuestionBase & {
  options: unknown[];
  type: QuestionType.SHORT_ANSWERS;
};
export type QuizQuestion_Matching = QuizQuestionBase & {
  options: {
    sub_questions: string[];
    sub_answers: string[];
  };
  type: QuestionType.MATCHING;
};
export type QuizQuestion_NumericalQuestion = QuizQuestionBase & {
  options: unknown[];
  type: QuestionType.NUMERICAL_QUESTION;
};
export type QuizQuestion_Essay = QuizQuestionBase & {
  options: unknown[];
  type: QuestionType.ESSAY;
};
export type QuizQuestion_Description = QuizQuestionBase & {
  options: unknown[];
  type: QuestionType.DESCRIPTION;
};

export type QuizQuestion =
  | QuizQuestion_MultipleChoice
  | QuizQuestion_MultipleChoiceWithMultipleRightAnswers
  | QuizQuestion_TrueFalse
  | QuizQuestion_ShortAnswers
  | QuizQuestion_Matching
  | QuizQuestion_NumericalQuestion
  | QuizQuestion_Essay
  | QuizQuestion_Description;

export type QuizAttempt = EscolaLms.TopicTypeGift.Models.QuizAttempt & {
  max_score: number;
  questions: QuizQuestion[];
  result_score: number;
};

export type ProjectParams = PaginationParams & {
  course_id: number;
  topic_id: number;
};

export interface AddProjectBody {
  topic_id: string;
  file: File;
}

export interface ProjectFile {
  id: number;
  created_at: Date | string;
  file_url: string;
  topic_id: number;
  user_id: number;
}

export type AddProductResponse = DefaultResponse<{
  buyable: boolean;
  difference: number;
  limit: number;
  operation: "increment" | "decrement" | "unchanged";
  quantity_in_cart: number;
  quantity_owned: number;
}>;

export type QuestionnaireQuestion = {
  active: boolean;
  description: string;
  id: number;
  position: number;
  public_answers: boolean;
  questionnaire_id: number;
  title: string;
  type: string;
};

export type QuestionnaireModel = {
  id: number;
  model_id: number;
  model_title: string;
  model_type_class: string;
  model_type_id: number;
  model_type_title: string;
  target_goroup?: "user" | "author";
  display_frequency_minutes?: number;
};

export type Questionnaire = Pick<
  EscolaLms.Questionnaire.Models.Questionnaire,
  "active" | "id" | "title"
> & {
  models: QuestionnaireModel[];
  questions: QuestionnaireQuestion[];
  taget_group: "user" | "author";
  display_frequency_minutes: number;
};

export type QuestionnaireAnswerResponse = {
  id: number;
  questions: QuestionnaireQuestionWithAnswer[];
  title: string;
};

export type QuestionnaireQuestionWithAnswer = {
  id: number;
  title: string;
  description: string;
  rate: number | null;
  type: QuestionnaireType;
  note: string | null;
};

export type QuestionnaireType = "rate" | "review" | "text";

export type QuestionAnswer = {
  id: number;
  user_id: number;
  question_id: number;
  question_title: string;
  questionnaire_model_id: number;
  rate: number;
  note: string;
  updated_at: string;
  visible_on_front: boolean;
  user: Pick<API.UserItem, "avatar" | "id" | "name">;
};

export type QuestionnaireAnswersParams = {
  type: API.QuestionnaireType;
  order_by: "created_at" | "updated_at" | "rate";
  order: "ASC" | "DESC";
};

export type SemestersParams = {
  academic_year_id?: number;
};

export type AcademicYearParams = {
  active?: boolean;
};

export type SubjectsParams = PaginationParams & {
  semester_id?: number;
};

export type ScheduleParams = {
  date_from?: string;
  date_to?: string;
  group_id?: number;
  term_status_id?: number;
};

export type Subject = {
  id: number;
  name: string;
};

export type Semester = {
  id: number;
  name: string;
  type: string;
  year: string;
};

export type ExamScale = {
  s_subject_scale_form_id: number;
  scale: {
    name: string;
    grade: number;
    grade_value: number;
  }[];
};

export type ExamResults = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  result: number;
}[];

export type Exam = {
  id: number;
  semester_subject_id: number;
  title: string;
  type: string;
  weight: number;
  passed_at: string;
  created_at: string;
  group_id: number;
  grade_scale: ExamScale;
  results: ExamResults;
};

export type GroupSubjectFinalGradeGradeTerm = {
  id: number;
  name: string;
};

export type GroupSubjectFinalGrade = {
  grade_date: string;
  grade_name: string;
  grade_term: GroupSubjectFinalGradeGradeTerm;
  grade_value: number;
  id: number;
};

export type GroupSubject = {
  group_id: number;
  as_assessment_form_name: string;
  as_form_name: string;
  as_form_name_shortcut: string;
  subject: Subject;
  tutor: Tutor;
  ssubject_form_hours_numbers: number;
  final_grades: GroupSubjectFinalGrade[];
};

export type Group = {
  id: number;
  name: string;
};

export type TermStatus = {
  id: number;
  name: string;
};

export type ScheduleData = {
  id: number;
  date_from: Date | string;
  date_to: Date | string;
  tutor: Tutor;
  subject: Subject;
  semester: Semester;
  term_status: TermStatus;
  group: Group;
  ms_teams_join_url: string | null;
};

export type AttendanceItem = {
  user_id: number;
  value: AttendanceStatus | null;
};

export type Attendance = {
  attendances: AttendanceItem[];
  date_from: string;
  date_to: string;
  group_id: number;
  id: number;
  semester_id: number;
  subject_id: number;
  teacher_id: number;
  term_status_id: number;
};

export type NotificationsTokensBody = {
  token: string;
};

export type DictionariesParams = {
  word?: string;
  // Example: url?category_ids[]=1&category_ids[]=2category_ids[]=3
  "category_ids[]"?: number[];
  word_start?: string;
  abort_prev?: boolean;
};

export type DictionariesWordsParams = DictionariesParams & PaginationParams;

export type DictionariesWordsCategory = Pick<
  Category,
  "name" | "name_with_breadcrumbs" | "id"
>;

export type DictionaryWordData = {
  id?: number;
  title?: string;
  description?: string;
  video_url?: string;
};

export type DictionariesWords = {
  id: number;
  word: string;
  dictionary_id: number;
  created_at: string;
  updated_at: string;
  categories: DictionariesWordsCategory[];
  description?: string;
  data?: {
    descriptions?: DictionaryWordData[];
  };
};

export type DictionariesAccess = {
  dictionary_id: number;
  name: string;
  slug: string;
  end_date: string;
  is_active: boolean;
};
