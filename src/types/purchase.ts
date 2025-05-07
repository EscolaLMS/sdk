import { Product } from "./cart";
import { DefaultMetaResponse, DefaultResponseSuccess } from "./core";
import { PaymentStatusType } from "./enums";

export type OrderItems = EscolaLms.Cart.Models.CartItem & {
  name?: string;
  product?: Product;
};

export type Order = {
  id: number;
  status: PaymentStatusType;
  items?: OrderItems[] | null;
  updated_at: string | null;
  total: number;
  subtotal: number;
  tax: number;
  created_at: string | null;
  user_id: number | null;
  client_name: string | null;
  client_street: string | null;
  client_postal: string | null;
  client_city: string | null;
  client_country: string | null;
  client_company: string | null;
  client_taxid: string | null;
  client_email: string | null;
  client_street_number: string | null;
};

export type Payment = {
  amount: number;
  billable_id: number;
  billable_type: string;
  created_at: string;
  currency: string;
  description: string;
  id: number;
  order_id: number;
  payable_id: null;
  payable_type: null;
  status: PaymentStatusType;
  updated_at: string;
  payable: Order;
};

export type InvoiceData = {
  client_email: string;
  client_name?: string;
  client_street?: string;
  client_street_number?: string;
  client_postal?: string;
  client_city?: string;
  client_country?: string;
  client_company?: string;
  client_taxid?: string;
};

export type OrderListItem = Order;
export type OrderList = DefaultMetaResponse<Order>;
export type PaymentList = DefaultMetaResponse<Payment>;

export type PaymentListItem = Payment;
export type P24Response =
  DefaultResponseSuccess<EscolaLms.Payments.Models.Payment>;
