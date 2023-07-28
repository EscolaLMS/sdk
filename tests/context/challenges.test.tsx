import React from "react";
import { useContext, useEffect } from "react";
import { act } from "react-dom/test-utils";
import { EscolaLMSContext, EscolaLMSContextProvider } from "../../src/react";
import { waitFor, screen, unwrappedRender } from "../test-utils";
import { response as challengesResponse } from "../test_server/challenges";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";

beforeAll(() => {
  fakeServer();
});

const getIds = (challenges: { id: number }[]) =>
  challenges.map((c) => c.id).join(",");

const ChallengesWithDefaults = () => {
  const { challenges } = useContext(EscolaLMSContext);

  return (
    <div>
      <ul>
        {challenges.list?.data.map((challenge) => (
          <li key={challenge.id}>{challenge.name}</li>
        ))}
      </ul>
    </div>
  );
};

const Challenges = () => {
  const { fetchChallenges, challenges } = useContext(EscolaLMSContext);

  useEffect(() => {
    !challenges && fetchChallenges({});
  }, []);

  if (challenges.loading || typeof challenges.list === "undefined") {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>Loaded</div>
      <nav>
        <div data-testid="page">{challenges.list?.meta.current_page}</div>
      </nav>
      <div data-testid="challenges">
        {JSON.stringify(challenges.list?.data, null, 1)}
      </div>
    </div>
  );
};

it("test fetching challenges", async () => {
  await act(async () => {
    unwrappedRender(
      <EscolaLMSContextProvider
        apiUrl="http://api.localhost"
        initialFetch={false}
        defaults={{
          challenges: {
            loading: false,
            list: challengesResponse,
          },
        }}
      >
        <Challenges />
      </EscolaLMSContextProvider>
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  const challenges =
    (screen.getByTestId("challenges") &&
      screen.getByTestId("challenges").textContent &&
      JSON.parse(screen.getByTestId("challenges").textContent as string)) ||
    [];

  expect(getIds(challenges)).toBe(getIds(challengesResponse.data));
});

it("test default params challenges", async () => {
  unwrappedRender(
    <EscolaLMSContextProvider
      apiUrl="http://api.localhost"
      initialFetch={false}
      defaults={{
        challenges: {
          loading: false,
          list: challengesResponse,
        },
      }}
    >
      <ChallengesWithDefaults />
    </EscolaLMSContextProvider>
  );

  await waitFor(() => {
    expect(
      screen.queryByText(challengesResponse.data[0].name)
    ).toBeInTheDocument();
  });
});

export {}; // 👈️ if you don't have anything else to export
