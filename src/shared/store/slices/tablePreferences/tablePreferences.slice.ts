import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import TablePreferencesEnum, {
  ROW_PER_PAGE,
  getDefaultRowPerPage,
} from "shared/enumeration/tablePreferences.enum";

const initialState = {
  ...Object.values(TablePreferencesEnum).reduce(
    (object, value: TablePreferencesEnum) => ({
      ...object,
      [ROW_PER_PAGE(value)]: getDefaultRowPerPage(value),
    }),
    {},
  ),
};

export const tablePreferencesSlice = createSlice({
  name: "tablePreferencesReducer",
  initialState: initialState,
  reducers: {
    setDefaultRowPerPage: (
      state,
      action: PayloadAction<{ table: TablePreferencesEnum; value: number }>,
    ) => {
      state[ROW_PER_PAGE(action.payload.table)] = action.payload.value;
    },
  },
});

export const { setDefaultRowPerPage } = tablePreferencesSlice.actions;
export default tablePreferencesSlice.reducer;
