export declare function addToCart(courseId: number, token: string, options?: {
    [key: string]: any;
}): Promise<API.SuccessResponse>;
export declare function removeFromCart(courseId: number, token: string, options?: {
    [key: string]: any;
}): Promise<API.SuccessResponse>;
export declare function cart(token: string, options?: {
    [key: string]: any;
}): Promise<API.DefaultResponseSuccess<API.Cart>>;
export declare function payWithStripe(paymentMethodId: string, token: string, options?: {
    [key: string]: any;
}): Promise<API.SuccessResponse>;
export declare function orders(token: string, options?: {
    [key: string]: any;
}): Promise<API.OrderList>;
export declare function payments(token: string, options?: {
    [key: string]: any;
}): Promise<any>;
