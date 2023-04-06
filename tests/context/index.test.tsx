import { useContext, useState, useEffect, useMemo } from "react";
import { act } from "react-dom/test-utils";
import {
  EscolaLMSContext,
  EscolaLMSContextProvider,
} from "./../../src/react/context";
import { render, fireEvent, waitFor, screen } from "../test-utils";

import { response as categoriesResponse } from "../test_server/categories";
import { response as configResponse } from "../test_server/config";
import { response as settingsResponse } from "../test_server/settings";
import { response as tagsResponse } from "../test_server/tags";

import "@testing-library/jest-dom";

import fakeServer from "../test_server";

beforeAll(() => {
  fakeServer();
});

const InititalFetches = () => {
  const { fetchSettings, fetchCategories, fetchConfig, fetchTags } =
    useContext(EscolaLMSContext);

  const { settings, categoryTree, config, uniqueTags } =
    useContext(EscolaLMSContext);

  useEffect(() => {
    fetchSettings();
    fetchSettings();
    fetchSettings();
    fetchSettings();
    fetchCategories();
    fetchConfig();
    fetchTags();
  }, [fetchSettings, fetchCategories, fetchConfig, fetchTags]);

  const loading = useMemo(() => {
    return (
      settings.loading &&
      categoryTree.loading &&
      config.loading &&
      uniqueTags.loading
    );
  }, [settings, categoryTree, config, uniqueTags]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>Loaded</div>
      <div data-testid="settings">{JSON.stringify(settings.value)}</div>
      <div data-testid="categoryTree">{JSON.stringify(categoryTree.list)}</div>
      <div data-testid="config">{JSON.stringify(config.value)}</div>
      <div data-testid="tags">{JSON.stringify(uniqueTags.list)}</div>
    </div>
  );
};

it("checks initial fetches", async () => {
  await act(async () => {
    render(<InititalFetches />);
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByTestId("settings")).toHaveTextContent(
      JSON.stringify(settingsResponse.data)
    );
  });
  await waitFor(() => {
    expect(screen.getByTestId("categoryTree")).toHaveTextContent(
      JSON.stringify(categoriesResponse.data)
    );
  });

  await waitFor(() => {
    expect(screen.getByTestId("config")).toHaveTextContent(
      JSON.stringify(configResponse.data)
    );
  });

  await waitFor(() => {
    expect(screen.getByTestId("tags")).toHaveTextContent(
      JSON.stringify(tagsResponse.data)
    );
  });
});

export {}; // 👈️ if you don't have anything else to export
