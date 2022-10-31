import { useContext, useEffect } from "react";
import { act } from "react-dom/test-utils";
import {
  EscolaLMSContext,
  EscolaLMSContextProvider,
} from "./../../src/react/context";
import { waitFor, screen, unwrappedRender } from "../test-utils";
import {
  response as coursesResponse,
  filteredCoursesResponse,
} from "../test_server/courses";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";

beforeAll(() => {
  fakeServer();
});

const getIds = (courses: { id: number }[]) =>
  courses.map((c) => c.id).join(",");

const CoursesWithDefaults = () => {
  const { courses } = useContext(EscolaLMSContext);

  return (
    <div>
      <ul>
        {courses.list?.data.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

const Courses = ({ filter = {} }) => {
  const { fetchCourses, courses } = useContext(EscolaLMSContext);

  useEffect(() => {
    !courses && fetchCourses(filter);
  }, [filter]);

  if (courses.loading || typeof courses.list === "undefined") {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>Loaded</div>
      <nav>
        <div data-testid="page">{courses.list?.meta.current_page}</div>
      </nav>
      <div data-testid="courses">
        {JSON.stringify(courses.list?.data, null, 1)}
      </div>
    </div>
  );
};

it("test fetching courses", async () => {
  await act(async () => {
    const filter = {};
    unwrappedRender(
      <EscolaLMSContextProvider
        apiUrl="http://api.localhost"
        initialFetch={false}
        defaults={{
          courses: {
            loading: false,
            // TODO: remove this line and fix API types to match actual real responses
            //@ts-ignore
            list: coursesResponse,
          },
        }}
      >
        <Courses filter={filter} />
      </EscolaLMSContextProvider>
    );
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

it("test fetching courses with filter", async () => {
  const filter = { page: 3 };

  await act(async () => {
    unwrappedRender(
      <EscolaLMSContextProvider
        apiUrl="http://api.localhost"
        initialFetch={false}
        defaults={{
          courses: {
            loading: false,
            // TODO: remove this line and fix API types to match actual real responses
            //@ts-ignore
            list: filteredCoursesResponse,
          },
        }}
      >
        <Courses filter={filter} />
      </EscolaLMSContextProvider>
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  expect(screen.getByTestId("page")).toHaveTextContent(filter.page.toString());
});

it("test default params courses", async () => {
  unwrappedRender(
    <EscolaLMSContextProvider
      apiUrl="http://api.localhost"
      initialFetch={false}
      defaults={{
        courses: {
          loading: false,
          // TODO: remove this line and fix API types to match actual real responses
          //@ts-ignore
          list: coursesResponse,
        },
      }}
    >
      <CoursesWithDefaults />
    </EscolaLMSContextProvider>
  );

  await waitFor(() => {
    expect(
      screen.queryByText(coursesResponse.data[0].title)
    ).toBeInTheDocument();
  });
});

export {}; // 👈️ if you don't have anything else to export
