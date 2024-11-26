import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { render, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setupStore } from "shared/store";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import OidcProvider from "../auth/oidcProvider";
import theme from "../shared/config/theme/theme";
import GlobalStyle from "../styles/GlobalStyle.styles";

export const ReduxProvider = ({ children, store }) => (
  <Provider {...{ store }}>{children}</Provider>
);

export const RouterProvider = ({ children }) => {
  return <Router>{children}</Router>;
};

export const MuiProvider = ({ children }) => {
  return <MuiThemeProvider {...{ theme }}>{children}</MuiThemeProvider>;
};

export const StyledProvider = ({ children }) => {
  return <StyledThemeProvider {...{ theme }}>{children}</StyledThemeProvider>;
};

export const wrapperProvider = ({ children, mockedStore }) => {
  const store = setupStore(mockedStore?.store ?? {});
  return (
    <ReduxProvider {...{ store }}>
      <OidcProvider>
        <StyledProvider>
          <MuiProvider>
            <RouterProvider>
              <CssBaseline />
              <GlobalStyle />
              {children}
            </RouterProvider>
          </MuiProvider>
        </StyledProvider>
      </OidcProvider>
    </ReduxProvider>
  );
};

const wrappedRender = (component, options, mockedStore = {}) =>
  render(component, {
    wrapper: ({ children }) => wrapperProvider({ children, mockedStore }),
    ...options,
  });

const wrappedRenderHook = (hook, options) => {
  return renderHook(hook, {
    wrapper: wrapperProvider,
    ...options,
  });
};

const mockWindowMatchMedia = () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

export {
  mockWindowMatchMedia,
  wrappedRender as render,
  wrappedRenderHook as renderHook,
};
