import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";

/**  GET /api/pages */
export async function products(
  params: API.PageParams & API.PaginationParams & { type?: string; "tags[]"?: string },
  options?: RequestOptionsInit,
) {
  return request<API.ProductList>(`/api/products`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**  GET /api/products/:id */
export async function getSingleProduct(id: number) {
  return request<API.DefaultResponse<API.Product>>(`/api/products/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
