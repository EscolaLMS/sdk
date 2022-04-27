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
export async function getQuestionnaires(model: string, id: number, options?: RequestOptionsInit) {
  return request<API.DefaultResponse<any>>(`/api/questionnaire/${model}/${id}`, {
    method: "GET",
    ...(options || {}),
  });
}
