import { useContext, useEffect } from "react";
import { act } from "react-dom/test-utils";
import {
  EscolaLMSContext,
  EscolaLMSContextProvider,
} from "./../../src/react/context";
import { render, waitFor, screen, unwrappedRender } from "../test-utils";
import { response as webinarsResponse } from "../test_server/webinars";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";

beforeAll(() => {
  fakeServer();
});

const getIds = (webinars: { id: number }[]) =>
  webinars.map((w) => w.id).join(",");

const Webinars = ({ filter = {} }) => {
  const { webinars, fetchWebinars } = useContext(EscolaLMSContext);

  useEffect(() => {
    fetchWebinars(filter);
  }, [filter]);

  if (webinars.loading || typeof webinars.list === "undefined") {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>Loaded</div>
      <div data-testid="webinars">{JSON.stringify(webinars.list, null, 1)}</div>
    </div>
  );
};

it("test fetching webinars", async () => {
  await act(async () => {
    const filter = {};
    render(<Webinars filter={filter} />);
  });

  await waitFor(() => expect(screen.getByText("Loaded")).toBeInTheDocument());

  const webinars =
    (screen.getByTestId("webinars") &&
      screen.getByTestId("webinars").textContent &&
      JSON.parse(screen.getByTestId("webinars").textContent as string)) ||
    [];

  expect(getIds(webinars)).toBe(getIds(webinarsResponse.data));
});

it("test fetching webinars with filter", async () => {
  const filter = {
    per_page: 2,
  };

  await act(async () => {
    render(<Webinars filter={filter} />);
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  const webinars =
    (screen.getByTestId("webinars") &&
      screen.getByTestId("webinars").textContent &&
      JSON.parse(screen.getByTestId("webinars").textContent as string)) ||
    [];

  expect(webinars.length).toBe(2);
});

export {}; // 👈️ if you don't have anything else to export
