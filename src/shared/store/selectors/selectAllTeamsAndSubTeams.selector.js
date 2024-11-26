import { createSelector } from "@reduxjs/toolkit";

export const selectAllTeamsAndSubTeams = () =>
  createSelector(
    (state) => state.userReducer.teams,
    (teams) => {
      const allTeams = teams?.reduce((acc, value) => {
        acc = [...acc, value, ...value.subTeams];
        return acc;
      }, []);

      return allTeams;
    },
  );
