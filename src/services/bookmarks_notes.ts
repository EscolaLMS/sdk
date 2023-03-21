import request, { RequestOptionsInit } from 'umi-request';
import * as API from '../types/api';
import { currentTimezone } from '../utils';

/**  GET /api/bookmarks */
export async function bookmarkNotes(
  apiUrl: string,
  token: string,
  params: API.BookmarkNoteParams,
  options?: RequestOptionsInit
) {
  return request<API.BookmarkNoteList>(`${apiUrl}/api/bookmarks`, {
    method: 'GET',
    params,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Current-timezone': currentTimezone(),
    },
    ...(options || {}),
  });
}

/** POST /api/bookmarks */
export async function createBookmarkNote(
  apiUrl: string,
  token: string,
  body: EscolaLms.Bookmarks.Http.Requests.CreateBookmarkRequest,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.BookmarkNote>>(
    `${apiUrl}/api/bookmarks`,
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

/**  DELETE /api/bookmarks/:id */
export async function deleteBookmarkNote(
  apiUrl: string,
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.BookmarkNote>>(
    `${apiUrl}/api/bookmarks/${id}`,
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

/**  PATCH /api/bookmarks/:id */
export async function updateBookmarkNote(
  apiUrl: string,
  token: string,
  id: number,
  body: EscolaLms.Bookmarks.Http.Requests.UpdateBookmarkRequest,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.BookmarkNote>>(
    `${apiUrl}/api/bookmarks/${id}`,
    {
      method: 'PATCH',
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
