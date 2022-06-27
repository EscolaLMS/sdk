import nock from "nock";

export const response = {
  success: true,
  data: {
    foo: "bar",
  },
  message: "OK",
};

export default (scope: nock.Scope) =>
  scope.get("/api/config").reply(200, response);
