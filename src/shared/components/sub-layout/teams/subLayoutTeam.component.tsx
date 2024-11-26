import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { searchMainTeamOfSubTeam } from "shared/store/selectors/searchMainTeam.selector";
import SubLayout from "../subLayout.component";
import TeamItems from "./teamItems/teamItems.component";
import TeamModel from "shared/model/team.model";
import { useAppSelector } from "shared/store";

function SubLayoutTeamComponent({
  elements,
  history,
  children,
}: LayoutWithElementsProps<TeamModel>) {
  const { pathname } = useLocation();
  const { teamOid } = useParams();
  const mainTeam = useAppSelector(searchMainTeamOfSubTeam(teamOid));

  const teamItemsList = useMemo(() => {
    if (elements && elements.length > 0) {
      return (
        <TeamItems teams={elements} mainTeam={mainTeam} teamOid={teamOid} />
      );
    }
  }, [JSON.stringify(elements), pathname, JSON.stringify(mainTeam)]);

  return (
    <SubLayout history={history} elements={teamItemsList}>
      {children}
    </SubLayout>
  );
}

export default SubLayoutTeamComponent;
