import { API } from "..";

type Nullable<T> = T | null | undefined;

export enum TopicType {
  Unselected = "",
  RichText = "EscolaLms\\TopicTypes\\Models\\TopicContent\\RichText",
  OEmbed = "EscolaLms\\TopicTypes\\Models\\TopicContent\\OEmbed",
  Audio = "EscolaLms\\TopicTypes\\Models\\TopicContent\\Audio",
  Video = "EscolaLms\\TopicTypes\\Models\\TopicContent\\Video",
  H5P = "EscolaLms\\TopicTypes\\Models\\TopicContent\\H5P",
  Image = "EscolaLms\\TopicTypes\\Models\\TopicContent\\Image",
  Pdf = "EscolaLms\\TopicTypes\\Models\\TopicContent\\PDF",
  Scorm = "EscolaLms\\TopicTypes\\Models\\TopicContent\\ScormSco",
  Project = "EscolaLms\\TopicTypeProject\\Models\\Project",
  GiftQuiz = "EscolaLms\\TopicTypeGift\\Models\\GiftQuiz",
}

export enum BookmarkableType {
  Course = "EscolaLms\\Courses\\Models\\Course",
  Lesson = "EscolaLms\\Courses\\Models\\Lesson",
  Topic = "EscolaLms\\Courses\\Models\\Topic",
}

export enum PaymentStatusType {
  NEW = "new",
  PAID = "paid",
  CANCELLED = "cancelled",
}

export type IEvent =
  | "http://adlnet.gov/expapi/verbs/experienced"
  | "http://adlnet.gov/expapi/verbs/attended"
  | "http://adlnet.gov/expapi/verbs/attempted"
  | "http://adlnet.gov/expapi/verbs/completed"
  | "http://adlnet.gov/expapi/verbs/passed"
  | "http://adlnet.gov/expapi/verbs/failed"
  | "http://adlnet.gov/expapi/verbs/answered"
  | "http://adlnet.gov/expapi/verbs/interacted"
  | "http://adlnet.gov/expapi/verbs/imported"
  | "http://adlnet.gov/expapi/verbs/created"
  | "http://adlnet.gov/expapi/verbs/shared"
  | "http://adlnet.gov/expapi/verbs/voided"
  | "http://activitystrea.ms/schema/1.0/consume"
  | "http://adlnet.gov/expapi/verbs/mastered";

export type IStatementCategory = {
  id: string;
  objectType: "string";
};

export type IScore = {
  min: number;
  raw: number;
  max: number;
  scaled: number;
};

export type IResult = {
  completion: boolean;
  duration: string;
  response: string;
  score: IScore;
};

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

export type Category = {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  parent_id?: number;
  icon?: string;
  icon_class: string;
  created_at: string;
  updated_at: string;
  order: number;
  pivot?: {
    course_id: number;
    category_id: number;
  };
  subcategories?: Category[];
  count?: number;
  count_free?: number;
  description?: string;
  name_with_breadcrumbs?: string;
};

export type Tag = {
  id: number;
  title: string;
  morphable_type: string;
  morphable_id: number;
  created_at: string;
  updated_at: string;
};

export type Course = {
  id: number;
  description: string | null;
  created_at: string;
  updated_at: string;
  title: string;
  topic_count?: number;
  base_price?: number;
  author_id: number;
  image_url?: string | null;
  author: UserItem;
  authors: UserItem[];
  lessons_count?: number;
  lessons?: Lesson[];
  language?: string | null;
  subtitle?: string | null;
  summary?: string | null;
  image_path?: string | null;
  video_path?: string | null;
  duration?: string | null;
  findable: boolean;
  video_url?: string | null;
  categories?: Array<EscolaLms.Categories.Models.Category> & {
    description?: string | null;
  };
  tags?: Tag[] | string[] | null;
  users_count?: number;
  level?: string | null;
  scorm_sco?: SCORM_SCO | null;
  scorm_id?: number | null;
  scorm_sco_id?: number | null;
  scorm?: SCORM | null;
  target_group?: string | null;
  active_to?: string;
  active_from?: string;
  hours_to_complete?: number | null;
  product?: Product;
  poster_url?: string;
};

export type Author = {
  first_name: string;
  last_name: string;
  id: number;
  path_avatar: string | null;
} & Record<string, string | number | boolean | null>;

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

export enum CompetencyChallengeType {
  Simple = "simple",
  Complex = "complex",
}

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

export type PaginatedList<Model> = {
  current_page: number;
  data: Model[];
  next_page_url: string;
  path: string;
  per_page: number | string;
  prev_page_url: string;
  to: number;
  total: number;
  last_page: number;
};

export type PaginatedMetaList<Model> = {
  data: Model[];
  meta: {
    current_page: number;
    next_page_url: string;
    last_page: number;
    path: string;
    per_page: number | string;
    prev_page_url: string | null;
    to: number;
    total: number;
    links:
      | {
          first: string;
          last: string;
          next: string;
          prev: string;
        }
      | { url: string | null; label: string; active: boolean }[];
  };
};

export type PaginatedListParams = {
  current_page: number;
  total?: number;
  per_page: number;
};

export type DefaultResponseSuccess<Model> = {
  success: true;
  data: Model;
  message: string;
};

export type DataResponseSuccess<Model> = {
  data: Model;
};

export type DefaultResponseError = {
  success: false;
  message: string;
  error: string;
  errors: {
    [key: string]: string[]; // list of errors
  };
};

export type DefaultResponse<Model> =
  | DefaultResponseSuccess<Model>
  | DefaultResponseError;

export type DataResponse<Model> =
  | DataResponseSuccess<Model>
  | DefaultResponseError;

export type DefaultMetaResponse<Model> =
  | (PaginatedMetaList<Model> & {
      message: string;
      success: true;
    })
  | DefaultResponseError;

export type RawResponse<Model> = Model | DefaultResponseError;

export type SuccessResponse = { success: true } | DefaultResponseError;

export type CourseList = DefaultMetaResponse<Course>;

export type ChallengesList = DefaultMetaResponse<CompetencyChallenge>;

export type CertificateList = DefaultMetaResponse<Certificate>;

export type MattermostChannelList = DefaultResponseSuccess<MattermostData>;

export type P24Response =
  DefaultResponseSuccess<EscolaLms.Payments.Models.Payment>;

export type TutorList = DefaultResponse<UserItem[]>;

export type OrderList = DefaultMetaResponse<Order>;

export type TutorSingle = DefaultResponse<UserItem>;

export type CourseListItem = Course;

export type CategoryList = DataResponseSuccess<Category[]>;

export type CategoryListItem = Category;

export type UserList = PaginatedMetaList<UserItem>;

export type UserListItem = UserItem;

export type OrderListItem = Order;

export type PaymentList = DefaultMetaResponse<Payment>;

export type PaymentListItem = Payment;

export type PageList = DefaultMetaResponse<Page>;

export type PageListItem = Page;

export type ConsultationsList = DefaultMetaResponse<Consultation>;

export type SubjectsList = DefaultMetaResponse<GroupSubject>;

export type ExamsList = DefaultMetaResponse<Exam>;

export type LessonTutors = DefaultResponse<LessonTutor[]>;

export type Schedule = DefaultResponse<ScheduleData[]>;

export type WebinarsList = DefaultMetaResponse<Webinar>;

export type ProductList = DefaultMetaResponse<Product>;

export type StationaryEventsList = DefaultMetaResponse<StationaryEvent>;

export type EventsList = DefaultMetaResponse<Event>;

export type TutorConsultationList = DefaultMetaResponse<AppointmentTerm>;

export type UserGroups = UserGroup[];

export type UserGroupRow = DefaultResponse<UserGroup>;

export type UserGroupAddRow = DefaultResponse<UserItem[]>;

export type UserGroupList = DefaultMetaResponse<UserGroup>;

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
};

export type Product = Omit<EscolaLms.Cart.Models.Product, "productables"> & {
  available_quantity: number;
  created_at?: string | null;
  updated_at?: string | null;
  buyable?: boolean;
  poster_path?: string | null;
  owned?: boolean;
  owned_quantity: number;
  related_products?: Product[];
  sold_quantity: number;
  gross_price: number;
  productables?: Array<ProductItems> | null;
  authors?: User[] | null;
  end_date?: string;
  poster_url?: string;
  is_active?: boolean;
  id?: string;
  tags?: string[];
  name?: string;
  subscription_period?: string;
  subscription_duration?: number;
};

export type ProductItems = EscolaLms.Cart.Models.ProductProductable & {
  name?: string;
  description?: string;
};

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

export type CartProductParameters = {
  description: string;
  id: number;
  morph_class: string;
  name: string;
  productable_id: number;
  productable_type: string;
};

export type CartItem = EscolaLms.Cart.Models.CartItem & {
  product?: Product & {
    productables: CartProductParameters[];
  };
  product_id?: number;
  total_with_tax?: number;
};

export type PaginationParams = {
  order_by?: string;
  order?: "ASC" | "DESC";
  page?: number;
  per_page?: number;
};

export type PageParams = {
  current?: number;
  pageSize?: number;
};

export type ExamsParams = PaginationParams & {
  group_id?: number;
};

export type CourseParams = PageParams &
  PaginationParams & {
    "categories[]"?: number[];
    title?: string;
    category_id?: number;
    author_id?: number;
    tag?: string;
    free?: boolean;
    only_with_categories?: boolean;
    no_expired?: 0 | 1;
  };

export type PaginatedProgressParams = CourseParams & {
  status?: string;
};

export type ChallengesParams = PaginationParams & {
  order_by?: "id" | "name" | "created_at";
  type?: "simple" | "complex";
  order?: "ASC" | "DESC";
  name?: string;
};

export type ConsultationParams = PageParams &
  PaginationParams & {
    name?: string;
    status?: string;
    base_price?: number;
    only_with_categories?: boolean;
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

export type ScheduleConsultationResponse =
  | {
      success: true;
      message: string;
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

export type User = EscolaLms.Auth.Models.User & {
  url_avatar: string | null;
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

export type UpdateUserEmail = {
  email?: string;
};

export interface CompleteSocialAuth {
  email: string;
  return_url: string;
}

export type Lesson = Omit<
  EscolaLms.Courses.Models.Lesson,
  "topics" | "lessons"
> & {
  id: number;
  created_at: string;
  title: string;
  course_id: number;
  updated_at?: string;
  order: number;
  lessons?: Lesson[];
  duration: string;
  summary?: string;
  topics?: Topic[];
  isNew?: boolean;
  active_from?: string;
  active_to?: string;
};

export type TopicBase = {
  id: number;
  lesson_id: number;
  duration?: string;
  title: string;
  topicable_id: number;
  created_at: string;
  updated_at?: string;
  order: number;
  value?: any;
  isNew?: boolean;
  preview?: boolean;
  introduction?: string;
  description?: string;
  summary?: string;
  resources?: TopicResource[];
  can_skip?: boolean;
  json?: Record<string, unknown>;
  /*
      topicable_type?:
        | TopicType.RichText
        | TopicType.OEmbed
        | TopicType.Audio
        | TopicType.H5P
        | TopicType.Unselected
        | TopicType.Video;
        */
};

export type TopicableBase = {
  created_at?: string;
  updated_at?: string;
  id: number;
  value: string;
};

export type TopicResource = {
  id: number;
  name: string;
  path: string;
  topic_id: number;
  url: string;
};

export type TopicRichText = TopicBase & {
  topicable_type: TopicType.RichText;
  topicable: TopicableBase;
};

export type TopicOEmbed = TopicBase & {
  topicable_type: TopicType.OEmbed;
  topicable: TopicableBase;
};

export type TopicAudio = TopicBase & {
  topicable_type: TopicType.Audio;
  topicable: TopicableBase & {
    length: number;
    url: string;
  };
};

export type TopicVideo = TopicBase & {
  topicable_type: TopicType.Video;
  topicable: TopicableBase & {
    height: number;
    poster: string;
    poster_url: string;
    url: string;
    width: number;
  };
};

export type TopicImage = TopicBase & {
  topicable_type: TopicType.Image;
  topicable: TopicableBase & {
    height: number;
    url: string;
    width: number;
  };
};

export type TopicH5P = TopicBase & {
  topicable_type: TopicType.H5P;
  topicable: TopicableBase & {
    content: H5PContent;
  };
};

export type TopicPdf = TopicBase & {
  topicable_type: TopicType.Pdf;
  topicable: TopicableBase & {
    url: string;
  };
};

export type TopicScorm = TopicBase & {
  topicable_type: TopicType.Scorm;
  topicable: TopicableBase & {
    uuid: string;
  };
};

export type TopicProject = TopicBase & {
  topicable_type: TopicType.Project;
  topicable: TopicableBase;
};

export type TopicQuiz = TopicBase & {
  topicable_type: TopicType.GiftQuiz;
  topicable: TopicableBase & {
    max_attempts?: number | null;
    max_execution_time?: number | null;
  };
};

export type TopicUnselected = TopicBase & {
  topicable_type?: TopicType.Unselected;
  topicable?: never;
};

export type Topic =
  | TopicUnselected
  | TopicRichText
  | TopicOEmbed
  | TopicAudio
  | TopicVideo
  | TopicH5P
  | TopicImage
  | TopicPdf
  | TopicScorm
  | TopicProject
  | TopicQuiz;

export type TopicNotEmpty =
  | TopicRichText
  | TopicOEmbed
  | TopicAudio
  | TopicVideo
  | TopicH5P
  | TopicImage
  | TopicPdf
  | TopicScorm
  | TopicProject
  | TopicQuiz;

export type CourseProgram = Course & {
  lessons: Lesson[];
};

export type H5PLibrary = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  title: string;
  runnable: number;
  restricted: number;
  fullscreen: number;
  embed_types: string;
  semantics: object;
  machineName: string;
  uberName: string;
  majorVersion: string;
  minorVersion: string;
  patchVersion: string;
  preloadedJs: string;
  preloadedCss: string;
  dropLibraryCss: string;
  tutorialUrl: string;
  hasIcon: string;
  libraryId: number;
};

export type H5PContent = {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  user_id: string | number;
  title: string;
  library_id: string;
  parameters: string;
  filtered: string;
  slug: string;
  embed_type: string;
  params: object;
  metadata: object;
  library: H5PLibrary;
  nonce: string;
};

export type H5PContentList = PaginatedList<H5PContent>;

export type H5PContentListItem = H5PContent;

export type H5PContentParams = PageParams & PaginationParams;

export type Page = {
  id: number;
  slug: string;
  title: string;
  author_id: number;
  author: UserItem;
  content: string;
};

export type Json = string | number | Json[] | { [key: string]: Json };
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

export type SCORM = {
  id: number;
  resource_type: null;
  resource_id: number;
  version: "scorm_12" | "scorm_2004";
  hash_name: string;
  origin_file: string;
  origin_file_mime: string;
  ratio: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  scos: SCORM_SCO[];
};

export type SCORM_SCO = {
  id: number;
  scorm_id: number;
  uuid: string;
  sco_parent_id: number;
  entry_url: string;
  identifier: string;
  title: string;
  visible?: 1 | 0;
  sco_parameters: any;
  launch_data?: any;
  max_time_allowed?: number;
  time_limit_action?: number;
  block?: number;
  score_int?: number;
  score_decimal?: number;
  completion_threshold?: number;
  prerequisites?: any;
  created_at?: string;
  updated_at?: string;
};

export type Cart = {
  items: CartItem[];
  total?: string | number;
  subtotal?: string | number;
  tax?: string | number;
  total_with_tax?: number;
  coupon?: string | null;
};

export type CourseProgressItemElement = {
  topic_id: number;
  status: CourseProgressItemElementStatus;
  started_at?: string;
  finished_at?: string;
  seconds?: number;
};

export enum CourseProgressItemElementStatus {
  INCOMPLETE = 0,
  COMPLETE = 1,
  IN_PROGRESS = 2,
}

export type CourseProgressItem = {
  categories: CategoryListItem[];
  course: Course;
  start_date?: Date;
  finish_date?: Date;
  deadline?: Date | null;
  total_spent_time?: number;
  progress: CourseProgressItemElement[];
  tags: Tag[];
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

export type CourseProgress = CourseProgressItem[];
export type CourseProgressDetails = CourseProgressItemElement[];

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

export type UserGroup = {
  id: number;
  name: string;
  users: UserItem[];
  name_with_breadcrumbs?: string;
  parent_id?: null | number;
  registerable?: boolean;
};

export type UserGroupsParams = {
  current?: number;
  pageSize?: number;
  search?: string;
};

export enum EventTypes {
  UserLogged = 'EscolaLms\\Auth\\Events\\UserLogged',
  StationaryEventAssigned = 'EscolaLms\\StationaryEvents\\Events\\StationaryEventAssigned',
  StationaryEventUnassigned = 'EscolaLms\\StationaryEvents\\Events\\StationaryEventUnassigned',
  StationaryEventAuthorAssigned = 'EscolaLms\\StationaryEvents\\Events\\StationaryEventAuthorAssigned',
  StationaryEventAuthorUnassigned = 'EscolaLms\\StationaryEvents\\Events\\StationaryEventAuthorUnassigned',
  AbandonedCartEvent = 'EscolaLms\\Cart\\Events\\AbandonedCartEvent',
  OrderCancelled = 'EscolaLms\\Cart\\Events\\OrderCancelled',
  OrderCreated = 'EscolaLms\\Cart\\Events\\OrderCreated',
  OrderPaid = 'EscolaLms\\Cart\\Events\\OrderPaid',
  ProductableAttached = 'EscolaLms\\Cart\\Events\\ProductableAttached',
  ProductableDetached = 'EscolaLms\\Cart\\Events\\ProductableDetached',
  ProductAddedToCart = 'EscolaLms\\Cart\\Events\\ProductAddedToCart',
  ProductAttached = 'EscolaLms\\Cart\\Events\\ProductAttached',
  ProductBought = 'EscolaLms\\Cart\\Events\\ProductBought',
  ProductDetached = 'EscolaLms\\Cart\\Events\\ProductDetached',
  ProductRemovedFromCart = 'EscolaLms\\Cart\\Events\\ProductRemovedFromCart',
  PaymentCancelled = 'EscolaLms\\Payments\\Events\\PaymentCancelled',
  PaymentFailed = 'EscolaLms\\Payments\\Events\\PaymentFailed',
  PaymentRegistered = 'EscolaLms\\Payments\\Events\\PaymentRegistered',
  PaymentSuccess = 'EscolaLms\\Payments\\Events\\PaymentSuccess',
  CourseAccessFinished = 'EscolaLms\\Courses\\Events\\CourseAccessFinished',
  CourseAccessStarted = 'EscolaLms\\Courses\\Events\\CourseAccessStarted',
  CourseAssigned = 'EscolaLms\\Courses\\Events\\CourseAssigned',
  CourseDeadlineSoon = 'EscolaLms\\Courses\\Events\\CourseDeadlineSoon',
  CoursedPublished = 'EscolaLms\\Courses\\Events\\CoursedPublished',
  CourseFinished = 'EscolaLms\\Courses\\Events\\CourseFinished',
  CourseStarted = 'EscolaLms\\Courses\\Events\\CourseStarted',
  CourseStatusChanged = 'EscolaLms\\Courses\\Events\\CourseStatusChanged',
  CourseTutorAssigned = 'EscolaLms\\Courses\\Events\\CourseTutorAssigned',
  CourseTutorUnassigned = 'EscolaLms\\Courses\\Events\\CourseTutorUnassigned',
  CourseUnassigned = 'EscolaLms\\Courses\\Events\\CourseUnassigned',
  TopicFinished = 'EscolaLms\\Courses\\Events\\TopicFinished',
  TopicTypeChanged = 'EscolaLms\\TopicTypes\\Events\\TopicTypeChanged',
  ApprovedTerm = 'EscolaLms\\Consultations\\Events\\ApprovedTerm',
  ApprovedTermWithTrainer = 'EscolaLms\\Consultations\\Events\\ApprovedTermWithTrainer',
  ChangeTerm = 'EscolaLms\\Consultations\\Events\\ChangeTerm',
  RejectTerm = 'EscolaLms\\Consultations\\Events\\RejectTerm',
  RejectTermWithTrainer = 'EscolaLms\\Consultations\\Events\\RejectTermWithTrainer',
  ReminderAboutTerm = 'EscolaLms\\Consultations\\Events\\ReminderAboutTerm',
  ReminderTrainerAboutTerm = 'EscolaLms\\Consultations\\Events\\ReminderTrainerAboutTerm',
  ReportTerm = 'EscolaLms\\Consultations\\Events\\ReportTerm',
  WebinarReminderAboutTerm = 'EscolaLms\\Webinar\\Events\\ReminderAboutTerm',
  WebinarTrainerAssigned = 'EscolaLms\\Webinar\\Events\\WebinarTrainerAssigned',
  WebinarTrainerUnassigned = 'EscolaLms\\Webinar\\Events\\WebinarTrainerUnassigned',
  ProcessVideoFailed = 'ProcessVideoFailed',
  ProcessVideoStarted = 'ProcessVideoStarted',
  ImportedNewUserTemplateEvent = 'EscolaLms\\CsvUsers\\Events\\EscolaLmsImportedNewUserTemplateEvent',
  AssignToProduct = 'AssignToProduct', // ASSIGN WITHOUT ACCONT
  AssignToProductable = 'AssignToProductable', // ASSIGN WITHOUT ACCONT
  FileDeleted = 'FileDeleted',
  FileStored = 'FileStored',
  SettingPackageConfigUpdated = 'EscolaLms\\Settings\\Events\\SettingPackageConfigUpdated',
  AccountBlocked = 'EscolaLms\\Auth\\Events\\AccountBlocked',
  AccountConfirmed = 'EscolaLms\\Auth\\Events\\AccountConfirmed',
  AccountDeleted = 'EscolaLms\\Auth\\Events\\AccountDeleted',
  AccountMustBeEnableByAdmin = 'EscolaLms\\Auth\\Events\\AccountMustBeEnableByAdmin',
  AccountRegistered = 'EscolaLms\\Auth\\Events\\AccountRegistered',
  ForgotPassword = 'EscolaLms\\Auth\\Events\\ForgotPassword',
  Login = 'EscolaLms\\Auth\\Events\\Login',
  Logout = 'EscolaLms\\Auth\\Events\\Logout',
  PasswordChanged = 'EscolaLms\\Auth\\Events\\PasswordChanged',
  ResetPassword = 'EscolaLms\\Auth\\Events\\ResetPassword',
  UserAddedToGroup = 'EscolaLms\\Auth\\Events\\UserAddedToGroup',
  UserRemovedFromGroup = 'EscolaLms\\Auth\\Events\\UserRemovedFromGroup',
  BulkNotification = 'EscolaLms\\BulkNotifications\\Events\\NotificationSent',
  PushNotification = 'EscolaLms\\BulkNotifications\\Channels\\PushNotificationChannel',
  // new and missed event types
  WebinarUserAssigned = 'EscolaLms\\Webinar\\Events\\WebinarUserAssigned',
  EscolaLmsCartOrderSuccessTemplateEvent = 'EscolaLms\\Cart\\Events\\EscolaLmsCartOrderSuccessTemplateEvent',
  EscolaLmsLoginTemplateEvent = 'EscolaLms\\Auth\\Events\\EscolaLmsLoginTemplateEvent',
  EscolaLmsAccountBlockedTemplateEvent = 'EscolaLms\\Auth\\Events\\EscolaLmsAccountBlockedTemplateEvent',
  EscolaLmsCourseFinishedTemplateEvent = 'EscolaLms\\Courses\\Events\\EscolaLmsCourseFinishedTemplateEvent',
  EscolaLmsImportedNewUserTemplateEvent = 'EscolaLms\\CsvUsers\\Events\\EscolaLmsImportedNewUserTemplateEvent',
  TaskUpdatedEvent = 'EscolaLms\\Tasks\\Events\\TaskUpdatedEvent',
  CartOrderPaid = 'EscolaLms\\Cart\\Events\\CartOrderPaid',
  EscolaLmsUserRemovedFromGroupTemplateEvent = 'EscolaLms\\Auth\\Events\\EscolaLmsUserRemovedFromGroupTemplateEvent',
  EscolaLmsUserAddedToGroupTemplateEvent = 'EscolaLms\\Auth\\Events\\EscolaLmsUserAddedToGroupTemplateEvent',
  ProjectSolutionCreatedEvent = 'EscolaLms\\TopicTypeProject\\Events\\ProjectSolutionCreatedEvent',
  QuizAttemptFinishedEvent = 'EscolaLms\\TopicTypeGift\\Events\\QuizAttemptFinishedEvent',
  EscolaLmsTopicTypeChangedTemplateEvent = 'EscolaLms\\TopicTypes\\Events\\EscolaLmsTopicTypeChangedTemplateEvent',
  EscolaLmsCourseUnassignedTemplateEvent = 'EscolaLms\\Courses\\Events\\EscolaLmsCourseUnassignedTemplateEvent',
  EscolaLmsAccountDeletedTemplateEvent = 'EscolaLms\\Auth\\Events\\EscolaLmsAccountDeletedTemplateEvent',
  TaskOverdueEvent = 'EscolaLms\\Tasks\\Events\\TaskOverdueEvent',
  TaskNoteCreatedEvent = 'EscolaLms\\Tasks\\Events\\TaskNoteCreatedEvent',
  TaskAssignedEvent = 'EscolaLms\\Tasks\\Events\\TaskAssignedEvent',
  EscolaLmsCoursedPublishedTemplateEvent = 'EscolaLms\\Courses\\Events\\EscolaLmsCoursedPublishedTemplateEvent',
  EscolaLmsResetPasswordTemplateEvent = 'EscolaLms\\Auth\\Events\\EscolaLmsResetPasswordTemplateEvent',
  EscolaLmsForgotPasswordTemplateEvent = 'EscolaLms\\Auth\\Events\\EscolaLmsForgotPasswordTemplateEvent',
  EscolaLmsCourseAssignedTemplateEvent = 'EscolaLms\\Courses\\Events\\EscolaLmsCourseAssignedTemplateEvent',
  EscolaLmsPaymentRegisteredTemplateEvent = 'EscolaLms\\Payments\\Events\\EscolaLmsPaymentRegisteredTemplateEvent',
  EscolaLmsPermissionRoleChangedTemplateEvent = 'EscolaLms\\Permissions\\Events\\EscolaLmsPermissionRoleChangedTemplateEvent',
  EscolaLmsPermissionRoleRemovedTemplateEvent = 'EscolaLms\\Permissions\\Events\\EscolaLmsPermissionRoleRemovedTemplateEvent',
  EscolaLmsAccountConfirmedTemplateEvent = 'EscolaLms\\Auth\\Events\\EscolaLmsAccountConfirmedTemplateEvent',
  EscolaLmsCartOrderPaidTemplateEvent = 'EscolaLms\\Cart\\Events\\EscolaLmsCartOrderPaidTemplateEvent',
  PdfCreated = 'EscolaLms\\TemplatesPdf\\Events\\PdfCreated',
}

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

export enum CertificateAssignableTypes {
  Course = "EscolaLms\\Courses\\Models\\Course",
}

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

type Dict = {
  [key: string]: string | Dict;
};

export type H5PObject = {
  baseUrl: string;
  url: string;
  postUserStatistics: boolean;
  ajax: { setFinished: string; contentUserData: string };
  saveFreq: boolean;
  siteUrl: string;
  l10n: Dict;
  hubIsEnabled: boolean;
  loadedJs: string[];
  loadedCss: string[];
  core: {
    styles: string[];
    scripts: string[];
  };
  editor?: {
    filesPath: string;
    fileIcon: { path: string; width: number; height: number };
    ajaxPath: string;
    libraryUrl: string;
    copyrightSemantics: Dict;
    metadataSemantics: Dict[];

    assets: {
      css: string[];
      js: string[];
    };
    deleteMessage: string;
    apiVersion: { majorVersion: number; minorVersion: number };
  };
  nonce: string;
  contents?: Record<
    string,
    {
      library: string;
      jsonContent: string;
      fullScreen: boolean;
      title: string;
      content: {
        id: number;
        library: {
          id: number;
          embedTypes: string;
          name: string;
        };
      };
      contentUserData: [
        {
          state: object;
        }
      ];
    }
  >;
};

export type JitsyConfig = {
  domain: string;
  roomName: string;
  configOverwrite: Record<string, string>[];
  interfaceConfigOverwrite: Record<string, string>;
  userInfo: {
    displayName: string;
    email: string;
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

export type AppointmentTerm = {
  consultation_term_id: number;
  date: string;
  duration: string;
  // TODO: enum status
  status: string;
  user: UserItem & Record<string, string>;
  is_started?: boolean;
  is_ended?: boolean;
  in_coming?: boolean;
  related_product?: API.Product;
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

export type CourseAccessEnquiryList = DefaultMetaResponse<CourseAccessEnquiry>;

export type CourseAccessEnquiry =
  EscolaLms.CourseAccess.Models.CourseAccessEnquiry & {
    data?: object;
  };

export type CourseAccessEnquiryStatus = "pending" | "approved";

export type CourseAccessEnquiryListParams =
  EscolaLms.CourseAccess.Http.Requests.ListCourseAccessEnquiryRequest &
    PaginatedListParams & {
      course_id?: number;
      status?: CourseAccessEnquiryStatus;
    };

export type CourseAccessEnquiryCreateRequest =
  EscolaLms.CourseAccess.Http.Requests.CreateCourseAccessEnquiryApiRequest & {
    data?: object;
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

export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  MULTIPLE_CHOICE_WITH_MULTIPLE_RIGHT_ANSWERS = "multiple_choice_with_multiple_right_answers",
  TRUE_FALSE = "true_false",
  SHORT_ANSWERS = "short_answers",
  MATCHING = "matching",
  NUMERICAL_QUESTION = "numerical_question",
  ESSAY = "essay",
  DESCRIPTION = "description",
}

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
};

export type Questionnaire = Pick<
  EscolaLms.Questionnaire.Models.Questionnaire,
  "active" | "id" | "title"
> & {
  models: QuestionnaireModel[];
  questions: QuestionnaireQuestion[];
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

export type Tutor = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
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

export type LessonTutor = {
  subjects: Subject[];
  tutor: Tutor & {
    degree_name: string;
    department: string;
    organization_unit: string;
    path_avatar?: string;
  };
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

export enum AttendanceStatus {
  PRESENT = "present",
  PRESENT_NOT_EXERCISING = "present_not_exercising",
  ABSENT = "absent",
  EXCUSED_ABSENCE = "excused_absence",
}

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
