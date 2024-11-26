import { createGlobalStyle } from "styled-components";

import enedisFontCss from "../fonts/enedis";
import publicSansFontCss from "../fonts/publicSans";
import basesCss from "./base";
import utilsCss from "./utils";
import variablesCss from "./variable";

const GlobalStyle = createGlobalStyle`
  ${enedisFontCss}
  ${publicSansFontCss}
  ${variablesCss}
  ${basesCss}
  ${utilsCss}
`;

export default GlobalStyle;
