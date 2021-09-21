import * as API from "../types/api";
/**  GET /api/pages */
export declare function pages(options?: {
    [key: string]: any;
}): Promise<API.PageList>;
/**  GET /api/pages/:slug */
export declare function page(slug: string, options?: {
    [key: string]: any;
}): Promise<API.DefaultResponse<API.Page>>;
