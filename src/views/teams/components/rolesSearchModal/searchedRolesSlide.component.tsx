import RoleModel from "shared/model/role.model";
import {
  NotFoundSearchItem,
  SearchItemIconWrapper,
  SearchItemName,
  SearchItemWrapper,
} from "shared/components/searchItems/searchItems.styled";
import MESSAGES from "shared/config/constants/message.config";
import SearchItemIcon from "shared/components/searchItems/SearchItemIcon";

export type RoleFiltered = RoleModel & { message?: string };

interface SearchedRolesSlideProps {
  dataFiltered: RoleFiltered[];
  dataAdded: RoleFiltered[];
  dataBeingAdded: RoleFiltered[];
  addRole: (role: RoleModel) => void;
}

const SearchedRolesSlide = ({
  dataFiltered,
  dataAdded,
  dataBeingAdded,
  addRole,
}: SearchedRolesSlideProps) => {
  const isAdded = (role: RoleFiltered) =>
    dataAdded?.some((addedRole) => role.oid === addedRole.oid);

  const isBeingAdded = (role: RoleFiltered) =>
    dataBeingAdded?.some((beingAddedRole) => role.oid === beingAddedRole.oid);

  const getTooltipMessage = (
    role: RoleModel,
    isAdded: boolean,
    isBeingAdded: boolean,
  ) => {
    if (isAdded) {
      return MESSAGES.ROLE_EXISTED_IN_SUB_TEAM.format({
        roleName: role.displayName,
      }) as string;
    } else if (isBeingAdded) {
      return MESSAGES.ROLE_ADDED_IN_WAITING_LIST.format({
        roleName: role.displayName,
      }) as string;
    } else {
      return `Ajouter le rôle ${role.displayName} au panier`;
    }
  };

  return (
    <>
      {dataFiltered.length > 0 ? (
        dataFiltered?.map((d, index) => {
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
                aria-label="searched-role-item"
                onClick={() => (!isDisabled ? addRole(d) : null)}
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
                  {d.displayName}
                </SearchItemName>
              </SearchItemWrapper>
            );
          } else {
            return (
              <NotFoundSearchItem key={index} aria-label="searched-role-item">
                {d.message}
              </NotFoundSearchItem>
            );
          }
        })
      ) : (
        <NotFoundSearchItem key={0} aria-label="searched-role-item">
          {"Aucun rôle à ajouter"}
        </NotFoundSearchItem>
      )}
    </>
  );
};

export default SearchedRolesSlide;
