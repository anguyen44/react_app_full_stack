import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoadingWithDivComponent } from "shared/components/loading/Loading.component";
import SubLayoutTeamComponent from "shared/components/sub-layout/teams/subLayoutTeam.component";
import { TEAMS_PATH } from "shared/config/constants/path.config";
import { sortTeamsListByName } from "shared/store/selectors/teams.selector";

import { getTeamsListAction } from "../../shared/store/sagas/team.saga";
import { useAppDispatch, useShallowEqualSelector } from "shared/store";
import MESSAGES from "shared/config/constants/message.config";

function TeamsView({ history }: ViewProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const teams = useShallowEqualSelector(sortTeamsListByName("asc"));

  useEffect(() => {
    dispatch(getTeamsListAction());
  }, []);

  useEffect(() => {
    if (teams?.length > 0 && pathname === TEAMS_PATH) {
      const firstTeam = teams[0];
      navigate(TEAMS_PATH + "/" + firstTeam.oid);
    }
  }, [teams, pathname]);

  return (
    <SubLayoutTeamComponent elements={teams} history={history}>
      {teams ? (
        teams.length > 0 ? (
          <Outlet />
        ) : (
          <div style={{ padding: "5px" }}>{MESSAGES.SEARCH_TEAM_NONE}</div>
        )
      ) : (
        <LoadingWithDivComponent />
      )}
    </SubLayoutTeamComponent>
  );
}

export default TeamsView;
