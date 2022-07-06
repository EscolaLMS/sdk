import { useContext, useEffect } from "react";
import { act } from "react-dom/test-utils";
import { EscolaLMSContext } from "./../../src/react/context";
import { render, waitFor, screen } from "../test-utils";
import { response as tutorsResponse } from "../test_server/tutors";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";

beforeAll(() => {
  fakeServer();
});

const getIds = (tutors: { id: number }[]) =>
  tutors.map((t) => t.id).join(",");

const Tutors = () => {
  const { tutors, fetchTutors } = useContext(EscolaLMSContext);

  useEffect(() => {
    fetchTutors();
  }, []);

  if (tutors.loading || typeof tutors.list === "undefined") {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>Loaded</div>
      <div data-testid="tutors">
        {JSON.stringify(tutors.list, null, 1)}
      </div>
    </div>
  );
}

it("test fetching tutors", async () => {
  await act(async () => {
    render(<Tutors/>);
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  const tutors =
    (screen.getByTestId("tutors") &&
      screen.getByTestId("tutors").textContent &&
      JSON.parse(screen.getByTestId("tutors").textContent as string)) ||
    [];

  expect(getIds(tutors)).toBe(getIds(tutorsResponse.data));
});

export {}; // 👈️ if you don't have anything else to export