import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextPaginatedMetaState,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "./../../types/api";
import { getDefaultData } from "./index";
import { consultations as getConsultations } from "./../../services/consultations";

export const ConsultationsContext: React.Context<
  Pick<EscolaLMSContextConfig, "consultations" | "fetchConsultations">
> = createContext({
  consultations: defaultConfig.consultations,
  fetchConsultations: defaultConfig.fetchConsultations,
});

export interface ConsultationsContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "consultations">>;
}

export const ConsultationsContextProvider: FunctionComponent<
  PropsWithChildren<ConsultationsContextProviderType>
> = ({ children, defaults, apiUrl }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  useEffect(() => {
    if (defaults) {
      defaults.consultations !== null &&
        setConsultations({
          loading: false,
          list: defaults.consultations?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const [consultations, setConsultations] = useLocalStorage<
    ContextPaginatedMetaState<API.Consultation>
  >(
    "lms",
    "consultations",
    getDefaultData("consultations", {
      ...defaultConfig,
      ...defaults,
    })
  );

  const fetchConsultations = useCallback((filter: API.ConsultationParams) => {
    return fetchDataType<API.Consultation>({
      controllers: abortControllers.current,
      controller: `consultations/${JSON.stringify(filter)}`,
      mode: "paginated",
      fetchAction: getConsultations.bind(null, apiUrl)(
        filter,

        {
          signal:
            abortControllers.current[`consultations/${JSON.stringify(filter)}`]
              ?.signal,
        }
      ),
      setState: setConsultations,
    });
  }, []);

  return (
    <ConsultationsContext.Provider
      value={{
        consultations,
        fetchConsultations,
      }}
    >
      {children}
    </ConsultationsContext.Provider>
  );
};
