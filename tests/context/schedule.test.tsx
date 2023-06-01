import { useContext, useEffect } from "react";
import { act } from "react-dom/test-utils";
import { EscolaLMSContext } from "./../../src/react/context";
import { render, waitFor, screen, fireEvent } from "../test-utils";
import { response as scheduleResponse } from "../test_server/schedule";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";
import { Login } from "./helpers/login";

beforeAll(() => {
  fakeServer();
});

const getIds = (schedule: { id: number }[]) =>
  schedule.map((t) => t.id).join(",");

const Schedules: React.FC = () => {
  const { fetchSchedule, schedule } = useContext(EscolaLMSContext);

  return (
    <div>
      <Login />
      <div>{schedule.loading ? "Schedules Loading" : "Schedules Loaded"}</div>

      <button
        data-testid="button-fetch"
        onClick={() => {
          fetchSchedule();
        }}
      >
        Fetch
      </button>
      <div data-testid="schedules">
        {JSON.stringify(schedule.list, null, 1)}
      </div>
    </div>
  );
};

it("test fetching schedule", async () => {
  await act(async () => {
    render(<Schedules />);
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
    expect(screen.queryByText("Schedules Loaded")).toBeInTheDocument();
  });

  await waitFor(() => {
    const schedule =
      (screen.getByTestId("schedules") &&
        screen.getByTestId("schedules").textContent &&
        JSON.parse(screen.getByTestId("schedules").textContent as string)) ||
      [];

    expect(getIds(schedule)).toBe(getIds(scheduleResponse.data));
  });
});

export {}; // 👈️ if you don't have anything else to export
