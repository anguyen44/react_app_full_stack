import { useState } from "react";
import TablePreferencesEnum, {
  ROW_PER_PAGE,
} from "shared/enumeration/tablePreferences.enum";
import { useAppDispatch, useAppSelector } from "shared/store";
import { setDefaultRowPerPage } from "shared/store/slices/tablePreferences/tablePreferences.slice";

export const usePagination = (
  table: TablePreferencesEnum = TablePreferencesEnum.DEFAULT,
  disablePagination?: boolean,
) => {
  const defaultRowPerPage: number = useAppSelector(
    (state) => state.tablePreferencesReducer[ROW_PER_PAGE(table)],
  );
  const dispatch = useAppDispatch();

  const rowsPerPageOptions = [5, 10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowPerPage);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    let value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
    if (table != TablePreferencesEnum.DEFAULT) {
      dispatch(setDefaultRowPerPage({ table, value }));
    }
  };

  const countedListForShowing = <T>(list: T[]) => {
    return rowsPerPage > 0 && !disablePagination
      ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : list;
  };

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    countedListForShowing,
    setPage,
    rowsPerPageOptions,
  };
};
