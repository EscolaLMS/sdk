import jsSHA from "jssha";

const IMG_ENDPOINT = `/api/images/img`
const CACHE_ENDPOINT = `/storage/imgcache`

const getHash = (string: string) => {
    const sha = new jsSHA('SHA-1', "TEXT", { encoding: "UTF8" })
    sha.update(string)
    return sha.getHash('HEX')
}

const paramsToUrl = (params: object) =>
    Object.entries(params)
        .map((e) => typeof e[1] === 'undefined' ? '' : e.join("="))
        .join("&");

const getStringifyParams = (params: object) => {
    const paramsInString = JSON.stringify(params)
    // in backend, empty params are empty array
    return paramsInString === JSON.stringify({}) ? '[]' : paramsInString
}

export const getImageCachePath = (apiUrl: string, imagePath: string, params: Record<string, string> = {}) => {
    const hash = getHash(imagePath + getStringifyParams(params));
    return `${apiUrl}${CACHE_ENDPOINT}/${hash}.${imagePath.split(".").pop()}`;
}

export const getImageApiPath = (apiUrl: string, imagePath: string, params: object = {}) => {
    return `${apiUrl}${IMG_ENDPOINT}/?${paramsToUrl({
        ...params,
        path: imagePath
    })}`;
}
