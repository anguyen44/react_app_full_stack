import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const searchMainTeamOfSubTeam = (subTeamId: string) =>
  createSelector(
    (state: RootState) => state.userReducer.teams,
    (teams) => {
      const notFoundTeam = { oid: null, name: null, displayName: null };
      const mainTeam =
        teams?.reduce((acc, team) => {
          if (team.subTeams.length > 0) {
            const check = team.subTeams.some((e) => e.oid === subTeamId);
            if (check) {
              acc["oid"] = team.oid;
              acc["name"] = team.name;
              acc["displayName"] = team.displayName;
            }
          }
          return acc;
        }, notFoundTeam) ?? notFoundTeam;
      return mainTeam;
    },
  );
