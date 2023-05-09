import { useCallback, useContext, useEffect, useState } from "react";
import { EscolaLMSContext } from "../context";
import { Cart, DefaultResponseSuccess } from "../../types/api";

type PogressState = {
  data: Cart | undefined;
  loaded: boolean;
  loading: boolean;
};

export const useCart = () => {
  const [cart, setCart] = useState<PogressState>({
    data: undefined,
    loaded: false,
    loading: false,
  });
  const { user, fetchCart } = useContext(EscolaLMSContext);

  const getCartData = useCallback(() => {
    setCart({
      ...cart,
      loading: true,
    });
    fetchCart()
      .then((res) => {
        const response = res as DefaultResponseSuccess<Cart>;
        if (response.success) {
          setCart({
            data: response.data,
            loaded: true,
            loading: false,
          });
        }
      })
      .catch(() =>
        setCart({
          ...cart,
          loaded: true,
          loading: false,
        })
      );
  }, []);

  useEffect(() => {
    if (user?.value && !user.loading && !cart.loading && !cart.loaded) {
      getCartData();
    }
  }, [user, cart, fetchCart]);

  return {
    cart,
    getCartData,
  };
};
