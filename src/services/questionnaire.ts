import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

/**  GET /api/questionnaire/stars */
export async function questionnaireStars(
  apiUrl: string,
  model: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.QuestionnaireStars>>(
    `${apiUrl}/api/questionnaire/stars/${model}/${id}`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/**  GET /api/questionnaire/:model/:id */
export async function getQuestionnaires(
  apiUrl: string,
  token: string,
  model: string,
  id: number
) {
  return request<
    API.DefaultMetaResponse<EscolaLms.Questionnaire.Models.Questionnaire>
  >(`${apiUrl}/api/questionnaire/${model}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
  });
}

export async function getQuestionnaire(
  apiUrl: string,
  token: string,
  modelTypeTitle: string,
  modelID: number,
  id: number
) {
  return request<API.DefaultResponse<API.QuestionnaireAnswerResponse>>(
    `${apiUrl}/api/questionnaire/${modelTypeTitle}/${modelID}/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
    }
  );
}

/**  POST /api/questionnaire/:model/:id */
export async function questionnaireAnswer(
  apiUrl: string,
  token: string,
  model: string,
  modelID: number,
  id: number,
  data: Partial<EscolaLms.Questionnaire.Models.QuestionAnswer>
) {
  return request<
    API.DefaultResponse<EscolaLms.Questionnaire.Models.QuestionAnswer>
  >(`${apiUrl}/api/questionnaire/${model}/${modelID}/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    data,
  });
}
