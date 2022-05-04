import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";

/**  GET /api/questionnaire/stars */
export async function questionnaireStars(model: string, id: number, options?: RequestOptionsInit) {
  return request<API.DefaultResponse<API.QuestionnaireStars[]>>(
    `/api/questionnaire/stars/${model}/${id}`,
    {
      method: "GET",
      ...(options || {}),
    },
  );
}

/**  GET /api/questionnaire/:model/:id */
export async function getQuestionnaires(token: string, model: string, id: number) {
  return request<API.DefaultMetaResponse<EscolaLms.Questionnaire.Models.Questionnaire>>(
    `/api/questionnaire/${model}/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

/**  POST /api/questionnaire/:model/:id */
export async function questionnaireAnswer(
  token: string,
  model: string,
  modelID: number,
  id: number,
  data: Partial<EscolaLms.Questionnaire.Models.QuestionAnswer>,
) {
  return request<API.DefaultResponse<EscolaLms.Questionnaire.Models.QuestionAnswer>>(
    `/api/questionnaire/${model}/${modelID}/${id}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data,
    },
  );
}
