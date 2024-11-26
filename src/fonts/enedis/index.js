import { css } from "styled-components";

import EnedisBlack from "./Enedis-Black.woff";
import EnedisBlack2 from "./Enedis-Black.woff2";
import EnedisBold from "./Enedis-Bold.woff";
import EnedisBold2 from "./Enedis-Bold.woff2";
import EnedisLight from "./Enedis-Light.woff";
import EnedisLight2 from "./Enedis-Light.woff2";
import EnedisMedium from "./Enedis-Medium.woff";
import EnedisMedium2 from "./Enedis-Medium.woff2";
import EnedisRegular from "./Enedis-Regular.woff";
import EnedisRegular2 from "./Enedis-Regular.woff2";
import EnedisThin from "./Enedis-Thin.woff";
import EnedisThin2 from "./Enedis-Thin.woff2";

const enedisFontCss = css`
  @font-face {
    font-family: "Enedis";
    src:
      url(${EnedisThin2}) format("woff2"),
      url(${EnedisThin}) format("woff");
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: "Enedis";
    src:
      url(${EnedisLight2}) format("woff2"),
      url(${EnedisLight}) format("woff");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "Enedis";
    src:
      url(${EnedisRegular2}) format("woff2"),
      url(${EnedisRegular}) format("woff");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Enedis";
    src:
      url(${EnedisMedium2}) format("woff2"),
      url(${EnedisMedium}) format("woff");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "Enedis";
    src:
      url(${EnedisBold2}) format("woff2"),
      url(${EnedisBold}) format("woff");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "Enedis";
    src:
      url(${EnedisBlack2}) format("woff2"),
      url(${EnedisBlack}) format("woff");
    font-weight: 900;
    font-style: normal;
  }
`;

export default enedisFontCss;
