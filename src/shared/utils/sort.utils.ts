import { GenericDisplayModel } from "shared/model/genericDisplay.model";
import { GenericNameDescriptionModel } from "shared/model/genericNameDescription.model";
import { UserModel } from "shared/model/user.model";

export const sortItemsByDisplayName = <T extends GenericDisplayModel>(
  items: T[],
  sortType: SortType = "asc",
) => {
  return sortItemsByCallback(
    items,
    (item: T) => item.displayName?.trim().toLocaleLowerCase(),
    sortType,
  );
};

export const sortItemsByName = <T extends GenericNameDescriptionModel>(
  items: T[],
  sortType: SortType = "asc",
) => {
  return sortItemsByCallback(items, (item: T) => item.name, sortType);
};

export const sortItemsByCallback = <T>(
  items: T[],
  callback: (item: T) => any,
  sortType: SortType = "asc",
) => {
  if (!items) {
    return;
  }
  const shallow = [...items];
  switch (sortType) {
    case "desc":
      return shallow.sort((a, b) => (callback(a) > callback(b) ? -1 : 1));
    case "asc":
    default:
      return shallow.sort((a, b) => (callback(a) > callback(b) ? 1 : -1));
  }
};

export const sortUsersByName = (items: UserModel[]) => {
  return sortItemsByCallback(items, getCallbackSortUser);
};

const getCallbackSortUser = (user: UserModel) => user.getFullName();
