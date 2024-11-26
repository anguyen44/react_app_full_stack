import { createSelector } from "@reduxjs/toolkit";
import { sortItemsByDisplayName } from "shared/utils/sort.utils";
import { RootState } from "..";

export const sortTeamsListByName = (sortType: SortType) =>
  createSelector(
    (state: RootState) => state.userReducer.teams,
    (teams) => {
      if (teams) {
        if (teams.length > 0) {
          return sortItemsByDisplayName(teams, sortType);
        } else {
          return [];
        }
      }
    },
  );

export const getSortedSubTeamsByTeamOid = (teamOid: string) =>
  createSelector(
    (state: RootState) =>
      state.userReducer.teams.find((team) => team.oid && team.oid == teamOid)
        .subTeams,
    (subTeams) => {
      if (subTeams?.length > 0) {
        return sortItemsByDisplayName(subTeams);
      } else {
        return [];
      }
    },
  );
