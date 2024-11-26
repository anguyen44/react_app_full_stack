import { HomeIcon, Lock, Search, Server, Settings, Team, User } from "icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import MESSAGES from "shared/config/constants/message.config";
import {
  PORTFOLIOS_PATH,
  ROLES_PATH,
  TEAMS_PATH,
  USER_AUTORIZATIONS,
  USER_CASES_PATH,
} from "shared/config/constants/path.config";
import { fetchDashboardInfos } from "shared/store/slices/dashboardPage/dashboardPage.slice";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";

import {
  CasesToValidateNumber,
  CircleCustom,
  ContentItemIconWrapper,
  ContentItemWrapper,
  HeaderContentItem,
  IconWrapper,
  MiddleContentItem,
  PageTitle,
  SkeletonCustom,
} from "./DashboardPage.styled";

const DashboardPage = ({ user }) => {
  const dispatch = useDispatch();
  const { dispatchAlertInfo } = useAlertCard();
  const navigate = useNavigate();

  const { isLoadingCasesNumber, casesNumber } = useSelector(
    (state) => state.dashboardPageReducer,
  );

  const asSuperManager = useSelector(
    (state) => state.userReducer.modeSuperManagerEnable,
  );

  useEffect(() => {
    dispatch(fetchDashboardInfos({ asSuperManager }));
  }, [asSuperManager]);

  const onClickUnvailablePage = () => {
    dispatchAlertInfo(MESSAGES.UNAVAILABLE_PAGE);
  };

  return (
    <>
      <PageTitle>
        <IconWrapper>
          <HomeIcon />
        </IconWrapper>
        <span>Bienvenue au tableau de bord,</span> {user?.givenName}{" "}
        {user?.name} ({user?.nni?.toUpperCase()})
      </PageTitle>
      <Row margin={"40px 0 0 0"}>
        <Col spanPercent={"33.33%"}>
          <>
            {!isLoadingCasesNumber ? (
              <ContentItemWrapper
                $redbackground={true}
                onClick={() => navigate(USER_CASES_PATH)}
                data-testid="demandeSection"
              >
                <CircleCustom />
                <HeaderContentItem>
                  Demandes
                  <ContentItemIconWrapper>
                    <Settings />
                  </ContentItemIconWrapper>
                </HeaderContentItem>
                <MiddleContentItem>
                  À valider :{" "}
                  <CasesToValidateNumber>{casesNumber}</CasesToValidateNumber>
                </MiddleContentItem>
              </ContentItemWrapper>
            ) : (
              <SkeletonCustom variant="rounded" />
            )}
          </>
        </Col>
        <Col spanPercent={"33.33%"}>
          <ContentItemWrapper
            $bluebackground={true}
            onClick={() => navigate(ROLES_PATH)}
            data-testid="rolesSection"
          >
            <CircleCustom />
            <HeaderContentItem>
              Rôles
              <ContentItemIconWrapper>
                <Lock />
              </ContentItemIconWrapper>
            </HeaderContentItem>
          </ContentItemWrapper>
        </Col>
        <Col spanPercent={"33.33%"}>
          <ContentItemWrapper
            $quebalbackground={true}
            onClick={() => navigate(PORTFOLIOS_PATH)}
            data-testid="portfolioSection"
          >
            <CircleCustom />
            <HeaderContentItem>
              Ressources
              <ContentItemIconWrapper>
                <Server />
              </ContentItemIconWrapper>
            </HeaderContentItem>
          </ContentItemWrapper>
        </Col>
      </Row>
      <Row margin={"30px 0 0 0"}>
        <Col spanPercent={"33.33%"}>
          <ContentItemWrapper
            $eternalbackground={true}
            onClick={() => navigate(USER_AUTORIZATIONS)}
            data-testid="profilSection"
          >
            <CircleCustom />
            <HeaderContentItem>
              Mes habilitations
              <ContentItemIconWrapper>
                <User />
              </ContentItemIconWrapper>
            </HeaderContentItem>
          </ContentItemWrapper>
        </Col>
        <Col spanPercent={"33.33%"}>
          <ContentItemWrapper
            $celestialbackground={true}
            onClick={onClickUnvailablePage}
          >
            <CircleCustom />
            <HeaderContentItem>
              Recherche de gestionnaires
              <ContentItemIconWrapper>
                <Search />
              </ContentItemIconWrapper>
            </HeaderContentItem>
          </ContentItemWrapper>
        </Col>
        <Col spanPercent={"33.33%"}>
          <>
            <ContentItemWrapper
              $mountainrockbackground={true}
              onClick={() => navigate(TEAMS_PATH)}
              data-testid="teamSection"
            >
              <CircleCustom />
              <HeaderContentItem data-selenium="teamSection">
                Équipes
                <ContentItemIconWrapper>
                  <Team />
                </ContentItemIconWrapper>
              </HeaderContentItem>
            </ContentItemWrapper>
          </>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
