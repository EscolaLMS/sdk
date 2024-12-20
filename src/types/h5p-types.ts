import { PageParams, PaginatedList, PaginationParams } from "./core-types";

type Dict = {
  [key: string]: string | Dict;
};

export type H5PObject = {
  baseUrl: string;
  url: string;
  postUserStatistics: boolean;
  ajax: { setFinished: string; contentUserData: string };
  saveFreq: boolean;
  siteUrl: string;
  l10n: Dict;
  hubIsEnabled: boolean;
  loadedJs: string[];
  loadedCss: string[];
  core: {
    styles: string[];
    scripts: string[];
  };
  editor?: {
    filesPath: string;
    fileIcon: { path: string; width: number; height: number };
    ajaxPath: string;
    libraryUrl: string;
    copyrightSemantics: Dict;
    metadataSemantics: Dict[];

    assets: {
      css: string[];
      js: string[];
    };
    deleteMessage: string;
    apiVersion: { majorVersion: number; minorVersion: number };
  };
  nonce: string;
  contents?: Record<
    string,
    {
      library: string;
      jsonContent: string;
      fullScreen: boolean;
      title: string;
      content: {
        id: number;
        library: {
          id: number;
          embedTypes: string;
          name: string;
        };
      };
      contentUserData: [
        {
          state: object;
        }
      ];
    }
  >;
};

export type H5PLibrary = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  title: string;
  runnable: number;
  restricted: number;
  fullscreen: number;
  embed_types: string;
  semantics: object;
  machineName: string;
  uberName: string;
  majorVersion: string;
  minorVersion: string;
  patchVersion: string;
  preloadedJs: string;
  preloadedCss: string;
  dropLibraryCss: string;
  tutorialUrl: string;
  hasIcon: string;
  libraryId: number;
};

export type H5PContent = {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  user_id: string | number;
  title: string;
  library_id: string;
  parameters: string;
  filtered: string;
  slug: string;
  embed_type: string;
  params: object;
  metadata: object;
  library: H5PLibrary;
  nonce: string;
};

export type H5PContentList = PaginatedList<H5PContent>;

export type H5PContentListItem = H5PContent;

export type H5PContentParams = PageParams & PaginationParams;
