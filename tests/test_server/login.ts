import nock from "nock";
import jwt from "jsonwebtoken";
import { generateDataResponse, secretOrPublicKey } from "./jwt";

export const dataSuccess = {
  success: true,
  message: "Login successful",
  data: {
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGExY2RiYi1iZTRiLTRlMjktOTRhZi1mYzk5MjI1YTQ2NmMiLCJqdGkiOiIyNmVkNDdhNGI3YTE4YWQyYzFmMDMxM2ZkNzNmOTE3NDYwYzhlN2E5Yzc2ZTE2NmYwZDBlYWQxMGNhOTg4MGRiNDUxOWEwYzE5ZjgwMjgxNCIsImlhdCI6MTY1NjQwNjA1MS44OTcxNDksIm5iZiI6MTY1NjQwNjA1MS44OTcxNTQsImV4cCI6MTY1NjQwNjM1MS44OTE2MjMsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.IENqyO8p4XHiunlaJNWtOtM-LiPchIZB6AymIp5IbqVpC3N3Y1X-dBpV8G3be8migTwlk6M-FouhaKeh5hIgnAxRuD5Gl2iRoN5EoeK7PDSx0egUkH9U4AQWkRnW9uBTY69DZ1_mFf-zEH_mWKbn2VJHy9jR3IewdREbJT25T1Y_8WYqzH-ItAKvo9qixlqsq1VRIvJEtuaF4ECYiEDYdP024EDPTzSgH_MvpeZMEKuqmqDs8VgVedlBsajjN_qv3TTu5oJoDl1N1hdWy5a1fYSAeJ2twzKHaJSyR4xkepkmV7p5RGX9WXP47dMNsvJXIUvKo3ZnUUPSbvu0ZKA9daW9bhoUU1kqRpPIxhEzKOTi6tzr77AAtmrrEaEto2cylFcmh8RaFf9w1QfZb2mrSGdIXc5OReMFZKZu8-x_jDyV5lEl0pNnSkRZ5VQ0nJA9RcodnjWYswHTJOBRgguvmUCWZGwyzkxXaABtNhUX3sGRdpB-T5LHQvXt1LPFh13tZekwxej1jtnntjtEAFgNAhKaseJgSY4IEr0hk7a-mMl4aZ8SXzGuaYT8AaikDOhY8odKbmMWuF24Mbe34FOSkD3nS3m90N203K4JsXpGUZBjdLMY7rjfDQ9GvzcccDmHaEYyB1_m3BlfKCVpXo1bBqc6YMFtqRJWiyPSMr_KVL0",
    expires_at: "2022-06-28T08:52:31.000000Z",
  },
};

export const dataFail = {
  message: "Invalid credentials",
};

export default (scope: nock.Scope) => {
  scope.post("/api/auth/login").reply((uri, requestBody) => {
    if (typeof requestBody === "object") {
      if (requestBody && requestBody.password === "secret") {
        const response = generateDataResponse(2, "Login successful");
        return [200, response];
      }
    }

    return [422, dataFail];
  });

  scope.get("/api/auth/refresh").reply(function (uri, requestBody) {
    const token = this.req.headers.authorization.toString().split(" ")[1];

    if (token) {
      try {
        if (jwt.verify(token, secretOrPublicKey)) {
          const response = generateDataResponse(2, "Refresh successful");
          return [200, response];
        }
      } catch (er) {
        return [422, dataFail];
      }
    }

    return [422, dataFail];
  });
};
