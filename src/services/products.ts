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
  token?: string | null,
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

/**  GET /api/products/my */
export async function getMyProducts(
  apiUrl: string,
  params: API.PageParams &
    API.PaginationParams & { type?: string; "tags[]"?: string },
  token?: string | null,
  options?: RequestOptionsInit
) {
  return request<API.ProductList>(`${apiUrl}/api/products/my`, {
    method: "GET",
    params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },

    ...(options || {}),
  });
}

/**  POST /api/productables/attach */
export async function attachProduct(
  apiUrl: string,
  productableId: number,
  productableType: string,
  token?: string | null,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<null>>(
    `${apiUrl}/api/productables/attach`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      data: {
        productable_id: productableId,
        productable_type: productableType,
      },
      ...(options || {}),
    }
  );
}
