import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "shared/store";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import App from "./App";
import OidcProvider from "./auth/oidcProvider";
import theme from "./shared/config/theme/theme";
import GlobalStyle from "./styles/GlobalStyle.styles";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ReduxProvider {...{ store }}>
    <OidcProvider>
      <MuiThemeProvider {...{ theme }}>
        <StyledThemeProvider {...{ theme }}>
          <Router>
            <CssBaseline />
            <GlobalStyle />
            <App />
          </Router>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </OidcProvider>
  </ReduxProvider>,
);
