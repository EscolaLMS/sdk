import { useContext, useEffect, useState, useMemo } from "react";
import { act } from "react-dom/test-utils";
import { EscolaLMSContext } from "./../../src/react/context";
import { render, waitFor, screen, fireEvent } from "../test-utils";
import { Login } from "./helpers/login";
import { usePrevious } from "./helpers/usePrevious";

import "@testing-library/jest-dom";

import fakeServer from "../test_server";

jest.useFakeTimers();
jest.setTimeout(30000);

beforeAll(() => {
  fakeServer();
});

const LoginRefresh: React.FC = () => {
  const { user } = useContext(EscolaLMSContext);

  const prevUser = usePrevious(user);

  const userHasBeenLoggedOut = useMemo(() => {
    return prevUser && prevUser.value && !user.value;
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

export {}; // 👈️ if you don't have anything else to export
