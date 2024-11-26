import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  DASHBOARD_PATH,
  PERMISSIONS_ROLE_PATH,
  PORTFOLIOS_PATH,
  ROLES_PATH,
  SUB_TEAMS_PATH,
  TEAMS_PATH,
  USER_AUTORIZATIONS,
  USER_CASES_PATH,
  USER_INFOS_PATH,
} from "shared/config/constants/path.config";
import { searchMainTeamOfSubTeam } from "shared/store/selectors/searchMainTeam.selector";
import { selectAllTeamsAndSubTeams } from "shared/store/selectors/selectAllTeamsAndSubTeams.selector";

import NavigationItems from "./navigationItems/navigationItems";
import { useAppSelector } from "shared/store";

const NavigationProgression = () => {
  const { pathname } = useLocation();
  const { teamOid, roleOid, portfolioOid } = useParams();
  const allTeams = useAppSelector(selectAllTeamsAndSubTeams());
  const mainTeam = useAppSelector(searchMainTeamOfSubTeam(teamOid));
  const allPortfolios = useAppSelector((state) => state.userReducer.portfolios);
  const roleInfo = useAppSelector((state) => state.rolePageReducer.baseInfo);
  const isFetchingRolePage = useAppSelector(
    (state) => state.rolePageReducer.isFetching,
  );

  const isNotDashboard = pathname !== "/dashboard";
  const extractedItemsFromPathName = pathname.substring(1).split("/");

  const [paths, setPaths] = useState([]);

  const location = useLocation();

  let roleDiplayName = location?.state?.roleDiplayName;

  const dashboardItem = {
    displayName: "Tableau de bord",
    url: DASHBOARD_PATH,
  };

  const getListPathsFromPathName = () => {
    const firstPrefix = extractedItemsFromPathName[0];
    switch (firstPrefix) {
      case `${TEAMS_PATH.substring(1)}`:
        if (teamOid && allTeams?.length) {
          const teamInfos = allTeams.find((t) => t.oid === teamOid);
          setPaths([
            { ...dashboardItem },
            { displayName: "Équipes", url: TEAMS_PATH },
            {
              displayName: teamInfos?.displayName,
              url: TEAMS_PATH + "/" + teamOid,
            },
          ]);
        } else {
          setPaths([
            { ...dashboardItem },
            { displayName: "Équipes", url: TEAMS_PATH },
          ]);
        }
        break;
      case `${SUB_TEAMS_PATH.substring(1)}`:
        if (teamOid && allTeams?.length) {
          const teamInfos = allTeams.find((t) => t.oid === teamOid);
          setPaths([
            { ...dashboardItem },
            { displayName: "Équipes", url: TEAMS_PATH },
            {
              displayName: mainTeam?.displayName,
              url: TEAMS_PATH + "/" + mainTeam?.oid,
            },
            {
              displayName: teamInfos?.displayName,
              url: TEAMS_PATH + "/" + teamInfos?.oid,
            },
          ]);
        }
        break;
      case `${ROLES_PATH.substring(1)}`:
        if (!roleOid) {
          setPaths([
            { ...dashboardItem },
            { displayName: "Rôles", url: ROLES_PATH },
          ]);
        } else {
          const pathsRoles = [
            { ...dashboardItem },
            { displayName: "Rôles", url: ROLES_PATH },
            {
              displayName: !isFetchingRolePage && roleDiplayName,
              url: ROLES_PATH + "/" + roleOid,
            },
          ];
          if (pathname === PERMISSIONS_ROLE_PATH(roleOid)) {
            pathsRoles.push({
              displayName: "Ajout de permissions",
              url: PERMISSIONS_ROLE_PATH(roleOid),
            });
          }
          setPaths(pathsRoles);
        }
        break;
      case `${USER_CASES_PATH.substring(1)}`:
        setPaths([
          { ...dashboardItem },
          { displayName: "Demandes en cours ", url: USER_CASES_PATH },
        ]);
        break;
      case `${USER_INFOS_PATH.substring(1)}`:
        setPaths([
          { ...dashboardItem },
          { displayName: "Mon profil", url: USER_INFOS_PATH },
        ]);
        break;
      case `${USER_AUTORIZATIONS.substring(1)}`:
        setPaths([
          { ...dashboardItem },
          { displayName: "Mes habilitations", url: USER_AUTORIZATIONS },
        ]);
        break;
      case `${PORTFOLIOS_PATH.substring(1)}`:
        if (portfolioOid && allPortfolios?.length) {
          const portfolioInfos = allPortfolios.find(
            (t) => t.oid === portfolioOid,
          );
          setPaths([
            { ...dashboardItem },
            { displayName: "Ressources", url: PORTFOLIOS_PATH },
            {
              displayName: portfolioInfos?.getFullName(),
              url: PORTFOLIOS_PATH + "/" + portfolioOid,
            },
          ]);
        } else {
          setPaths([
            { ...dashboardItem },
            { displayName: "Ressources", url: PORTFOLIOS_PATH },
          ]);
        }
        break;
      default:
        setPaths([]);
        break;
    }
  };

  useEffect(() => {
    getListPathsFromPathName();
  }, [
    pathname,
    JSON.stringify(mainTeam),
    JSON.stringify(allTeams),
    JSON.stringify(allPortfolios),
  ]);

  useEffect(() => {
    if (roleOid && roleInfo && roleInfo.oid === roleOid) {
      roleDiplayName = roleInfo.displayName;
      getListPathsFromPathName();
    }
  }, [roleOid, roleInfo]);

  return <div>{isNotDashboard && <NavigationItems paths={paths} />}</div>;
};

export default NavigationProgression;
