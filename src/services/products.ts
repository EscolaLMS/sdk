import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

/**  GET /api/products */
export async function products(
  apiUrl: string,
  params: API.PageParams &
    API.PaginationParams & { type?: string; "tags[]"?: string },
  options?: RequestOptionsInit
) {
  return request<API.ProductList>(`${apiUrl}/api/products`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/products/:id */
export async function getSingleProduct(
  apiUrl: string,
  id: number,
  token?: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.Product>>(
    `${apiUrl}/api/products/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      ...(options || {}),
    }
  );
}
