import goFluenceIcon from "images/enedis_icon.png";

import packageJson from "../../../../package.json";
import {
  CustomImg,
  FooterWrapper,
  GoConfluenceIconFrame,
  SocialIconsWrapper,
  SuivezMoiWrapper,
  VersionInfoWrapper,
} from "./footer.styled";

const Footer = () => {
  return (
    <FooterWrapper>
      <div>
        <VersionInfoWrapper>
          Version: <b>{packageJson.version}</b>
        </VersionInfoWrapper>
      </div>
      <SocialIconsWrapper>
        <SuivezMoiWrapper>Suivez-nous</SuivezMoiWrapper>
        <GoConfluenceIconFrame
          href="https://goconfluence.enedis.fr/display/DOR/The+DOORS%27+home"
          target="_blank"
        >
          <CustomImg src={goFluenceIcon} alt="" />
        </GoConfluenceIconFrame>
      </SocialIconsWrapper>
    </FooterWrapper>
  );
};

export default Footer;
