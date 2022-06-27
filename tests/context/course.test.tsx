import { useContext, useEffect } from "react";
import { act } from "react-dom/test-utils";
import { EscolaLMSContext } from "./../../src/react/context";
import { render, waitFor, screen } from "../test-utils";
import { response as courseResponse } from "../test_server/course";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";

beforeAll(() => {
  fakeServer();
});

const Course: React.FC<{ id: number }> = ({ id }) => {
  const { fetchCourse, course } = useContext(EscolaLMSContext);

  useEffect(() => {
    fetchCourse(id);
  }, [id]);

  if (course.loading) {
    return <div>Loading</div>;
  }

  const courseById = course.byId && course.byId[id];

  return (
    <div>
      <div>Loaded</div>
      <div data-testid="course-json">
        {JSON.stringify(course.value, null, 1)}
      </div>
      <div data-testid="course-title">{course.value?.title}</div>
      <div data-testid="course-byid-title">aaa{courseById?.value?.title}</div>
    </div>
  );
};

it("test fetching course ", async () => {
  await act(async () => {
    render(<Course id={1} />);
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  expect(screen.getByTestId("course-title")).toHaveTextContent(
    courseResponse.data.title
  );

  expect(screen.getByTestId("course-byid-title")).toHaveTextContent(
    courseResponse.data.title
  );

  expect(JSON.parse(screen.getByTestId("course-json").innerHTML).title).toBe(
    courseResponse.data.title
  );
});

export {}; // 👈️ if you don't have anything else to export
