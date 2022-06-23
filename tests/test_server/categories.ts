import nock from "nock";

export const response = {
  success: true,
  data: {
    foo: "bar",
  },
  message: "OK",
};

export default (scope: nock.Scope) =>
  scope.get("/api/categories/tree").reply(200, response);
