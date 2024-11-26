import Layout from "shared/components/layout/layout.component";
import { UserInfosBody, UserInfosContent } from "./userInfos.styled";
import UserInfosHeaderComponent from "./components/userInfosHeader/userInfosHeader.component";
import TabsComponent from "shared/components/tabs/Tabs.component";
import UserTeamsComponent from "./components/userTeams/userTeams.component";
import UserPortfoliosComponent from "./components/userPortfolios/userPortfolios.component";
import UserRolesComponent from "./components/userRoles/userRoles.component";
import useServiceList from "shared/hooks/useServiceList";
import { getSelfTeamsAction } from "shared/store/sagas/team.saga";
import { getSelfPortfoliosAction } from "shared/store/sagas/portfolio.saga";
import { getSelfRolesAction } from "shared/store/sagas/role.saga";

function UserAutorizationsView(props: ViewProps) {
  const { elements: teams, isLoading: isLoadingTeams } =
    useServiceList(getSelfTeamsAction);

  const { elements: roles, isLoading: isLoadingRoles } =
    useServiceList(getSelfRolesAction);

  const { elements: portfolios, isLoading: isLoadingPortfolios } =
    useServiceList(getSelfPortfoliosAction);

  const teamsColor = "#868F96";
  const rolesColor = "#047edf";
  const portfoliosColor = "#41A57D";

  return (
    <Layout history={props.history}>
      <UserInfosContent>
        <UserInfosHeaderComponent pageName="Mes habilitations" />
        <UserInfosBody>
          <TabsComponent
            title={["Mes équipes", "Mes rôles", "Mes ressources"]}
            content={[
              <UserTeamsComponent
                key={"userTeams"}
                teams={teams}
                isLoading={isLoadingTeams}
                headerBackgroundColor={teamsColor}
              />,
              <UserRolesComponent
                key={"userRoles"}
                roles={roles}
                isLoading={isLoadingRoles}
                headerBackgroundColor={rolesColor}
              />,
              <UserPortfoliosComponent
                key={"userPortfolios"}
                portfolios={portfolios}
                isLoading={isLoadingPortfolios}
                headerBackgroundColor={portfoliosColor}
              />,
            ]}
            colors={[teamsColor, rolesColor, portfoliosColor]}
            minHeight={"calc(75vh - 275px)"}
            tabPanelHeight={"auto"}
            tabPanelMaxHeight={"auto"}
          />
        </UserInfosBody>
      </UserInfosContent>
    </Layout>
  );
}

export interface UserComponentProps {
  isLoading: boolean;
  headerBackgroundColor?: string;
}

export default UserAutorizationsView;
