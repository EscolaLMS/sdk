import jsSHA from "jssha";

const IMG_ENDPOINT = `/api/images/img`;
const CACHE_ENDPOINT = `/storage/imgcache`;

// https://startup-academy-stage.s3.eu-central-1.amazonaws.com/imgcache/5c14861ecd894c6eccc5604658cc2401f8a82aaf.jpg

const getHash = (string: string) => {
  const sha = new jsSHA("SHA-1", "TEXT", { encoding: "UTF8" });
  sha.update(string);
  return sha.getHash("HEX");
};

const paramsToUrl = (params: object) =>
  Object.entries(params)
    .map((e) => (typeof e[1] === "undefined" ? "" : e.join("=")))
    .join("&");

const getStringifyParams = (params: object) => {
  const paramsInString = JSON.stringify(params);
  // in backend, empty params are empty array
  return paramsInString === JSON.stringify({}) ? "[]" : paramsInString;
};

export const getImagePrefix = (apiUrl: string) =>
  /** TS ignore below is on purpose */
  //@ts-ignore
  process?.env?.CACHE_PREFIX ||
  //@ts-ignore
  process?.env?.NEXT_PUBLIC_CACHE_PREFIX ||
  //@ts-ignore
  process?.env?.REACT_APP_CACHE_PREFIX ||
  //@ts-ignore
  window?.CACHE_PREFIX ||
  `${apiUrl}/storage/imgcache`;

export const getImageCachePath = (
  apiUrl: string,
  imagePath: string,
  params: Record<string, string> = {}
) => {
  const prefix = getImagePrefix(apiUrl);
  const hash = getHash(imagePath + getStringifyParams(params));
  return `${prefix}/${hash}.${imagePath.split(".").pop()}`;
};

export const getImageApiPath = (
  apiUrl: string,
  imagePath: string,
  params: object = {}
) => {
  return `${apiUrl}${IMG_ENDPOINT}/?${paramsToUrl({
    ...params,
    path: imagePath,
  })}`;
};
