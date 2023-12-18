import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";
import { EscolaLMSContextConfig, EscolaLMSContextReadConfig } from "./types";
import { defaultConfig } from "./defaults";

import { loginPencilSpaces } from "./../../services/pencil_spaces";
import * as API from "./../../types/api";
import { UserContext } from "./user";

export const PencilSpacesContext: React.Context<
  Pick<EscolaLMSContextConfig, "createPencilSpacesLink">
> = createContext({
  createPencilSpacesLink: defaultConfig.createPencilSpacesLink,
});

export interface PencilSpacesContextProviderType {
  apiUrl: string;
  ssrHydration?: boolean;
}

export const PencilSpacesContextProvider: FunctionComponent<
  PropsWithChildren<PencilSpacesContextProviderType>
> = ({ children, apiUrl }) => {
  const { token } = useContext(UserContext);

  const createPencilSpacesLink = useCallback(
    (data: API.PencilSpaces) => {
      return token
        ? loginPencilSpaces(apiUrl, token, data)
        : Promise.reject("noToken");
    },
    [token]
  );

  return (
    <PencilSpacesContext.Provider
      value={{
        createPencilSpacesLink,
      }}
    >
      {children}
    </PencilSpacesContext.Provider>
  );
};
