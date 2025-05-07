import {
  CategoryListItem,
  DefaultMetaResponse,
  PageParams,
  PaginatedList,
  PaginatedListParams,
  PaginationParams,
  Tag,
} from "./core";
import { UserItem } from "./user";
import { CourseProgressItemElementStatus } from "./enums";

import { Topic } from "./topic";
import { Product } from "./cart";
import { SCORM, SCORM_SCO } from "./scorm";

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

export type CourseProgressItemElement = {
  topic_id: number;
  status: CourseProgressItemElementStatus;
  started_at?: string;
  finished_at?: string;
  seconds?: number;
};

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

export type CourseProgram = Course & {
  lessons: Lesson[];
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

export type CourseList = DefaultMetaResponse<Course>;
export type CourseListItem = Course;
export type CourseProgress = CourseProgressItem[];
export type CourseProgressDetails = CourseProgressItemElement[];
