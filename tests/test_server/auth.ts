import nock from "nock";
import { dataSuccess } from "./me";

export const registerDataSuccess = {
  success: true,
  message: "Registered",
};

export const deleteAccountDataSuccess = {
  message: "User deletion request created",
  success: true,
};

const dataFail = {
  message: "The given data was invalid.",
  errors: {
    email: ["The email has already been taken."],
  },
};

export const forgotDataSuccess = {
  message: "Password reset email sent",
  success: true,
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

  scope.post("/api/auth/password/forgot").reply((uri, requestBody) => {
    if (
      typeof requestBody === "object" &&
      requestBody.email &&
      requestBody.return_url
    ) {
      return [200, forgotDataSuccess];
    }
    return [422];
  });

  scope.put("/api/profile/me").reply((uri, requestBody) => {
    if (typeof requestBody === "object") {
      return [200, dataSuccess];
    }
    return [422];
  });

  scope.post("/api/profile/delete/init").reply((uri, requestBody) => {
    if (typeof requestBody === "object" && requestBody.return_url) {
      const response = deleteAccountDataSuccess;
      return [200, response];
    } else {
      return [422];
    }
  });
};
