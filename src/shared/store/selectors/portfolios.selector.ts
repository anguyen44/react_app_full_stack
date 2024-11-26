import { createSelector } from "@reduxjs/toolkit";
import { sortItemsByDisplayName } from "shared/utils/sort.utils";
import { RootState } from "..";

export const sortPortfoliosListByName = (sortType: SortType) =>
  createSelector(
    (state: RootState) => state.userReducer.portfolios,
    (portfolios) => {
      if (portfolios) {
        if (portfolios.length > 0) {
          return sortItemsByDisplayName(portfolios, sortType);
        } else {
          return [];
        }
      }
    },
  );
