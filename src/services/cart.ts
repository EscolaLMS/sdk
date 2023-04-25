import request, { RequestOptionsInit } from "umi-request";
import * as API from "../types/api";
import { currentTimezone } from "../utils";

export async function addToCart(
  apiUrl: string,
  productId: number,
  token?: string,
  quantity?: number,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponse<API.AddProductResponse>>(
    `${apiUrl}/api/cart/products`,
    {
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
    }
  );
}

export async function removeFromCart(
  apiUrl: string,
  itemId: number,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.SuccessResponse>(`${apiUrl}/api/cart/products/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    ...(options || {}),
  });
}

export async function cart(
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.DefaultResponseSuccess<API.Cart>>(`${apiUrl}/api/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Current-timezone": currentTimezone(),
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

export async function addMissingProducts(
  apiUrl: string,
  token: string,
  products: number[]
) {
  return request<API.DefaultResponseSuccess<API.Cart>>(
    `${apiUrl}/api/cart/missing`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Current-timezone": currentTimezone(),
      },
      data: {
        products: products,
      },
    }
  );
}

export async function payWithStripe(
  apiUrl: string,
  payment_method: string,
  return_url: string,
  token: string
) {
  return request<API.SuccessResponse>(`${apiUrl}/api/cart/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    data: {
      gateway: "stripe",
      payment_method,
      return_url,
    },
  });
}

export async function payWithP24(
  apiUrl: string,
  email: string,
  return_url: string,
  token: string,
  data?: API.InvoiceData
) {
  return request<API.P24Response>(`${apiUrl}/api/cart/pay`, {
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
  apiUrl: string,
  token: string,
  params?: API.PaginationParams,
  options?: RequestOptionsInit
) {
  return request<API.OrderList>(`${apiUrl}/api/orders`, {
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

export async function payments(
  apiUrl: string,
  token: string,
  options?: RequestOptionsInit
) {
  return request<API.PaymentList>(`${apiUrl}/api/payments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    ...(options || {}),
  });
}

export async function addVoucher(
  apiUrl: string,
  voucher: string,
  token: string
) {
  return request<API.AuthResponse>(`${apiUrl}/api/cart/voucher`, {
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

export async function removeVoucher(apiUrl: string, token: string) {
  return request<API.AuthResponse>(`${apiUrl}/api/cart/voucher`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
  });
}

export async function orderInvoice(
  apiUrl: string,
  token: string,
  id: number,
  options?: RequestOptionsInit
) {
  return request<any>(`${apiUrl}/api/order-invoices/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/pdf",
      Authorization: `Bearer ${token}`,
      "Current-timezone": currentTimezone(),
    },
    ...(options || {}),
  });
}
