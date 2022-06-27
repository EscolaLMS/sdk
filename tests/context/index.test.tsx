import { useContext } from "react";
import { act } from "react-dom/test-utils";
import { EscolaLMSContext } from "./../../src/react/context";
import { render, fireEvent, waitFor, screen } from "../test-utils";

import { response as categoriesResponse } from "../test_server/categories";
import { response as configResponse } from "../test_server/config";
import { response as settingsResponse } from "../test_server/settings";
import { response as tagsResponse } from "../test_server/tags";

import "@testing-library/jest-dom";

import fakeServer from "../test_server";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

beforeAll(() => {
  fakeServer();
});

const InititalFetches = () => {
  const { settings, categoryTree, config } = useContext(EscolaLMSContext);

  return (
    <div>
      <div>{config.loading ? "Loading ..." : "Loaded"}</div>
      <div data-testid="settings">{JSON.stringify(settings)}</div>
      <div data-testid="categoryTree">{JSON.stringify(categoryTree)}</div>
      <div data-testid="config">{JSON.stringify(config)}</div>
    </div>
  );
};

it("checks initial fetches", async () => {
  /*
  await act(async () => {
    try {
      render(<InititalFetches />);
    } catch (er) {
      console.log(er);
    }
  });
  */
  render(<InititalFetches />);
  await wait(1000); // wait for the API Response

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  act(() => {
    expect(screen.getByTestId("settings")).toHaveTextContent(
      JSON.stringify(settingsResponse.data)
    );
    expect(screen.getByTestId("categoryTree")).toHaveTextContent(
      JSON.stringify(categoriesResponse.data)
    );
    expect(screen.getByTestId("config")).toHaveTextContent(
      JSON.stringify(configResponse.data)
    );
  });
});

export {}; // 👈️ if you don't have anything else to export
