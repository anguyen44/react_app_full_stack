import { css } from "styled-components";

import PublicSansBlack from "./PublicSans-Black.woff";
import PublicSansBlack2 from "./PublicSans-Black.woff2";
import PublicSansBlackItalic from "./PublicSans-BlackItalic.woff";
import PublicSansBlackItalic2 from "./PublicSans-BlackItalic.woff2";
import PublicSansBold from "./PublicSans-Bold.woff";
import PublicSansBold2 from "./PublicSans-Bold.woff2";
import PublicSansBoldItalic from "./PublicSans-BoldItalic.woff";
import PublicSansBoldItalic2 from "./PublicSans-BoldItalic.woff2";
import PublicSansExtraBold from "./PublicSans-ExtraBold.woff";
import PublicSansExtraBold2 from "./PublicSans-ExtraBold.woff2";
import PublicSansExtraBoldItalic from "./PublicSans-ExtraBoldItalic.woff";
import PublicSansExtraBoldItalic2 from "./PublicSans-ExtraBoldItalic.woff2";
import PublicSansExtraLight from "./PublicSans-ExtraLight.woff";
import PublicSansExtraLight2 from "./PublicSans-ExtraLight.woff2";
import PublicSansExtraLightItalic from "./PublicSans-ExtraLightItalic.woff";
import PublicSansExtraLightItalic2 from "./PublicSans-ExtraLightItalic.woff2";
import PublicSansItalic from "./PublicSans-Italic.woff";
import PublicSansItalic2 from "./PublicSans-Italic.woff2";
import PublicSansLight from "./PublicSans-Light.woff";
import PublicSansLight2 from "./PublicSans-Light.woff2";
import PublicSansLightItalic from "./PublicSans-LightItalic.woff";
import PublicSansLightItalic2 from "./PublicSans-LightItalic.woff2";
import PublicSansMedium from "./PublicSans-Medium.woff";
import PublicSansMedium2 from "./PublicSans-Medium.woff2";
import PublicSansMediumItalic from "./PublicSans-MediumItalic.woff";
import PublicSansMediumItalic2 from "./PublicSans-MediumItalic.woff2";
import PublicSansRegular from "./PublicSans-Regular.woff";
import PublicSansRegular2 from "./PublicSans-Regular.woff2";
import PublicSansSemiBold from "./PublicSans-SemiBold.woff";
import PublicSansSemiBold2 from "./PublicSans-SemiBold.woff2";
import PublicSansSemiBoldItalic from "./PublicSans-SemiBoldItalic.woff";
import PublicSansSemiBoldItalic2 from "./PublicSans-SemiBoldItalic.woff2";
import PublicSansThin from "./PublicSans-Thin.woff";
import PublicSansThin2 from "./PublicSans-Thin.woff2";
import PublicSansThinItalic from "./PublicSans-ThinItalic.woff";
import PublicSansThinItalic2 from "./PublicSans-ThinItalic.woff2";

const publicSansFontCss = css`
  @font-face {
    font-family: "PublicSans";
    font-style: normal;
    font-weight: 400;
    src:
      url(${PublicSansRegular2}) format("woff2"),
      url(${PublicSansRegular}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: italic;
    font-weight: 400;
    src:
      url(${PublicSansItalic2}) format("woff2"),
      url(${PublicSansItalic}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: normal;
    font-weight: 100;
    src:
      url(${PublicSansThin2}) format("woff2"),
      url(${PublicSansThin}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: italic;
    font-weight: 100;
    src:
      url(${PublicSansThinItalic2}) format("woff2"),
      url(${PublicSansThinItalic}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: normal;
    font-weight: 200;
    src:
      url(${PublicSansExtraLight2}) format("woff2"),
      url(${PublicSansExtraLight}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: italic;
    font-weight: 200;
    src:
      url(${PublicSansExtraLightItalic2}) format("woff2"),
      url(${PublicSansExtraLightItalic}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: normal;
    font-weight: 300;
    src:
      url(${PublicSansLight2}) format("woff2"),
      url(${PublicSansLight}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: italic;
    font-weight: 300;
    src:
      url(${PublicSansLightItalic2}) format("woff2"),
      url(${PublicSansLightItalic}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: normal;
    font-weight: 500;
    src:
      url(${PublicSansMedium2}) format("woff2"),
      url(${PublicSansMedium}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: italic;
    font-weight: 500;
    src:
      url(${PublicSansMediumItalic2}) format("woff2"),
      url(${PublicSansMediumItalic}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: normal;
    font-weight: 600;
    src:
      url(${PublicSansSemiBold2}) format("woff2"),
      url(${PublicSansSemiBold}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: italic;
    font-weight: 600;
    src:
      url(${PublicSansSemiBoldItalic2}) format("woff2"),
      url(${PublicSansSemiBoldItalic}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: normal;
    font-weight: 700;
    src:
      url(${PublicSansBold2}) format("woff2"),
      url(${PublicSansBold}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: italic;
    font-weight: 700;
    src:
      url(${PublicSansBoldItalic2}) format("woff2"),
      url(${PublicSansBoldItalic}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: normal;
    font-weight: 800;
    src:
      url(${PublicSansExtraBold2}) format("woff2"),
      url(${PublicSansExtraBold}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: italic;
    font-weight: 800;
    src:
      url(${PublicSansExtraBoldItalic2}) format("woff2"),
      url(${PublicSansExtraBoldItalic}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: normal;
    font-weight: 900;
    src:
      url(${PublicSansBlack2}) format("woff2"),
      url(${PublicSansBlack}) format("woff");
  }
  @font-face {
    font-family: "PublicSans";
    font-style: italic;
    font-weight: 900;
    src:
      url(${PublicSansBlackItalic2}) format("woff2"),
      url(${PublicSansBlackItalic}) format("woff");
  }
`;

export default publicSansFontCss;
