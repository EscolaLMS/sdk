import { useContext, useEffect, useMemo } from "react";
import { act } from "react-dom/test-utils";
import {
  EscolaLMSContext,
  EscolaLMSContextProvider,
} from "./../../src/react/context";
import {
  render,
  waitFor,
  screen,
  getAllByRole,
  fireEvent,
} from "../test-utils";
import {
  response as pagesResponse,
  onePageResponse,
} from "../test_server/pages";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";

beforeAll(() => {
  fakeServer();
});

const Pages = () => {
  const { pages, fetchPages, page, fetchPage } = useContext(EscolaLMSContext);

  useEffect(() => {
    fetchPages();
  }, []);

  const loadedPages = useMemo(() => {
    let n = 0;
    if (page.byId) {
      for (const [key, value] of Object.entries(page.byId)) {
        if (!value.loading) {
          n++;
        }
      }
    }
    return n;
  }, [page]);

  return (
    <div>
      <p>{page.loading ? "Page Loading" : "Page Loaded"}</p>
      <p>{pages.loading ? "Pages Loading" : "Pages Loaded"}</p>

      <p data-testid="loadedPages">{loadedPages}</p>

      <ul>
        {pages.list?.data.map((pageEl) => (
          <li key={pageEl.id}>
            <button onClick={() => fetchPage(pageEl.slug)}>
              {pageEl.title}
            </button>

            <article>
              <h1>{pageEl.title}</h1>
              {page.byId &&
                page.byId[pageEl.slug] &&
                (page.byId[pageEl.slug].loading
                  ? "PageById Loading"
                  : page.byId[pageEl.slug].value?.content && (
                      <main data-testid={pageEl.slug}>
                        {page.byId[pageEl.slug].value?.content}
                      </main>
                    ))}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

it("test fetching pages", async () => {
  await act(async () => {
    render(<Pages />);
  });

  await waitFor(() => {
    expect(screen.queryByText("Pages Loaded")).toBeInTheDocument();
  });

  const buttons = screen.getAllByRole("button");

  act(() => {
    buttons.forEach((btn) => {
      fireEvent(
        btn,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    });
  });

  await waitFor(() => {
    expect(screen.queryByText("Page Loaded")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByTestId("loadedPages")).toHaveTextContent(
      pagesResponse.data.length.toString()
    );
  });

  await waitFor(() => {
    pagesResponse.data.map((page) =>
      expect(screen.getByTestId(page.slug)).toBeInTheDocument()
    );
  });
});

export {}; // 👈️ if you don't have anything else to export
