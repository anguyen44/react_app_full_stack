import { useState } from "react";
import { byString } from "shared/utils/global.utils";
import { sortItemsByCallback } from "shared/utils/sort.utils";

export const useSort = () => {
  const [orderDir, setOrderDir] = useState<SortType>("desc");
  const [orderBy, setOrderBy] = useState("");
  const [sortType, setSortType] = useState<"string" | "date">("string");

  const setSeconds = (date) => new Date(date).getTime() / 1000;

  const onSortClick = (columnId, sortType) => {
    setSortType(sortType);
    if (orderBy === columnId) {
      setOrderDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(columnId);
      setOrderDir("desc");
    }
  };

  const sortItemsByCallbackAndDir = (items) => {
    if (sortType === "date") {
      sortItemsByCallback(
        items,
        (item) => setSeconds(byString(orderBy, item)),
        orderDir,
      );
    }
    return sortItemsByCallback(
      items,
      (item) => byString(orderBy, item),
      orderDir,
    );
  };

  return { orderDir, orderBy, onSortClick, sortItemsByCallbackAndDir };
};
