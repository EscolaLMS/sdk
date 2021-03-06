import React, { FC, ReactElement, PropsWithChildren } from "react";
import { render, RenderOptions, act } from "@testing-library/react";
import { EscolaLMSContextProvider } from "../src/react/context/index";

const AllTheProviders: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <EscolaLMSContextProvider
      apiUrl="http://api.localhost"
      initialFetch={false}
    >
      {children}
    </EscolaLMSContextProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { render as unwrappedRender };
export { customRender as render };
