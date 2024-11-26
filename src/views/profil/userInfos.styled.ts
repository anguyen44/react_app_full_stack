import CircleIcon from "@mui/icons-material/Circle";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { boxShadowWrapper } from "styles/cssCustom";

const UserInfosContent = styled(Container)`
  margin: 15px auto;
  height: auto;
  width: 100%;
  ${boxShadowWrapper}
  border-radius: 0.3125rem;
`;

const UserInfosHeader = styled(Row)`
  height: auto;
  background-color: white;
  border-radius: 5px 5px 0px 0px;
`;

const HeaderContentItem = styled.h4`
  margin-top: 25px;
`;

const HeaderContentPageNameWrapper = styled.div`
  float: right;
  font-weight: 400;
  font-size: 1.5rem;
  position: relative;
  margin-right: 100px;
`;

const UserInfosHeaderWrapper = styled.div`
  display: flex;
  height: 100px;
  border-bottom: 1px solid ${(props) => props.theme.palette.enedis.grey["200"]};
`;

const UserInfosHeaderContainer = styled.div`
  margin: 15px 0 0px calc(5% + 50px);
  font-size: 18px;
  color: #808080;
`;

const UserProfilIconeWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  left: 5%;
  top: -70px;
  height: 8rem;
  width: 8rem;
  border-radius: 100%;
  color: ${(props) => props.theme.palette.enedis.grey["600"]};
  background-color: ${(props) => props.theme.palette.enedis.grey["75"]};
`;

const UserInfosHeaderName = styled.div`
  display: flex;
`;

const UserInfosHeaderNNI = styled.span`
  margin-left: 15px;
`;

const UserInfosHeaderEmail = styled.span`
  margin-top: 15px;
  font-size: 14px;
`;

const UserInfosBody = styled(Row)``;

const TabIcon = styled(CircleIcon)`
  color: var(--secondary);
`;

export {
  TabIcon,
  UserInfosBody,
  UserInfosContent,
  UserInfosHeader,
  UserInfosHeaderWrapper,
  UserInfosHeaderContainer,
  UserInfosHeaderEmail,
  UserProfilIconeWrapper,
  UserInfosHeaderName,
  UserInfosHeaderNNI,
  HeaderContentItem,
  HeaderContentPageNameWrapper,
};
