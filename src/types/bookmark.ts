import { DefaultMetaResponse, Nullable, PaginationParams } from "./core";
import { BookmarkableType, TopicType } from "./enums";
import { User } from "./user";

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
export type BookmarkNote = BookmarkCourse | BookmarkLesson | BookmarkTopic;
export type BookmarkNoteList = DefaultMetaResponse<BookmarkNote>;
