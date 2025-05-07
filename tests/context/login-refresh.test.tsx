import { useContext, useEffect, useState, act } from "react";

import { EscolaLMSContext } from "./../../src/react/context";
import { render, waitFor, screen, fireEvent } from "../test-utils";
import { Login } from "./helpers/login";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";

//jest.useFakeTimers();
//jest.setTimeout(30000);

const w8 = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

beforeAll(() => {
  fakeServer();
});

const LoginRefresh: React.FC = () => {
  const { tokenExpireDate } = useContext(EscolaLMSContext);

  const [tokenIncrement, setTokenIncrement] = useState(0);

  useEffect(() => {
    setTokenIncrement((prev) => prev + 1);
  }, [tokenExpireDate]);

  return (
    <div>
      <Login />
      {tokenExpireDate && (
        <div data-testid="tokenExpireDate">{tokenExpireDate}</div>
      )}
      <div data-testid="tokenIncrement">{tokenIncrement}</div>
    </div>
  );
};

it("test fetching refresh tokens ", async () => {
  act(() => {
    render(<LoginRefresh />);
  });

  act(() => {
    fireEvent(
      screen.getByTestId("button-login"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.getByTestId("user-token-expire-date")).toBeInTheDocument();
  });

  // jest.runAllTimers();

  await waitFor(() => {
    expect(screen.getByTestId("tokenIncrement")).toHaveTextContent("2"); // This means that the token was refreshed 2 times
  });

  await act(async () => {
    await w8(1000);
  });
});

export {}; // 👈️ if you don't have anything else to export
