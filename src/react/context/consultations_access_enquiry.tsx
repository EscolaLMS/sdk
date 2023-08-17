import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextStateValue,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "./../../types/api";
import { getDefaultData } from "./index";

import { consultationAccessEnquiry as getConsultationAccessEnquiry } from "./../../services/consultations_access_enquiry";
import { UserContext } from "./user";

export const ConsultationsAccessEnquiryContext = createContext<
  Pick<
    EscolaLMSContextConfig,
    "consultationAccessEnquiry" | "fetchConsultationAccessEnquiry"
  >
>({
  consultationAccessEnquiry: defaultConfig.consultationAccessEnquiry,
  fetchConsultationAccessEnquiry: defaultConfig.fetchConsultationAccessEnquiry,
});

export interface ConsultationsAccessEnquiryContextProviderType {
  apiUrl: string;
  defaults?: Partial<
    Pick<EscolaLMSContextReadConfig, "consultationAccessEnquiry">
  >;
  ssrHydration?: boolean;
}

export const ConsultationAccessEnquiryContextProvider: FunctionComponent<
  PropsWithChildren<ConsultationsAccessEnquiryContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const { token } = useContext(UserContext);

  useEffect(() => {
    if (defaults) {
      defaults.consultationAccessEnquiry !== null &&
        setConsultationAccessEnquiry({
          loading: false,
          value: defaults.consultationAccessEnquiry?.value,
          byId: defaults.consultationAccessEnquiry?.byId,
          error: undefined,
        });
    }
  }, [defaults]);

  const [consultationAccessEnquiry, setConsultationAccessEnquiry] =
    useLocalStorage<ContextStateValue<API.ConsultationsAccessEnquiry>>(
      "lms",
      "consultationAccessEnquiry",
      getDefaultData("consultationAccessEnquiry", {
        ...defaultConfig,
        ...defaults,
      }),
      ssrHydration
    );

  const fetchConsultationAccessEnquiry = useCallback(
    (enquiryId: number) => {
      return token
        ? fetchDataType<API.ConsultationsAccessEnquiry>({
            controllers: abortControllers.current,
            controller: `consultationAccessEnquiry${enquiryId}`,
            mode: "value",
            id: enquiryId,
            fetchAction: getConsultationAccessEnquiry.bind(null, apiUrl)(
              token,
              enquiryId,
              {
                signal:
                  abortControllers.current[
                    `consultationAccessEnquiry${enquiryId}`
                  ]?.signal,
              }
            ),
            setState: setConsultationAccessEnquiry,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  return (
    <ConsultationsAccessEnquiryContext.Provider
      value={{
        consultationAccessEnquiry,
        fetchConsultationAccessEnquiry,
      }}
    >
      {children}
    </ConsultationsAccessEnquiryContext.Provider>
  );
};
