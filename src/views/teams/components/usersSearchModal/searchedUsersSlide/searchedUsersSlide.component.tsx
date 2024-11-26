import { UserModel } from "shared/model/user.model";
import {
  NotFoundSearchItem,
  SearchItemIconWrapper,
  SearchItemName,
  SearchItemWrapper,
} from "shared/components/searchItems/searchItems.styled";
import MESSAGES from "shared/config/constants/message.config";
import IntlMessageFormat from "intl-messageformat";
import SearchItemIcon from "shared/components/searchItems/SearchItemIcon";

export type UserFiltered = UserModel & { message?: string };

interface SearchedUsersSlideProps {
  dataFiltered: UserFiltered[];
  dataAdded: UserFiltered[];
  dataBeingAdded: UserFiltered[];
  addMember: (member: UserModel) => void;
  userAlreadyExistMessage: IntlMessageFormat;
}

const SearchedUsersSlide = ({
  dataFiltered,
  dataAdded,
  dataBeingAdded,
  addMember,
  userAlreadyExistMessage,
}: SearchedUsersSlideProps) => {
  const isAdded = (user: UserFiltered) =>
    dataAdded?.some((addedUser) => user.oid === addedUser.oid);

  const isBeingAdded = (user: UserFiltered) =>
    dataBeingAdded?.some((beingAddedUser) => user.oid === beingAddedUser.oid);

  const getTooltipMessage = (
    user: UserModel,
    isAdded: boolean,
    isBeingAdded: boolean,
  ) => {
    const fullName = user.getFullName();
    if (isAdded) {
      return userAlreadyExistMessage.format({ fullName }) as string;
    } else if (isBeingAdded) {
      return MESSAGES.USER_ADDED_IN_WAITING_LIST.format({
        fullName,
      }) as string;
    } else {
      return "Ajouter l'utilisateur " + fullName + " au panier";
    }
  };

  return (
    <>
      {dataFiltered?.length > 0 &&
        dataFiltered.map((d, index) => {
          if (d.name !== "error") {
            const isItemAdded = isAdded(d);
            const isItemBeingAdded = !isItemAdded && isBeingAdded(d);
            const isDisabled = isItemAdded || isItemBeingAdded;
            const tooltipMessage = getTooltipMessage(
              d,
              isItemAdded,
              isItemBeingAdded,
            );
            return (
              <SearchItemWrapper
                key={index}
                onClick={() => (!isDisabled ? addMember(d) : null)}
                aria-label="searched-user-item"
                disabled={isDisabled}
              >
                <SearchItemIconWrapper>
                  <SearchItemIcon
                    isAdded={isItemAdded}
                    isBeingAdded={isItemBeingAdded}
                    title={tooltipMessage}
                  />
                </SearchItemIconWrapper>
                <SearchItemName disabled={isDisabled}>
                  <div>
                    {d.getFullName()} - {d.nni}
                  </div>
                  <div style={{ fontWeight: "normal" }}>{d.email}</div>
                </SearchItemName>
              </SearchItemWrapper>
            );
          } else {
            return (
              <NotFoundSearchItem key={index} aria-label="searched-user-item">
                {d.message}
              </NotFoundSearchItem>
            );
          }
        })}
    </>
  );
};

export default SearchedUsersSlide;
