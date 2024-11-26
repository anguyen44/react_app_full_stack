import { css } from "styled-components";

const variablesCss = css`
  html {
    --secondary: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
    --tertiary: #bfd7ed;
  }
`;

export default variablesCss;
