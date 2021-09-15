import * as API from "../types/api";
export declare enum Currency {
    USD = "USD",
    EUR = "EUR"
}
/**  GET /api/courses */
export declare function settings(): Promise<API.DataResponseSuccess<API.AppSettings>>;
