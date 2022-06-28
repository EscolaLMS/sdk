import { useContext, useEffect } from "react";
import { act } from "react-dom/test-utils";
import { EscolaLMSContext } from "./../../src/react/context";
import { render, waitFor, screen } from "../test-utils";
import { response as coursesResponse } from "../test_server/courses";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";

beforeAll(() => {
  fakeServer();
});

const getIds = (courses: { id: number }[]) =>
  courses.map((c) => c.id).join(",");

const Courses = ({ filter = {} }) => {
  const { fetchCourses, courses } = useContext(EscolaLMSContext);

  useEffect(() => {
    // TODO: test filters

    fetchCourses(filter);
  }, [filter]);

  if (courses.loading || typeof courses.list === "undefined") {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>Loaded</div>
      <div data-testid="courses">
        {JSON.stringify(courses.list?.data, null, 1)}
      </div>
    </div>
  );
};

it("test fetching courses", async () => {
  await act(async () => {
    const filter = {};
    render(<Courses filter={filter} />);
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  const courses =
    (screen.getByTestId("courses") &&
      screen.getByTestId("courses").textContent &&
      JSON.parse(screen.getByTestId("courses").textContent as string)) ||
    [];

  expect(getIds(courses)).toBe(getIds(coursesResponse.data));
});

export {}; // 👈️ if you don't have anything else to export
