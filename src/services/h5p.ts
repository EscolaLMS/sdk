import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";

export async function getH5p(
  apiUrl: string,
  uuid: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.H5PObject>>(
    `${apiUrl}/api/hh5p/content/${uuid}`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
