import styled from "styled-components";

const FooterWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: none;
  height: 56px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 4.9px 0.1px rgba(144, 137, 137, 0.5);
  font-size: 12px;
  line-height: 2.17;
  letter-spacing: 0.2px;
  position: relative;
  left: 0;
  bottom: 0;
`;

const FooterLink = styled.a`
  font-size: 12px;
  line-height: 2.17;
  letter-spacing: 0.2px;
  text-align: center;
  margin: 0 8px;
  text-decoration: underline;
  color: #242424;
  cursor: pointer;
`;

const VersionInfoWrapper = styled.span`
  margin-left: 6px;
`;

const SocialIconsWrapper = styled.div`
  position: absolute;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoConfluenceIconFrame = styled.a`
  cursor: pointer;
  height: 40px;
  border-radius: 5px;
`;

const SuivezMoiWrapper = styled.span`
  margin-right: 5px;
`;

const CustomImg = styled.img`
  display: block;
`;

const VerticalDivider = styled.span`
  margin: 0 4px 0 4px;
`;

export {
  CustomImg,
  FooterLink,
  FooterWrapper,
  GoConfluenceIconFrame,
  SocialIconsWrapper,
  SuivezMoiWrapper,
  VersionInfoWrapper,
  VerticalDivider,
};
