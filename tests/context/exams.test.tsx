import { useContext, useEffect, act } from "react";

import { EscolaLMSContext } from "./../../src/react/context";
import { render, waitFor, screen, fireEvent } from "../test-utils";
import { response as examsResponse } from "../test_server/exams";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";
import { Login } from "./helpers/login";
import React from "react";
import { Exam } from "../../src/types";

beforeAll(() => {
  fakeServer();
});

const Exams: React.FC = () => {
  const { fetchExams, exams } = useContext(EscolaLMSContext);

  return (
    <div>
      <Login />
      <div>{exams.loading ? "Exams Loading" : "Exams Loaded"}</div>

      <button
        data-testid="button-fetch"
        onClick={() => {
          fetchExams();
        }}
      >
        Fetch
      </button>

      <div>Loaded</div>
      <div data-testid="exam-json">
        {exams.loading ? "Loading..." : JSON.stringify(exams.value, null, 1)}
      </div>
      <div data-testid="exam-title">
        {exams.loading ? "Loading..." : exams.value?.[0]?.title}
      </div>
    </div>
  );
};

it("test fetching exams", async () => {
  await act(async () => {
    render(<Exams />);
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
    expect(screen.queryByText("Exams Loaded")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByTestId("exam-title")).toHaveTextContent(
      examsResponse.data[0].title
    );
  });

  expect(
    JSON.parse(screen.getByTestId("exam-json").innerHTML).map((t: Exam) => t.id)
  ).toEqual(examsResponse.data.map((t) => t.id));
});

export {};
