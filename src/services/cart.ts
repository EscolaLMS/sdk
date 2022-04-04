import request from "umi-request";
import * as API from "../types/api";

export async function addToCart(
  productId: number,
  token: string,
  quantity?: number,
  options?: { [key: string]: any },
) {
  return request<API.SuccessResponse>(`/api/cart/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  options?: { [key: string]: any },
) {
  return request<API.SuccessResponse>(`/api/cart/products/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

export async function cart(token: string, options?: { [key: string]: any }) {
  return request<API.DefaultResponseSuccess<API.Cart>>(`/api/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

export async function payWithStripe(
  paymentMethodId: string,
  token: string,
  options?: { [key: string]: any },
) {
  return request<API.SuccessResponse>(`/api/cart/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      paymentMethodId,
    },
    ...(options || {}),
  });
}

export async function payWithP24(email: string, token: string, return_url: string) {
  return request<API.P24Response>(`/api/cart/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      email,
      return_url,
    },
  });
}

export async function orders(token: string, options?: { [key: string]: any }) {
  return request<API.OrderList>(`/api/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

export async function payments(token: string, options?: { [key: string]: any }) {
  return request<API.PaymentList>(`/api/payments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}
