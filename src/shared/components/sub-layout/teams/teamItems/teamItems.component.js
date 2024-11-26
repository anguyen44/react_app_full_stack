import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addCheckedTeam,
  initiateCheckedTeam,
} from "shared/store/slices/teamMenu/teamMenu.slice";

import TeamItem from "../teamItem/teamItem.component";

const TeamItems = ({ teams, mainTeam, teamOid }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (teams?.length > 0) {
      const firstTeam = teams[0];
      if (firstTeam?.subTeams?.length > 0) {
        if (mainTeam.oid !== null && mainTeam.oid !== firstTeam.oid) {
          dispatch(initiateCheckedTeam([mainTeam.oid]));
        } else {
          dispatch(initiateCheckedTeam([firstTeam.oid]));
        }
      } else {
        dispatch(initiateCheckedTeam([]));
      }
    }
  }, []);

  useEffect(() => {
    if (mainTeam.oid !== null && teamOid) {
      dispatch(addCheckedTeam(mainTeam.oid));
      document.getElementById(`sidebar-subitem-${teamOid}`).scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [teamOid, JSON.stringify(mainTeam)]);

  return (
    <>
      {teams.map((team) => (
        <TeamItem team={team} key={team.oid} />
      ))}
    </>
  );
};

export default memo(TeamItems);
