import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from 'react';
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextPaginatedMetaState,
} from './types';
import { defaultConfig } from './defaults';
import { fetchDataType } from './states';

import { useLocalStorage } from '../hooks/useLocalStorage';
import * as API from './../../types/api';
import { getDefaultData } from './index';

import {
  bookmarkNotes as getBookmarkNotes,
  createBookmarkNote as postCreateBookmarkNote,
  deleteBookmarkNote as deleteDeleteBookmarkNote,
  updateBookmarkNote as patchUpdateBookmarkNote,
} from './../../services/bookmarks_notes';
import { UserContext } from './user';

export const BookmarkNotesContext: React.Context<
  Pick<
    EscolaLMSContextConfig,
    | 'bookmarkNotes'
    | 'fetchBookmarkNotes'
    | 'createBookmarkNote'
    | 'deleteBookmarkNote'
    | 'updateBookmarkNote'
  >
> = createContext({
  bookmarkNotes: defaultConfig.bookmarkNotes,
  fetchBookmarkNotes: defaultConfig.fetchBookmarkNotes,
  createBookmarkNote: defaultConfig.createBookmarkNote,
  deleteBookmarkNote: defaultConfig.deleteBookmarkNote,
  updateBookmarkNote: defaultConfig.updateBookmarkNote,
});

export interface BookmarkNotesContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, 'bookmarkNotes'>>;
  ssrHydration?: boolean;
}

export const BookmarkNotesContextProvider: FunctionComponent<
  PropsWithChildren<BookmarkNotesContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const { token } = useContext(UserContext);

  useEffect(() => {
    if (defaults) {
      defaults.bookmarkNotes !== null &&
        setBookmarkNotes({
          loading: false,
          list: defaults.bookmarkNotes?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [bookmarkNotes, setBookmarkNotes] = useLocalStorage<
    ContextPaginatedMetaState<API.BookmarkNote>
  >(
    'lms',
    'bookmarkNotes',
    getDefaultData('bookmarkNotes', {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const fetchBookmarkNotes = useCallback(
    (filter: API.BookmarkNoteParams = { page: 0, per_page: 25 }) => {
      return token
        ? fetchDataType<API.BookmarkNote>({
            controllers: abortControllers.current,
            controller: `bookmarkNotes/${JSON.stringify(filter)}`,
            mode: 'paginated',
            fetchAction: getBookmarkNotes.bind(null, apiUrl)(token, filter, {
              signal:
                abortControllers.current[
                  `bookmarkNotes/${JSON.stringify(filter)}`
                ]?.signal,
            }),
            setState: setBookmarkNotes,
          })
        : Promise.reject('noToken');
    },
    [token]
  );

  const createBookmarkNote = useCallback(
    (data: EscolaLms.Bookmarks.Http.Requests.CreateBookmarkRequest) => {
      return token
        ? postCreateBookmarkNote(apiUrl, token, data)
        : Promise.reject('noToken');
    },
    [token]
  );

  const deleteBookmarkNote = useCallback(
    (id: number) => {
      // TODO: remove note on list and byID once it fine
      // TODO: what about error ?
      return token
        ? deleteDeleteBookmarkNote(apiUrl, token, id)
        : Promise.reject('noToken');
    },
    [token]
  );

  const updateBookmarkNote = useCallback(
    (
      id: number,
      data: EscolaLms.Bookmarks.Http.Requests.UpdateBookmarkRequest
    ) => {
      // TODO: remove note on list and byID once it fine
      // TODO: what about error ?
      return token
        ? patchUpdateBookmarkNote(apiUrl, token, id, data)
        : Promise.reject('noToken');
    },
    [token]
  );

  return (
    <BookmarkNotesContext.Provider
      value={{
        bookmarkNotes,
        fetchBookmarkNotes,
        createBookmarkNote,
        deleteBookmarkNote,
        updateBookmarkNote,
      }}
    >
      {children}
    </BookmarkNotesContext.Provider>
  );
};
