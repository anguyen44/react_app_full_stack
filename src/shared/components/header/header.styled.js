import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { contentWidthMargin } from "styles/cssCustom";

const CustomNavBar = styled(Navbar)`
  &.navbar {
    background-color: ${(props) =>
      props.$modesupermanagerenable
        ? props.theme.palette.enedis.secondary.red["500"]
        : props.theme.palette.enedis.secondary.blue["500"]};
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const MenuNav = styled(Nav)`
  font-weight: 700;
  ${contentWidthMargin}
`;

const MenuContainer = styled(Container)`
  height: auto;
  width: 55rem;
  background-color: ${({ theme }) => theme.palette.enedis.grey["50"]};
`;

const IconWrapper = styled(Col)`
  border-radius: 50%;
  width: 50px;
  padding: 12px;
  justify-content: center;
  background-color: #7faedb;
  background-color: ${({ theme }) => theme.palette.custom.ruddyBlue};
  color: ${({ theme }) => theme.palette.enedis.grey["50"]};
`;

const MenuItemLink = styled(NavLink)`
  color: ${({ theme }) => theme.palette.custom.slateGray};
`;

const MenuItem = styled(Row)`
  padding: 20px;
  size: 14px;
  &:hover ${IconWrapper} {
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["500"]};
    transition-delay: 0.1s;
  }

  &:hover ${MenuItemLink} {
    color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
    transition-delay: 0.15s;
  }
`;

const MenuItemTitle = styled(Row)`
  padding: 15px 20px;
  color: #727f96;
  letter-spacing: 0.4px;
  font-weight: 800;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const MenuItemContent = styled(Col)`
  margin-left: 5px;
  margin-top: 2px;
`;

const ProfilItemLink = styled(Row)`
  display: block;
  color: #727f96;
  padding: 3px 0 5px 10px;

  &:hover {
    color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
    background-color: rgba(36, 139, 192, 0.1019607843);
    cursor: pointer;
    border-radius: 2px;
    transition: 0.3s;
  }

  &:active,
  &:focus {
    background-color: white;
  }
`;

const ItemSubTitle = styled(Row)`
  font-weight: 700;
`;

const ItemDescription = styled(Row)`
  font-size: 13px;
`;

const NavProfil = styled(Nav)`
  margin-right: 20px;
  margin-left: auto;
`;

const LogoWrapper = styled.div`
  width: 5vw;
`;

const LogoNav = styled(Nav)`
  margin-left: 20px;
`;

const ProfilDropDown = styled.div`
  padding: 0 20px 0 20px;
  width: 250px;
`;

export {
  CustomNavBar,
  IconWrapper,
  ItemDescription,
  ItemSubTitle,
  LogoNav,
  LogoWrapper,
  MenuContainer,
  MenuItem,
  MenuItemContent,
  MenuItemLink,
  MenuItemTitle,
  MenuNav,
  NavProfil,
  ProfilDropDown,
  ProfilItemLink,
};
