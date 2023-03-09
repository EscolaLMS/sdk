import request, { RequestOptionsInit } from 'umi-request';
import * as API from '../types/api';
import { currentTimezone } from '../utils';

/**  GET /api/course-access-enquiries */
export async function courseAccess(
  apiUrl: string,
  token: string,
  params: API.CourseAccessEnquiryListParams,
  options?: RequestOptionsInit
) {
  return request<API.CourseAccessEnquiryList>(
    `${apiUrl}/api/course-access-enquiries`,
    {
      method: 'GET',
      params,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Current-timezone': currentTimezone(),
      },
      ...(options || {}),
    }
  );
}

/**  DELETE /api/course-access-enquiries/:id */
export async function deleteCourseAccess(
  apiUrl: string,
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.CourseAccessEnquiry>>(
    `${apiUrl}/api/course-access-enquiries/${id}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Current-timezone': currentTimezone(),
      },
      ...(options || {}),
    }
  );
}

/**  POST /api/course-access-enquiries */
export async function createCourseAccess(
  apiUrl: string,
  token: string,
  body: API.CourseAccessEnquiryCreateRequest,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.CourseAccessEnquiry>>(
    `${apiUrl}/api/course-access-enquiries`,
    {
      method: 'POST',
      data: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Current-timezone': currentTimezone(),
      },
      ...(options || {}),
    }
  );
}
