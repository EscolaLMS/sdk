import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

export async function addToCart(
  productId: number,
  token: string,
  quantity?: number,
  options?: RequestOptionsInit
) {
  return request<API.SuccessResponse>(`/api/cart/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    data: {
      id: productId,
      quantity: quantity || 1,
    },
    ...(options || {}),
  });
}

export async function removeFromCart(
  itemId: number,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.SuccessResponse>(`/api/cart/products/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    ...(options || {}),
  });
}

export async function cart(token: string, options?: RequestOptionsInit) {
  return request<API.DefaultResponseSuccess<API.Cart>>(`/api/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Current-timezone": currentTimezone(),
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

export async function addMisingProducts(token: string, products: number[]) {
  return request<API.DefaultResponseSuccess<API.Cart>>(`/api/cart/missing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    data: {
      products: products,
    },
  });
}

export async function payWithStripe(
  paymentMethodId: string,
  return_url: string,
  token: string
) {
  return request<API.SuccessResponse>(`/api/cart/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    data: {
      paymentMethodId,
      gateway: "stripe",
      return_url,
    },
  });
}

export async function payWithP24(
  email: string,
  return_url: string,
  token: string,
  data?: API.InvoiceData
) {
  return request<API.P24Response>(`/api/cart/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    data: { email, return_url, ...data },
  });
}

export async function orders(
  token: string,
  params?: API.PaginationParams,
  options?: RequestOptionsInit
) {
  return request<API.OrderList>(`/api/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    params,
    ...(options || {}),
  });
}

export async function payments(token: string, options?: RequestOptionsInit) {
  return request<API.PaymentList>(`/api/payments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    ...(options || {}),
  });
}

export async function useVoucher(voucher: string, token: string) {
  return request<API.AuthResponse>("/api/cart/voucher", {
    method: "POST",
    data: {
      code: voucher,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
  });
}

export async function orderInvoice(
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<any>(`/api/invoices/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/pdf",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    ...(options || {}),
  });
}
