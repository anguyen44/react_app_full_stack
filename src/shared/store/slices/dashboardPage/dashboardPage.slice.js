import { createSlice } from "@reduxjs/toolkit";

const dashboardPageSlice = createSlice({
  name: "dashboardPageReducer",
  initialState: {
    casesNumber: null,
    isLoadingCasesNumber: false,
  },
  reducers: {
    fetchDashboardInfos: (state) => {
      return state;
    },
    setCasesNumber: (state, action) => {
      state.casesNumber = action.payload;
    },
    updateIsLoadingCasesNumber: (state, action) => {
      state.isLoadingCasesNumber = action.payload;
    },
  },
});

export const {
  fetchDashboardInfos,
  setCasesNumber,
  updateIsLoadingCasesNumber,
} = dashboardPageSlice.actions;
export default dashboardPageSlice.reducer;
