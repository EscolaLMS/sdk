import { useContext, useState, useEffect, useMemo } from "react";
import { act } from "react-dom/test-utils";
import {
  EscolaLMSContext,
  EscolaLMSContextProvider,
} from "./../../src/react/context";
import { render, fireEvent, waitFor, screen } from "../test-utils";

import "@testing-library/jest-dom";

import fakeServer from "../test_server";

import { dataSuccess } from "../test_server/me";

beforeAll(() => {
  fakeServer();
});

const Login = () => {
  const { login, user } = useContext(EscolaLMSContext);

  return (
    <div>
      <button
        data-testid="button-valid"
        onClick={() => login({ email: "admin@wellms.io", password: "secret" })}
      >
        Login Correct
      </button>
      <button
        data-testid="button-invalid"
        onClick={() =>
          login({ email: "admin@wellms.io", password: "incorrect" })
        }
      >
        Login Correct
      </button>
      <div data-testid="user-data">{JSON.stringify(user)}</div>
      <div data-testid="user-loading">
        {user.loading ? "Loading" : "Loaded"}
      </div>
      {user.error && <div data-testid="user-error">Error</div>}
      {user.value && <div data-testid="user-email">{user.value.email}</div>}
    </div>
  );
};

it("checks login logic", async () => {
  render(<Login />);

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  act(() => {
    fireEvent(
      screen.getByTestId("button-invalid"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText("Error")).toBeInTheDocument();
  });

  act(() => {
    fireEvent(
      screen.getByTestId("button-valid"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  expect(screen.getByTestId("user-email")).toHaveTextContent(
    dataSuccess.data.email
  );

  /*

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  expect(screen.getByTestId("settings")).toHaveTextContent(
    JSON.stringify(settingsResponse.data)
  );
  expect(screen.getByTestId("categoryTree")).toHaveTextContent(
    JSON.stringify(categoriesResponse.data)
  );
  expect(screen.getByTestId("config")).toHaveTextContent(
    JSON.stringify(configResponse.data)
  );
  expect(screen.getByTestId("tags")).toHaveTextContent(
    JSON.stringify(tagsResponse.data)
  );

  */
});

export {}; // 👈️ if you don't have anything else to export
