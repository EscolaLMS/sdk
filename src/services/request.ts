import request from "umi-request";

let fired = false;

export const interceptors = (apiUrl: string) => {
  if (fired) {
    return; // fire this only once
  }
  fired = true;
  request.interceptors.request.use((url, options) => {
    if (url.includes(apiUrl)) {
      return {
        url: `${url}`,
        options: options,
      };
    }
    return {
      url: `${apiUrl}${url}`,
      options: { ...options, interceptors: true },
    };
  });
};
