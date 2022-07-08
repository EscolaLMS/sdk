import { useContext, useEffect, useState, useMemo } from "react";
import { act } from "react-dom/test-utils";
import { EscolaLMSContext } from "./../../src/react/context";
import { render, waitFor, screen, fireEvent } from "../test-utils";
import { Login } from "./helpers/login";
import { usePrevious } from "./helpers/usePrevious";
import { generateDataResponse } from "../test_server/jwt";
import { dataSuccess as dataSuccessResponse } from "../test_server/me";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";

jest.useFakeTimers();
jest.setTimeout(30000);

beforeAll(() => {
  fakeServer();
});

const LoginRefresh: React.FC = () => {
  const { user } = useContext(EscolaLMSContext);

  const [userHasBeenLoggedOut, setUserHasBeenLoggedOut] = useState(false);

  const prevUser = usePrevious(user);

  // console.log(user.value, prevUser?.value);

  useEffect(() => {
    if (prevUser && prevUser.value && !user.value) {
      setUserHasBeenLoggedOut(true);
    }
  }, [prevUser, user]);

  return (
    <div>
      {userHasBeenLoggedOut && (
        <div data-testid="user-logged-out">Logged out</div>
      )}
      <Login />
    </div>
  );
};

it("test restore data from localstorage login invalid token ", async () => {
  console.log("invalid token, should fail");
  window.localStorage.setItem(
    "user",
    JSON.stringify({
      token: "invalid token",
      user: {
        loading: false,
        value: {
          id: 1,
          email: "invalid@xxx",
        },
      },
    })
  );

  act(() => {
    render(<LoginRefresh />);
  });

  await waitFor(() => {
    expect(screen.queryByText("User Loaded")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText("Logged out")).toBeInTheDocument();
  });
});

/*

it("test restore data from localstorage login valid token ", async () => {
  const data = generateDataResponse(5);
  const email = dataSuccessResponse.data.email;
  window.localStorage.setItem(
    "user",
    JSON.stringify({
      token: data.data.token,
    })
  );

  act(() => {
    render(<LoginRefresh />);
  });

  await waitFor(() => {
    expect(screen.queryByText("User Loaded")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText(email)).toBeInTheDocument();
  });
});

*/

export {}; // 👈️ if you don't have anything else to export
