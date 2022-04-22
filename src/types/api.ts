import { API } from "..";

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

export type IEventException = "GuessTheAnswer" | "Questionnaire" | "QuestionSet";

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
  pivot?: {
    course_id: number;
    category_id: number;
  };
  subcategories?: Category[];
  count?: number;
  count_free?: number;
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
  description: string;
  created_at: string;
  updated_at: string;
  title: string;
  topic_count: number;
  base_price: number;
  author_id: number;
  image_url: string;
  author: UserItem;
  authors: UserItem[];
  lessons_count: number;
  lessons: Lesson[];
  language?: string;
  subtitle?: string;
  summary?: string;
  image_path: string;
  video_path?: string;
  duration?: string;
  video_url?: string;
  categories?: Array<EscolaLms.Categories.Models.Category>;
  tags?: Tag[] | string[];
  users_count?: number;
  level?: string;
  scorm_sco?: SCORM_SCO;
  scorm_id?: number;
  scorm_sco_id?: number;
  scorm?: SCORM;
  target_group?: string;
  active_to?: string;
  active_from?: string;
  hours_to_complete?: number;
  product?: Product;
};

export type PaginatedList<Model> = {
  current_page: number;
  data: Model[];
  next_page_url: string;
  path: string;
  per_page: number;
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
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    links: {
      first: string;
      last: string;
      next: string;
      prev: string;
    };
  };
};

export type PaginatedListParams = {
  current_page: number;
  total: number;
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

export type DefaultResponse<Model> = DefaultResponseSuccess<Model> | DefaultResponseError;

export type DataResponse<Model> = DataResponseSuccess<Model> | DefaultResponseError;

export type DefaultMetaResponse<Model> =
  | (PaginatedMetaList<Model> & {
      message: string;
      success: true;
    })
  | DefaultResponseError;

export type RawResponse<Model> = Model | DefaultResponseError;

export type SuccessResponse = { success: true } | DefaultResponseError;

export type CourseList = DefaultMetaResponse<Course>;

export type CertificateList = DefaultMetaResponse<Certificate>;

export type MattermostChannelList = DefaultResponseSuccess<MattermostData>;

export type P24Response = DefaultResponseSuccess<EscolaLms.Payments.Models.Payment>;

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

export type Consultation = EscolaLms.Consultations.Models.Consultation & {
  product?: Product;
  executed_status?: null | "reported" | "not_reported" | "reject" | "approved";
  executed_at?: string;
  consultation_term_id?: number;
  is_ended?: boolean;
  is_started?: boolean;
  in_coming?: boolean;
  author: User & { categories: Category[] };
};

export type Product = EscolaLms.Cart.Models.Product & {
  buyable?: boolean;
  poster_path?: string | null;
};
export type Webinar = EscolaLms.Webinar.Models.Webinar & {
  product?: Product;
  program?: string;
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

export type ConsultationsList = DefaultMetaResponse<Consultation>;

export type WebinarsList = DefaultMetaResponse<Webinar>;

export type ProductList = DefaultMetaResponse<Product>;

export type StationaryEventsList = DefaultMetaResponse<StationaryEvent>;

export type EventsList = DefaultMetaResponse<Event>;

export type TutorConsultationList = DefaultMetaResponse<AppointmentTerm>;

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

export type CourseParams = PageParams &
  PaginationParams & {
    title?: string;
    category_id?: number;
    author_id?: number;
    tag?: string;
    free?: boolean;
    only_with_categories?: boolean;
  };

export type ConsultationParams = PageParams &
  PaginationParams & {
    name?: string;
    status?: string;
    base_price?: number;
    only_with_categories?: boolean;
  };

export type WebinarParams = PageParams & PaginationParams & { name?: string; product?: Product };

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

export type LoginRequest = {
  email: string;
  password: string;
};

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
};

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

export type User = {
  data: UserItem;
};

export type UserItem = EscolaLms.Auth.Models.User & {
  // id: number;
  // name: string;
  // first_name: string;
  // last_name: string;
  // email: string;
  // is_active: boolean;
  // created_at: string;
  // onboarding_completed: boolean;
  // email_verified: boolean;
  // interests: string[];
  avatar?: string;
  // path_avatar: string | null;
  bio?: string | null;
  // roles?: string[];
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
};

export type Lesson = {
  id: number;
  created_at: string;
  title: string;
  course_id: number;
  updated_at?: string;
  order?: number;
  duration: string;
  summary?: string;
  topics?: Topic[];
  isNew?: boolean;
};

export type TopicBase = {
  id: number;
  lesson_id: number;
  title: string;
  topicable_id: number;
  created_at: string;
  updated_at?: string;
  order?: number;
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
  topicable: TopicableBase;
};

export type TopicPdf = TopicBase & {
  topicable_type: TopicType.Pdf;
  topicable: TopicableBase & {
    url: string;
  };
};

type TopicScorm = TopicBase & {
  topicable_type: TopicType.Scorm;
  topicable: TopicableBase & {
    uuid: string;
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
  | TopicScorm;

export type TopicNotEmpty =
  | TopicRichText
  | TopicOEmbed
  | TopicAudio
  | TopicVideo
  | TopicH5P
  | TopicImage
  | TopicPdf
  | TopicScorm;

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

export type StationaryEvent = EscolaLms.StationaryEvents.Models.StationaryEvent & {
  date?: string;
  title?: string;
  isScheduled?: boolean;
  appointmentDate?: string;
  product?: Product | null;
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
  image_url: string | null;
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
  items: EscolaLms.Cart.Models.CartItem[];
  total?: string | number;
  subtotal?: string | number;
  tax?: string | number;
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
  finish_date?: Date;
  progress: CourseProgressItemElement[];
  total_spent_time?: number;
};

export type Order = {
  id: number;
  status: PaymentStatusType;
  items?: EscolaLms.Cart.Models.CartItem[] | null;
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
};

export type UserGroup = {
  id: number;
  name: string;
  users: UserItem[];
  name_with_breadcrumbs?: string;
  parent_id?: null | number;
  registerable?: boolean;
};

export type UserGroups = UserGroup[];

export type UserGroupRow = DefaultResponse<UserGroup>;

export type UserGroupAddRow = DefaultResponse<UserItem[]>;

export type UserGroupList = DefaultMetaResponse<UserGroup>;

export type UserGroupsParams = {
  current?: number;
  pageSize?: number;
  search?: string;
};

export enum EventTypes {
  OrderPaid = "EscolaLms\\Cart\\Events\\OrderPaid",
  UserLogged = "EscolaLms\\Auth\\Events\\UserLogged",
}

export type Notification = {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: [];
  read_at: null | Date;
  created_at: Date;
  updated_at: Date;
  event: EventTypes;
};

// TODO:update fields with nulls

export type Certificate = {
  id: number;
  template: Template;
  created_at: Date;
  updated_at: Date;
  path?: null;
  content?: any;
  title?: string;
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
        },
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
};
