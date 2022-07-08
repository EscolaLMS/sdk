import nock from "nock";

export const registerDataSuccess = {
  success: true,
  message: "Registered",
};

export const dataFail = {
  message: "The given data was invalid.",
  errors: {
    email: ["The email has already been taken."],
  },
};

const isEmptyObject = (obj: object) =>
  Object.values(obj).some((x) => x === null || x === "");

export default (scope: nock.Scope) => {
  scope.post("/api/auth/register").reply((uri, requestBody) => {
    if (
      typeof requestBody === "object" &&
      requestBody.email === "test@test.pl"
    ) {
      return [422, dataFail];
    }

    if (
      typeof requestBody === "object" &&
      JSON.stringify(requestBody) !== "{}"
    ) {
      if (!isEmptyObject(requestBody)) {
        const response = registerDataSuccess;
        return [200, response];
      } else {
        return [422, dataFail];
      }
    }

    return [422, dataFail];
  });
};
