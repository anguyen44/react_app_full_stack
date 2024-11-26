import {
  ThemeOptions,
  createTheme as createMuiTheme,
} from "@mui/material/styles";

import customColor from "./customColor";
import enedisColor from "./enedisColor";
import muiColor from "./muiColor";

const fontSize = 14;
const fontFamily = '"PublicSans", "Arial", sans-serif';
const coef = fontSize / 18;

const pxToRem = (size) => `${(size / fontSize) * coef}rem`;

export const theme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  palette: {
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: {
      paper: "#fff",
      default: "#fff",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
    ...muiColor,
    ...enedisColor,
    ...customColor,
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    fontFamily,
    fontSize,
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
};

const muiTheme = createMuiTheme(theme as ThemeOptions);

muiTheme.typography.pxToRem = pxToRem;

muiTheme.typography.h1 = {
  ...muiTheme.typography.h1,
  [muiTheme.breakpoints.down("md")]: {
    fontSize: 60,
  },
  [muiTheme.breakpoints.down("sm")]: {
    fontSize: 48,
  },
};

muiTheme.typography.h2 = {
  ...muiTheme.typography.h2,
  [muiTheme.breakpoints.down("md")]: {
    fontSize: 48,
  },
  [muiTheme.breakpoints.down("sm")]: {
    fontSize: 42,
  },
};

muiTheme.typography.h3 = {
  ...muiTheme.typography.h3,
  [muiTheme.breakpoints.down("md")]: {
    fontSize: 36,
  },
  [muiTheme.breakpoints.down("sm")]: {
    fontSize: 32,
  },
};

muiTheme.typography.h4 = {
  ...muiTheme.typography.h4,
  [muiTheme.breakpoints.down("md")]: {
    fontSize: 28,
  },
  [muiTheme.breakpoints.down("sm")]: {
    fontSize: 26,
  },
};

muiTheme.typography.h5 = {
  ...muiTheme.typography.h5,
  [muiTheme.breakpoints.down("md")]: {
    fontSize: 24,
  },
  [muiTheme.breakpoints.down("sm")]: {
    fontSize: 22,
  },
};

muiTheme.typography.h6 = {
  ...muiTheme.typography.h6,
  [muiTheme.breakpoints.down("md")]: {
    fontSize: 20,
  },
  [muiTheme.breakpoints.down("sm")]: {
    fontSize: 18,
  },
};

muiTheme.typography.body1 = {
  ...muiTheme.typography.body1,
  [muiTheme.breakpoints.down("md")]: {
    fontSize: 16,
  },
  [muiTheme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
};

muiTheme.typography.body2 = {
  ...muiTheme.typography.body2,
  [muiTheme.breakpoints.down("md")]: {
    fontSize: 13,
  },
  [muiTheme.breakpoints.down("sm")]: {
    fontSize: 12,
  },
};

muiTheme.typography.caption = {
  ...muiTheme.typography.caption,
  [muiTheme.breakpoints.down("md")]: {
    fontSize: 11,
  },
  [muiTheme.breakpoints.down("sm")]: {
    fontSize: 10,
  },
};

muiTheme.typography.button = {
  ...muiTheme.typography.button,
  [muiTheme.breakpoints.down("lg")]: {
    fontSize: 15,
  },
  [muiTheme.breakpoints.up("lg")]: {
    fontSize: 18,
  },
};

export default muiTheme;
