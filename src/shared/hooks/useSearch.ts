import { useMemo, useState } from "react";
import { GenericDisplayModel } from "shared/model/genericDisplay.model";
import { sortItemsByDisplayName } from "shared/utils/sort.utils";

const useSearch = <T extends GenericDisplayModel>(
  elements: T[],
  includesNameInSearch?: boolean,
) => {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [resetPage, setResetPage] = useState<Number>(null);

  const onChangeSearchBox = (e) => {
    setResetPage(new Number(0));
    const searchingText = e.target.value ? e.target.value : "";
    setSearchKeyWord(searchingText);
  };

  const searchedElements = useMemo(() => {
    let filteredElements = elements?.filter(
      (element) =>
        element.displayName
          ?.toLowerCase()
          .includes(searchKeyWord.toLowerCase()) ||
        (includesNameInSearch &&
          element.name?.toLowerCase().includes(searchKeyWord.toLowerCase())),
    );
    return sortItemsByDisplayName(filteredElements);
  }, [elements, searchKeyWord]);

  return { searchedElements, searchKeyWord, onChangeSearchBox, resetPage };
};

export default useSearch;
