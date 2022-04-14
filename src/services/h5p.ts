import request from "umi-request";
import * as API from "../types/api";

export async function getH5p(id: number, options?: { [key: string]: any }) {
  return request<API.DefaultResponse<API.H5PObject>>(
    `/api/hh5p/content/${id}`,
    {
      method: "GET",
      useCache: false,
      ...(options || {}),
    }
  );
}
