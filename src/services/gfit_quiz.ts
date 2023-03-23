import request from 'umi-request';
import type { RequestOptionsInit } from 'umi-request';
import * as API from '../types/api';
import { currentTimezone } from '../utils';

export async function quizAttempt(
  apiUrl: string,
  token: string,
  body: EscolaLms.TopicTypeGift.Http.Requests.CreateQuizAttemptRequest,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.QuizAttempt>>(
    `${apiUrl}/api/quiz-attempts`,
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

export async function quizAnswer(
  apiUrl: string,
  token: string,
  body: EscolaLms.TopicTypeGift.Http.Requests.SaveAttemptAnswerRequest,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.QuizAttempt>>(
    `${apiUrl}/api/quiz-answers`,
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
