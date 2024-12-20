import { User } from "./user-types";

export type Product = Omit<EscolaLms.Cart.Models.Product, "productables"> & {
  available_quantity: number;
  created_at?: string | null;
  updated_at?: string | null;
  buyable?: boolean;
  poster_path?: string | null;
  owned?: boolean;
  owned_quantity: number;
  related_products?: Product[];
  sold_quantity: number;
  gross_price: number;
  productables?: Array<ProductItems> | null;
  authors?: User[] | null;
  end_date?: string;
  poster_url?: string;
  is_active?: boolean;
  id?: string;
  tags?: string[];
  name?: string;
  subscription_period?: string;
  subscription_duration?: number;
  fields?: {
    in_app_purchase_ids?: {
      revenuecat?: {
        app_store?: string;
        play_store?: string;
      };
    };
  };
};

export type ProductItems = EscolaLms.Cart.Models.ProductProductable & {
  name?: string;
  description?: string;
};

export type Cart = {
  items: CartItem[];
  total?: string | number;
  subtotal?: string | number;
  tax?: string | number;
  total_with_tax?: number;
  coupon?: string | null;
};

export type CartProductParameters = {
  description: string;
  id: number;
  morph_class: string;
  name: string;
  productable_id: number;
  productable_type: string;
};

export type CartItem = EscolaLms.Cart.Models.CartItem & {
  product?: Product & {
    productables: CartProductParameters[];
  };
  product_id?: number;
  total_with_tax?: number;
};
