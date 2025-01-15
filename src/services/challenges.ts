import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types";

export async function challenges(
  apiUrl: string,
  token: string,
  params?: API.ChallengesParams,
  options?: RequestOptionsInit
) {
  return request<API.ChallengesList>(`${apiUrl}/api/competency-challenges`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params,
    ...(options || {}),
  });
}

export async function singleChallenge(
  apiUrl: string,
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.CompetencyChallenge>>(
    `${apiUrl}/api/competency-challenges/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...(options || {}),
    }
  );
}
