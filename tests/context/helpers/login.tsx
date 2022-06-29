import { useContext } from "react";
import { EscolaLMSContext } from "./../../../src/react/context";

export const Login = () => {
  const { login, user, tokenExpireDate } = useContext(EscolaLMSContext);

  return (
    <div>
      <button
        data-testid="button-login"
        onClick={() => login({ email: "admin@wellms.io", password: "secret" })}
      >
        {user.loading ? "User Loading" : "User Loaded"}
      </button>
      {user.error && <div data-testid="user-error">Error</div>}
      {user.value && <div data-testid="user-email">{user.value.email}</div>}
      {tokenExpireDate && (
        <div data-testid="user-token-expire-date">{tokenExpireDate}</div>
      )}
      {/*<div data-testid="user-data">{JSON.stringify(user)}</div>*/}
    </div>
  );
};
