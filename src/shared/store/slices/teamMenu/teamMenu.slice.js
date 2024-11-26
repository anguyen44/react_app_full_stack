import { createSlice } from "@reduxjs/toolkit";

const teamMenuSlice = createSlice({
  name: "teamMenuReducer",
  initialState: {
    checkedSubMenu: [],
  },

  reducers: {
    initiateCheckedTeam: (state, action) => {
      state.checkedSubMenu = action.payload;
    },
    addCheckedTeam: (state, action) => {
      state.checkedSubMenu = [...state.checkedSubMenu, action.payload];
    },
    removeCheckedTeam: (state, action) => {
      const newList = state.checkedSubMenu.filter(
        (oidTeam) => oidTeam !== action.payload
      );
      state.checkedSubMenu = [...newList];
    },
  },
});

export const { initiateCheckedTeam, addCheckedTeam, removeCheckedTeam } =
  teamMenuSlice.actions;
export default teamMenuSlice.reducer;
