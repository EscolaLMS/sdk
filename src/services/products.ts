import request from "umi-request";
import * as API from "../types/api";

/**  GET /api/products/:id */
export async function getSingleProduct(token: string, id: number) {
  return request<API.DefaultResponse<API.Product>>(`/api/products/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
