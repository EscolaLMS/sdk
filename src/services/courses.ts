// @ts-ignore
/* eslint-disable */
import request from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

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

export const completed: API.IEvent[] = [
  "http://adlnet.gov/expapi/verbs/completed",
  // "http://adlnet.gov/expapi/verbs/answered",
  "http://activitystrea.ms/schema/1.0/consume",
  "http://adlnet.gov/expapi/verbs/passed",
  "http://adlnet.gov/expapi/verbs/mastered",
];

export const noCompletedEventsIds: string[] = [
  "http://h5p.org/libraries/H5P.ImageJuxtaposition-1.4",
];

/**  GET /api/courses */
export async function course(
  params: API.CourseParams,
  options?: { [key: string]: any }
) {
  return request<API.CourseList>(`/api/courses`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/courses/:id */
export async function getCourse(id: number, options?: { [key: string]: any }) {
  return request<API.DefaultResponse<API.Course>>(`/api/courses/${id}`, {
    method: "GET",
    ...(options || {}),
  });
}

/**  GET /api/courses/:id */
export async function getCourseProgram(
  id: number,
  token?: string | null,
  options?: { [key: string]: any }
) {
  return request<API.DefaultResponse<API.CourseProgram>>(
    `/api/courses/${id}/program`,
    {
      method: "GET",
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Current-timezone": currentTimezone(),
          }
        : {
            "Content-Type": "application/json",
          },
      ...(options || {}),
    }
  );
}

export async function progress(
  token: string,
  options?: { [key: string]: any }
) {
  return request<API.DefaultResponse<API.CourseProgress>>(
    `/api/courses/progress`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      ...(options || {}),
    }
  );
}

export async function sendProgress(
  courseId: number,
  data: API.CourseProgressItemElement[],
  token: string,
  options?: { [key: string]: any }
) {
  return request<API.DefaultResponse<API.CourseProgress>>(
    `/api/courses/progress/${courseId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      data: {
        progress: data,
      },
      ...(options || {}),
    }
  );
}

export async function tutors(options?: { [key: string]: any }) {
  return request<API.TutorList>(`/api/tutors`, {
    method: "GET",
    ...(options || {}),
  });
}

export async function tutor(id: number, options?: { [key: string]: any }) {
  return request<API.TutorSingle>(`/api/tutors/${id}`, {
    method: "GET",
    ...(options || {}),
  });
}

export async function topicPing(
  topicId: number,
  token: string,
  options?: { [key: string]: any }
) {
  return request<Boolean>(`/api/courses/progress/${topicId}/ping`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },

    ...(options || {}),
  });
}

export async function h5pProgress(
  topicId: number,
  statementId: string,
  statement: API.IStatement,
  token: string
) {
  return request<API.SuccessResponse>(`/api/courses/progress/${topicId}/h5p`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },

    data: {
      event: statementId,
      data: statement.result || {},
    },
  });
}
