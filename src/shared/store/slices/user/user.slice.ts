import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import PortfolioModel from "shared/model/portfolio.model";
import TeamModel from "shared/model/team.model";
import { UserModel } from "shared/model/user.model";

export type UserReducer = typeof initialState;

const initialState = {
  token: "myToken",
  user: null as UserModel,
  teams: null as TeamModel[],
  portfolios: null as PortfolioModel[],
  oidc: null,
  profile: null,
  userInfosByOid: null,
  isSuperManager: false,
  modeSuperManagerEnable: false,
};

const doorsSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    addToken: (state, action) => {
      state.token = action.payload.token;
    },
    addTeams: (state, action) => {
      state.teams = action.payload;
    },
    removeSubTeam: (state, action) => {
      const { teamOid, subTeamOid } = action.payload;
      state.teams = state.teams.map((team) => {
        if (team.oid === teamOid) {
          team.subTeams = team.subTeams?.filter(
            (team) => team.oid !== subTeamOid,
          );
        }
        return team;
      });
    },
    addPortfolios: (state, action: PayloadAction<PortfolioModel[]>) => {
      state.portfolios = action.payload;
    },
    addOidc: (state, action) => {
      state.oidc = action.payload;
    },
    addUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      const newUser = { ...state.user, ...action.payload };
      state.user = newUser;
    },
    updateUserInfosByOid: (state, action) => {
      state.userInfosByOid = action.payload;
    },
    updateIsSuperManager: (state, action) => {
      state.isSuperManager = action.payload;
    },
    updateModeSuperManagerEnable: (state, action) => {
      state.modeSuperManagerEnable = action.payload;
    },
  },
});

export const {
  addToken,
  addUser,
  addTeams,
  addPortfolios,
  addOidc,
  updateUser,
  updateUserInfosByOid,
  removeSubTeam,
  updateIsSuperManager,
  updateModeSuperManagerEnable,
} = doorsSlice.actions;
export default doorsSlice.reducer;
