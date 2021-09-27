export enum TopicType {
  Unselected = "",
  RichText = "EscolaLms\\Courses\\Models\\TopicContent\\RichText",
  OEmbed = "EscolaLms\\Courses\\Models\\TopicContent\\OEmbed",
  Audio = "EscolaLms\\Courses\\Models\\TopicContent\\Audio",
  Video = "EscolaLms\\Courses\\Models\\TopicContent\\Video",
  H5P = "EscolaLms\\Courses\\Models\\TopicContent\\H5P",
  Image = "EscolaLms\\Courses\\Models\\TopicContent\\Image",
  Pdf = "EscolaLms\\Courses\\Models\\TopicContent\\PDF",
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
  | "http://activitystrea.ms/schema/1.0/consume";

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
  pivot?: {
    course_id: number;
    category_id: number;
  };
  subcategories?: Category[];
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
  language?: string;
  subtitle?: string;
  description?: string;
  id?: number;
  created_at?: string;
  updated_at?: string;
  title?: string;
  summary?: string;
  image_path?: string;
  video_path?: string;
  base_price?: number;
  duration?: string;
  author_id?: number;
  image_url?: string;
  video_url?: string;
  categories?: Category[] | (number | string)[];
  tags?: Tag[] | string[];
  author?: UserItem;
  lessons_count?: number;
  lessons?: Lesson[];
  users_count?: number;
  topic_count?: number;
  level?: string;
  scorm_id?: number;
  scorm?: SCORM;
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
};

export type PaginatedMetaList<Model> = {
  data: Model[];
  meta: {
    current_page: number;
    next_page_url: string;
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

export type DefaultResponse<Model> =
  | DefaultResponseSuccess<Model>
  | DefaultResponseError;

export type DataResponse<Model> =
  | DataResponseSuccess<Model>
  | DefaultResponseError;

type DefaultMetaResponse<Model> =
  | (PaginatedMetaList<Model> & {
      message: string;
      success: true;
    })
  | DefaultResponseError;

export type RawResponse<Model> = Model | DefaultResponseError;

export type SuccessResponse = { success: true } | DefaultResponseError;

export type CourseList = DefaultMetaResponse<Course>;

export type TutorList = DefaultResponse<UserItem[]>;

export type OrderList = DefaultResponse<Order[]>;

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
  };

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = DefaultResponse<{ token: string }>;

export type RegisterRequest = {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
};

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

export type ForgotResponse =
  | DefaultResponse<{ todo: "// TODO " }>
  | DefaultResponseError;

export type ResetPasswordRequest = {
  token: string;
  password: string;
  email: string;
};

export type ResetPasswordResponse =
  | DefaultResponse<{ todo: "// TODO" }>
  | DefaultResponseError;

export type User = {
  data: UserItem;
};

export type UserItem = {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  onboarding_completed: boolean;
  email_verified: boolean;
  interests: string[];
  avatar: string;
  path_avatar: string | null;
  bio: string | null;
};

export type Lesson = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  title?: string;
  order?: number;
  course_id?: number;
  duration?: string;
  summary?: string;
  topics?: Topic[];
  isNew?: boolean;
};

export type TopicBase = {
  lesson_id?: number;
  created_at?: string;
  updated_at?: string;
  id?: number;
  order?: number;
  title?: string;
  value?: any;
  topicable_id?: number;
  isNew?: boolean;
  preview?: boolean;
  summary?: string;
  resources?: TopicResource[];
  can_skip?: boolean;
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
  | TopicPdf;

export type TopicNotEmpty =
  | TopicRichText
  | TopicOEmbed
  | TopicAudio
  | TopicVideo
  | TopicH5P
  | TopicImage
  | TopicPdf;

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

export type AppSettings = {
  currencies?: AppCurrency;
  consents?: {
    [key: string]: string;
  };
  faq?: {
    [key: string]: string;
  };
  homepage?: {
    [key: string]: string;
  };
  register?: {
    [key: string]: string;
  };
  env?: string;
  stripe?: {
    publishable_key: string;
  };
};

export type AppCurrency = {
  default: string;
  enum: string[];
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
  visible: 1 | 0;
  sco_parameters: any;
  launch_data: any;
  max_time_allowed: number;
  time_limit_action: number;
  block: number;
  score_int: number;
  score_decimal: number;
  completion_threshold: number;
  prerequisites: any;
  created_at: string;
  updated_at: string;
};

export type Cart = {
  total?: string | number;
  subtotal?: string | number;
  tax?: string | number;
  items: Course[];
};

export type CourseProgressItemElement = {
  topic_id: number;
  status: CourseProgressItemElementStatus;
};

export enum CourseProgressItemElementStatus {
  INCOMPLETE = 0,
  COMPLETE = 1,
  IN_PROGRESS = 2,
}

export type CourseProgressItem = {
  course: Course;
  finish_date?: Date;
  progress: CourseProgressItemElement[];
};

export type Order = {
  id: number;
  status: string; // this should be enum
  items: [
    {
      id: number;
      order_id: number;
      buyable_type: string;
      buyable_id: number;
      quantity: number;
      options: string;
      created_at: string;
      updated_at: string;
    }
  ];
  total: string;
  subtotal: string;
  tax: string;
  created_at: string;
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
  status: "new" | "paid"; // TODO: what are possible statuses ?
  updated_at: string;
};

export type UserGroup = {
  id: number;
  name: string;
  users: UserItem[];
};

export type UserGroups = UserGroup[];

export type UserGroupRow = DefaultResponse<UserGroup>;

export type UserGroupAddRow = DefaultResponse<UserItem[]>;

export type UserGroupList = DefaultMetaResponse<UserGroup>;

export type UserGroupsParams = {
  params: {
    current?: number;
    pageSize?: number;
    search?: string;
  };
};
