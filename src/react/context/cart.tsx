import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { getDefaultData } from ".";
import { API } from "../..";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { defaultConfig } from "./defaults";
import { fetchDataType } from "./states";
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextStateValue,
} from "./types";
import { UserContext } from "./user";
import {
  cart as getCart,
  addToCart as postAddToCart,
  addMissingProducts as postAddMissingProducts,
  removeFromCart as deleteRemoveFromCart,
} from "./../../services/cart";
import { DefaultResponseError } from "../../types/api";

export const CartContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    | "cart"
    | "fetchCart"
    | "addToCart"
    | "removeFromCart"
    | "addMissingProducts"
    | "resetCart"
  >
> = createContext({
  cart: defaultConfig.cart,
  fetchCart: defaultConfig.fetchCart,
  addToCart: defaultConfig.addToCart,
  removeFromCart: defaultConfig.removeFromCart,
  resetCart: defaultConfig.resetCart,
  addMissingProducts: defaultConfig.addMissingProducts,
});

export interface CartContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "cart">>;
  ssrHydration?: boolean;
}

export const CartContextProvider: FunctionComponent<
  PropsWithChildren<CartContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});
  const { token } = useContext(UserContext);

  const [cart, setCart] = useLocalStorage<ContextStateValue<API.Cart>>(
    "lms",
    "cart",
    getDefaultData("cart", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchCart = useCallback(() => {
    return token
      ? fetchDataType<API.Cart>({
          controllers: abortControllers.current,
          controller: `cart`,
          mode: "value",
          fetchAction: getCart.bind(null, apiUrl)(token, {
            signal: abortControllers.current?.cart?.signal,
          }),
          setState: setCart,
        })
      : Promise.reject("noToken");
  }, [token]);

  const addToCart = useCallback(
    (productId: number, quantity?: number) => {
      if (!token) {
        return Promise.reject("noToken");
      }
      setCart((prevState) => ({
        ...prevState,
        loading: true,
      }));
      return postAddToCart
        .bind(null, apiUrl)(productId, token, quantity)
        .then((response) => {
          fetchCart();
          return response;
        })
        .catch((error: DefaultResponseError) => {
          setCart((prevState) => ({
            ...prevState,
            loading: false,
            error: error,
          }));
          return error;
        });
    },
    [fetchCart]
  );

  const addMissingProducts = useCallback(
    (products: number[]) => {
      if (!token) {
        return Promise.reject("noToken");
      }
      setCart((prevState) => ({
        ...prevState,
        loading: true,
      }));
      return postAddMissingProducts
        .bind(null, apiUrl)(token, products)
        .then(() => {
          fetchCart();
        })
        .catch((error) => {
          setCart((prevState) => ({
            ...prevState,
            loading: false,
            error: error.data,
          }));
        });
    },
    [fetchCart]
  );

  const removeFromCart = useCallback(
    (itemId: number) => {
      if (!token) {
        return Promise.reject("noToken");
      }
      setCart((prevState) => ({
        ...prevState,
        loading: true,
      }));
      return deleteRemoveFromCart
        .bind(null, apiUrl)(itemId, token)
        .then((response) => {
          setCart((prevState) => ({
            ...prevState,
            loading: false,
            value: {
              ...prevState.value,
              items:
                prevState && prevState.value
                  ? prevState.value.items.filter((item) => item.id !== itemId)
                  : [],
            },
          }));
          fetchCart();

          return response;
        })
        .catch((error) => {
          setCart((prevState) => ({
            ...prevState,
            loading: false,
            error: error.data,
          }));

          return error;
        });
    },
    [fetchCart]
  );

  const resetCart = useCallback(() => {
    setCart(defaultConfig.cart);
  }, []);

  useEffect(() => {
    if (defaults) {
      defaults.cart !== null &&
        setCart({
          loading: false,
          value: defaults.cart?.value,
          error: undefined,
        });
    }
  }, [defaults]);

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        removeFromCart,
        resetCart,
        addMissingProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
