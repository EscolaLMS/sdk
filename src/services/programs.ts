import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";

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
