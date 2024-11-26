import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

const UserInfosBasicContainer = styled(Container)`
  margin-top: 1em;
  margin-left: 10px;
`;

const UserInfosRow = styled(Row)`
  font-size: 13px;
  margin: 10px 0 10px 0;
`;

const UserInfosBasicLabel = styled(Col)`
  color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
  font-weight: 600;
`;

const UserInfosBasicData = styled(Col)`
  display: flex;
  width: 40em;
  height: 28px;
  padding: 2px 5px 0 10px;
  border-radius: 2px;
  line-height: 1.42857143;
  & span {
    margin-left: 10px;
  }
`;

const UserInfosClock = styled(WatchLaterIcon)`
  position: relative;
  bottom: 1px;
  color: ${({ theme }) => theme.palette.enedis.grey["600"]};
`;

const UserInfosDesc = styled(StickyNote2Icon)`
  color: ${({ theme }) => theme.palette.enedis.grey["600"]};
  && {
    font-size: 17px;
  }
`;

export {
  UserInfosBasicContainer,
  UserInfosBasicData,
  UserInfosRow,
  UserInfosBasicLabel,
  UserInfosClock,
  UserInfosDesc,
};
