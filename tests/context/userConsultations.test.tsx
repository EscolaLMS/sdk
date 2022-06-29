import { useContext, useEffect } from "react";
import { act } from "react-dom/test-utils";
import { EscolaLMSContext } from "./../../src/react/context";
import { render, waitFor, screen, fireEvent } from "../test-utils";
import { response as courseResponse } from "../test_server/course";
import { Login } from "./helpers/login";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";

beforeAll(() => {
  fakeServer();
});

const UserConsultations: React.FC = () => {
  const { fetchUserConsultations, consultations } =
    useContext(EscolaLMSContext);

  return (
    <div>
      <Login />
      <div>
        {consultations.loading
          ? "Consultations Loading"
          : "Consultations Loaded"}
      </div>

      <button
        data-testid="button-fetch"
        onClick={() => {
          fetchUserConsultations();
          //fetchUserConsultations();
          //fetchUserConsultations();
        }}
      >
        Fetch
      </button>
      <div data-testid="consultations-data">
        {JSON.stringify(consultations)}
      </div>
    </div>
  );
};

it("test fetching course ", async () => {
  render(<UserConsultations />);

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

  act(() => {
    fireEvent(
      screen.getByTestId("button-fetch"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Consultations Loaded")).toBeInTheDocument();
  });

  expect(screen.getByTestId("consultations-data")).toHaveTextContent("bar2");

  act(() => {
    fireEvent(
      screen.getByTestId("button-fetch"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Consultations Loaded")).toBeInTheDocument();
  });

  expect(screen.getByTestId("consultations-data")).toHaveTextContent("bar1");

  act(() => {
    fireEvent(
      screen.getByTestId("button-fetch"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Consultations Loaded")).toBeInTheDocument();
  });

  expect(screen.getByTestId("consultations-data")).toHaveTextContent("bar2");
});

export {}; // 👈️ if you don't have anything else to export
