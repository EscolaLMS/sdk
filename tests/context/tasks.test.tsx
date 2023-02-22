import { useContext, useEffect, useMemo } from 'react';
import { act } from 'react-dom/test-utils';
import { Login } from './helpers/login';

import {
  EscolaLMSContext,
  EscolaLMSContextProvider,
} from './../../src/react/context';
import {
  render,
  waitFor,
  screen,
  getAllByRole,
  fireEvent,
} from '../test-utils';
import {
  response as tasksResponse,
  oneTaskResponse,
} from '../test_server/tasks';
import '@testing-library/jest-dom';

import fakeServer from '../test_server';

beforeAll(() => {
  fakeServer();
});

const Tasks = () => {
  const { tasks, fetchTasks, user /*, page, fetchPage */ } =
    useContext(EscolaLMSContext);

  useEffect(() => {
    user && user.value && fetchTasks({ current: 0 });
  }, [user]);

  /*
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
  */

  return (
    <div>
      <Login />
      {/*<p>{page.loading ? "Page Loading" : "Page Loaded"}</p>*/}
      <p>{tasks.loading ? 'Tasks Loading' : 'Tasks Loaded'}</p>

      <p data-testid="loadedTasks">{tasks.list?.data.length}</p>

      {/* 
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
                  */}
    </div>
  );
};

it('test fetching tasks', async () => {
  await act(async () => {
    render(<Tasks />);
  });

  act(() => {
    fireEvent(
      screen.getByTestId('button-login'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.getByTestId('user-token-expire-date')).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText('Tasks Loaded')).toBeInTheDocument();
  });

  /*

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

  */

  await waitFor(() => {
    expect(screen.getByTestId('loadedTasks')).toHaveTextContent(
      tasksResponse.data.length.toString()
    );
  });
});

export {}; // 👈️ if you don't have anything else to export
