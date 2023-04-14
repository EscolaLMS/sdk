// @ts-ignore
/* eslint-disable */
import request, { RequestOptionsInit } from "umi-request";
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
  apiUrl: string,
  params: API.CourseParams,
  options?: RequestOptionsInit
) {
  return request<API.CourseList>(`${apiUrl}/api/courses`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/courses/:id */
export async function getCourse(
  apiUrl: string,
  id: number,
  token?: string | null,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Course>>(
    `${apiUrl}/api/courses/${id}`,
    {
      method: "GET",
      ...(options || {}),
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Current-timezone": currentTimezone(),
          }
        : {
            "Content-Type": "application/json",
          },
    }
  );
}

/**  GET /api/courses/:id */
export async function getCourseProgram(
  apiUrl: string,
  id: number,
  token?: string | null,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.CourseProgram>>(
    `${apiUrl}/api/courses/${id}/program`,
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
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.CourseProgress>>(
    `${apiUrl}/api/courses/progress`,
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

export async function courseProgress(
  apiUrl: string,
  courseId: number,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.CourseProgressDetails>>(
    `${apiUrl}/api/courses/progress/${courseId}`,
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
  apiUrl: string,
  courseId: number,
  data: API.CourseProgressItemElement[],
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.CourseProgressDetails>>(
    `${apiUrl}/api/courses/progress/${courseId}`,
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

export async function tutors(apiUrl: string, options?: RequestOptionsInit) {
  return request<API.TutorList>(`${apiUrl}/api/tutors`, {
    method: "GET",
    ...(options || {}),
  });
}

export async function tutor(
  apiUrl: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.TutorSingle>(`${apiUrl}/api/tutors/${id}`, {
    method: "GET",
    ...(options || {}),
  });
}

export async function topicPing(
  apiUrl: string,
  topicId: number,
  token: string,
  options?: RequestOptionsInit
) {
  return request<Boolean>(`${apiUrl}/api/courses/progress/${topicId}/ping`, {
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
  apiUrl: string,
  topicId: number,
  statementId: string,
  statement: API.IStatement,
  token: string
) {
  return request<API.SuccessResponse>(
    `${apiUrl}/api/courses/progress/${topicId}/h5p`,
    {
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
    }
  );
}
