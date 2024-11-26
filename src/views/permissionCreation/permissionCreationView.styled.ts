import { Lock, Server } from "icons";
import { Row } from "react-bootstrap";
import styled, { css } from "styled-components";

const CardTabWrapper = styled.div`
  display: flex;
`;

const CardTitleWrapper = styled.div``;

const CardNumberWrapper = styled.span`
  display: flex;
  margin-left: 8px;
  font-size: 11px;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 2px;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  color: white;
  background-color: red;
`;

const InfosWrapper = styled(Row)`
  margin: 15px 0 10px 5px;
`;

const ResourceLabelWrapper = styled.div`
  display: flex;
`;

const IconWrapper = css`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

const RoleIcon = styled(Lock)`
  ${IconWrapper}
`;

const ResourceIcon = styled(Server)`
  ${IconWrapper}
  position: relative;
  top: 1px;
`;

const TabsWrapper = styled.div`
  border-top: 1px solid #e9ebec;
`;

export {
  CardTabWrapper,
  CardTitleWrapper,
  CardNumberWrapper,
  InfosWrapper,
  ResourceLabelWrapper,
  RoleIcon,
  ResourceIcon,
  TabsWrapper,
};
