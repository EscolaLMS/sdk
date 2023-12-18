import request from "umi-request";
import * as API from "../types/api";

export async function loginPencilSpaces(
  apiUrl: string,
  token: string,
  body: API.PencilSpaces
) {
  return request<API.DefaultResponse<API.PencilSpaces>>(
    `${apiUrl}/api/pencil-spaces/login`,
    {
      method: "POST",
      data: body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
