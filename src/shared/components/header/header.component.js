import {
  BsFileRuledFill,
  BsFillPerson,
  BsPeopleFill,
  BsQuestionFill,
  ConnectWithoutContact,
  FaPersonPlusFill,
  FaSearch,
  FaServer,
} from "icons";
import logo from "images/The-Doors-Logo-white.png";
import { Col, NavDropdown, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { CHANGE_PASSWORD_PATH } from "shared/config/constants/iodc.config";
import MESSAGES from "shared/config/constants/message.config";
import {
  DASHBOARD_PATH,
  PORTFOLIOS_PATH,
  ROLES_PATH,
  TEAMS_PATH,
  USER_AUTORIZATIONS,
  USER_CASES_PATH,
  USER_INFOS_PATH,
} from "shared/config/constants/path.config";
import { header } from "shared/config/constants/selenium.config";
import { logoutActionSaga } from "shared/store/sagas/oidc.saga";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";

import CustomNavDropDown from "../CustomNavDropDown/CustomNavDropDown";
import AdminBadgeAuthentification from "./adminBadge/adminBadge";
import {
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
} from "./header.styled";

const Header = () => {
  const user = useSelector((state) => state.userReducer.user);
  const userName = `${user?.givenName} ${user?.name}`;

  const { modeSuperManagerEnable } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const { dispatchAlertInfo } = useAlertCard();

  const handleLogout = () => dispatch(logoutActionSaga());

  const onNavigateTo = (e, path) => {
    e.preventDefault();
    window.location.href = path;
  };

  const onClickUnvailablePage = () => {
    dispatchAlertInfo(MESSAGES.UNAVAILABLE_PAGE);
  };

  return (
    <CustomNavBar
      $modesupermanagerenable={modeSuperManagerEnable}
      variant="light"
    >
      <LogoNav>
        <NavLink
          exact="true"
          to={DASHBOARD_PATH}
          data-testid="logoHomepage"
          data-selenium={header.BUTTON_HOME}
        >
          <LogoWrapper>
            <img src={logo} alt="" />
          </LogoWrapper>
        </NavLink>
      </LogoNav>
      <MenuNav>
        <CustomNavDropDown
          title={<span>Menu</span>}
          data-selenium={header.BUTTON_MENU}
        >
          <MenuContainer className="container" href="#action3">
            <Row>
              <Col sm="4">
                <MenuItemTitle>Habilitations</MenuItemTitle>
                <MenuItem>
                  <IconWrapper sm="3">
                    <BsQuestionFill size={25} />
                  </IconWrapper>
                  <MenuItemContent sm="9">
                    <MenuItemLink
                      data-selenium={header.BUTTON_MENU_USER_CASES}
                      to={USER_CASES_PATH}
                    >
                      <ItemSubTitle>Demandes</ItemSubTitle>
                      <ItemDescription>Gérer les demandes</ItemDescription>
                    </MenuItemLink>
                  </MenuItemContent>
                </MenuItem>
                <MenuItem>
                  <IconWrapper sm="3">
                    <BsPeopleFill size={25} />
                  </IconWrapper>
                  <MenuItemContent
                    data-selenium={header.BUTTON_MENU_TEAMS}
                    sm="9"
                  >
                    <MenuItemLink to={TEAMS_PATH}>
                      <ItemSubTitle>Équipes</ItemSubTitle>
                      <ItemDescription>Gérer les équipes</ItemDescription>
                    </MenuItemLink>
                  </MenuItemContent>
                </MenuItem>
                <MenuItem>
                  <IconWrapper sm="3">
                    <BsFileRuledFill size={25} />
                  </IconWrapper>
                  <MenuItemContent
                    sm="9"
                    data-selenium={header.BUTTON_MENU_ROLES}
                  >
                    <MenuItemLink to={ROLES_PATH}>
                      <ItemSubTitle>Rôles</ItemSubTitle>
                      <ItemDescription>Gérer les rôles</ItemDescription>
                    </MenuItemLink>
                  </MenuItemContent>
                </MenuItem>
              </Col>
              <Col sm="4">
                <MenuItemTitle>Outils</MenuItemTitle>
                <MenuItem>
                  <IconWrapper sm="3">
                    <FaServer size={25} />
                  </IconWrapper>
                  <MenuItemContent sm="9">
                    <MenuItemLink to={PORTFOLIOS_PATH}>
                      <ItemSubTitle>Ressources</ItemSubTitle>
                      <ItemDescription>Recherche par ressource</ItemDescription>
                    </MenuItemLink>
                  </MenuItemContent>
                </MenuItem>
                <MenuItem>
                  <IconWrapper sm="3">
                    <FaSearch size={25} />
                  </IconWrapper>
                  <MenuItemContent sm="9">
                    <MenuItemLink onClick={onClickUnvailablePage}>
                      <ItemSubTitle>Utilisateur</ItemSubTitle>
                      <ItemDescription>
                        Recherche par utilisateur
                      </ItemDescription>
                    </MenuItemLink>
                  </MenuItemContent>
                </MenuItem>
                <MenuItem>
                  <IconWrapper sm="3">
                    <FaSearch size={25} />
                  </IconWrapper>
                  <MenuItemContent sm="9">
                    <MenuItemLink onClick={onClickUnvailablePage}>
                      <ItemSubTitle>Gestionnaires</ItemSubTitle>
                      <ItemDescription>
                        Recherche par gestionnaires
                      </ItemDescription>
                    </MenuItemLink>
                  </MenuItemContent>
                </MenuItem>
              </Col>
              <Col sm="4">
                <MenuItemTitle> Gestion de profil</MenuItemTitle>
                <MenuItem>
                  <IconWrapper sm="3">
                    <FaPersonPlusFill size={25} />
                  </IconWrapper>
                  <MenuItemContent sm="9">
                    <MenuItemLink
                      to={USER_AUTORIZATIONS}
                      data-selenium={header.BUTTON_MENU_USER_INFOS}
                    >
                      <ItemSubTitle>Mes habilitations</ItemSubTitle>
                      <ItemDescription>
                        Visualiser mes habilitations
                      </ItemDescription>
                    </MenuItemLink>
                  </MenuItemContent>
                </MenuItem>
                <MenuItem>
                  <IconWrapper sm="3">
                    <ConnectWithoutContact size={25} />
                    {/* <MdConnectWithoutContact size={25} /> */}
                  </IconWrapper>
                  <MenuItemContent sm="9">
                    <MenuItemLink onClick={onClickUnvailablePage}>
                      <ItemSubTitle>Aide et contact</ItemSubTitle>
                      <ItemDescription>Description</ItemDescription>
                    </MenuItemLink>
                  </MenuItemContent>
                </MenuItem>
              </Col>
            </Row>
          </MenuContainer>
        </CustomNavDropDown>
      </MenuNav>

      <NavProfil>
        <AdminBadgeAuthentification
          modeSuperManagerEnable={modeSuperManagerEnable}
        />

        <CustomNavDropDown
          data-selenium={header.BUTTON_PROFILE}
          align="end"
          title={
            <span>
              {userName}
              <BsFillPerson
                size={20}
                aria-label="profilSection"
                className="icon-person-fill"
              />
            </span>
          }
          id="basic-nav-dropdown"
        >
          <ProfilDropDown>
            <NavLink
              exact="true"
              to={USER_INFOS_PATH}
              data-selenium={header.BUTTON_PROFILE}
            >
              <ProfilItemLink>Mon profil</ProfilItemLink>
            </NavLink>
            <NavLink exact="true" to={USER_AUTORIZATIONS}>
              <ProfilItemLink>Mes habilitations</ProfilItemLink>
            </NavLink>
            <ProfilItemLink
              onClick={(e) => onNavigateTo(e, CHANGE_PASSWORD_PATH)}
            >
              Modifier mon mot de passe
            </ProfilItemLink>
            <NavDropdown.Divider />
            <ProfilItemLink onClick={handleLogout}>Déconnexion</ProfilItemLink>
          </ProfilDropDown>
        </CustomNavDropDown>
      </NavProfil>
    </CustomNavBar>
  );
};

export default Header;
