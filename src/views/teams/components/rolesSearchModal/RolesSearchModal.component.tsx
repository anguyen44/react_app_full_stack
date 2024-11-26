import { CustomFaCirclePlus, FaSearch } from "icons";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { TextInput } from "shared/components/input/input.component";
import Modal from "shared/components/modal/modal.component";
import PlusIconWrapper from "shared/components/PlusIconWrapper/PlusIconWrapper";
import MESSAGES from "shared/config/constants/message.config";
import { useModal } from "shared/hooks/useModal";
import { addRoleToSubTeamAction } from "shared/store/sagas/team.saga";
import { searchMainTeamOfSubTeam } from "shared/store/selectors/searchMainTeam.selector";

import SearchedRolesSlide, {
  RoleFiltered,
} from "./searchedRolesSlide.component";
import { useAppDispatch, useAppSelector } from "shared/store";
import RoleModel from "shared/model/role.model";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";
import { sortItemsByDisplayName } from "shared/utils/sort.utils";
import CartComponent from "shared/components/cart/cart.component";
import {
  SearchIconWrapper,
  SlideWrapper,
} from "shared/components/searchItems/searchItems.styled";

interface RoleSearchModalProps {
  teamOid: string;
}

const RoleSearchModal = ({ teamOid }: RoleSearchModalProps) => {
  const { showModal, onCloseModal, onOpenModal } = useModal();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [dataFiltered, setDataFiltered] = useState<RoleFiltered[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const { displayName: mainTeamName } = useAppSelector(
    searchMainTeamOfSubTeam(teamOid),
  );

  const displayTeamName = useAppSelector(
    (state) => state.teamPageReducer.teamInfo?.displayName,
  );

  const rolesOfTeam = useAppSelector((state) => state.teamPageReducer.roles);
  const mainTeamRoles = useAppSelector(
    (state) => state.teamPageReducer.mainTeamRoles,
  );
  const isCaseValidationImpossible = useAppSelector(
    (state) => state.teamPageReducer.isCaseValidationImpossible,
  );

  const [searchedRoles, setSearchedRoles] = useState<RoleModel[]>([]);
  const [isLoadingAddRoleToTeamApi, setIsLoadingAddRoleToTeamApi] =
    useState(false);

  const { pathname } = useLocation();
  const isSubTeamPage = pathname.includes("sub_teams");

  const dispatch = useAppDispatch();

  const { dispatchAlertSuccess } = useAlertCard();

  const { dispatchAlertDialog, dispatchImpossibleCaseValidationAlertDialog } =
    useAlertDialog();

  const onChangeSearchInput = (newValue: string) => {
    setSearchInputValue(newValue);
    onSearching(newValue);
  };

  const NotFoundItemObjectError = {
    name: "error",
    message: MESSAGES.NO_ROLE_FOUND,
  } as RoleFiltered;

  const mainTeamRolesAlreadyAdded = mainTeamRoles.filter(
    (mainTeamRole) =>
      !rolesOfTeam.some((roleOfTeam) => mainTeamRole.oid === roleOfTeam.oid),
  );

  const onSearching = (searchInputValue: string) => {
    setDataFiltered([]);

    if (
      searchInputValue.includes("@") ||
      searchInputValue === "" ||
      searchInputValue === null
    ) {
      if (searchInputValue === "" || searchInputValue === null) {
        setDataFiltered(sortItemsByDisplayName(mainTeamRolesAlreadyAdded));
      } else {
        setDataFiltered([NotFoundItemObjectError]);
      }
    } else {
      if (isSubTeamPage) {
        let filtered = mainTeamRoles.filter((r) =>
          r.displayName.toLowerCase().includes(searchInputValue.toLowerCase()),
        );

        if (filtered && filtered.length > 0) {
          setDataFiltered(sortItemsByDisplayName(filtered));
        } else {
          setDataFiltered([NotFoundItemObjectError]);
        }
      }
    }
  };

  const addRole = (role: RoleModel) => {
    setSearchedRoles(sortItemsByDisplayName([...searchedRoles, role]));
    onChangeSearchInput("");
    searchRef.current?.focus();
  };

  const deleteTempRole = (roleOid) =>
    setSearchedRoles([...searchedRoles].filter((r) => r.oid !== roleOid));

  const deleteAllTempRoles = () => setSearchedRoles([]);

  const handleOpenRoleModal = () => {
    if (isCaseValidationImpossible) {
      dispatchImpossibleCaseValidationAlertDialog({
        handleAction: onOpenModal,
      });
    } else {
      onOpenModal();
    }
  };

  const resetSearchTable = () => {
    setDataFiltered([]);
  };

  const handleCloseRolesModal = () => {
    if (searchedRoles?.length > 0 && !isLoadingAddRoleToTeamApi) {
      const isPlural = searchedRoles.length > 1;
      const plural = isPlural ? "s" : "";
      dispatchAlertDialog({
        title: `Rôle${plural} non ajouté${plural} à la sous-équipe`,
        description: (
          <>
            Le{plural} rôle{plural} sélectionné{plural} n'
            {isPlural ? "ont" : "a"} pas été ajouté{plural} à la sous-équipe.
            <br />
            Êtes-vous sûr de vouloir quitter cette page ?
          </>
        ),
        handleAction: closeRolesModal,
      });
    } else {
      closeRolesModal();
    }
  };

  const closeRolesModal = () => {
    onCloseModal();
    setSearchedRoles([]);
    resetSearchTable();
  };

  const searchedRolesToOidListForRequest = (rolesList: RoleModel[]) =>
    rolesList.map((r) => r.oid);

  const onAddRoleToSubTeam = () => {
    setIsLoadingAddRoleToTeamApi(true);
    dispatch(
      addRoleToSubTeamAction({
        params: [teamOid, searchedRolesToOidListForRequest(searchedRoles)],
        onSuccessCallback: () => {
          setIsLoadingAddRoleToTeamApi(false);
          dispatchAlertSuccess(
            MESSAGES.ADD_ROLE_TO_TEAM_SUCCESS_NEED_VALIDATION,
          );
          setSearchedRoles([]);
          onCloseModal();
        },
        onFailureCallback: () => {
          setIsLoadingAddRoleToTeamApi(false);
        },
      }),
    );
  };

  const handleClickSearch = () => onSearching(searchInputValue);

  const columns: Column[] = [
    {
      name: "Nom",
      field: "displayName",
      width: "30%",
    },
    {
      name: "Description",
      field: "description",
      width: "50%",
      showTextEllipsis: true,
    },
    { name: "Statut", field: "isActive", width: "10%" },
  ];

  useEffect(() => {
    if (showModal) {
      handleClickSearch();
    }
  }, [showModal]);

  return (
    <>
      <PlusIconWrapper>
        <CustomFaCirclePlus
          data-testid="open-modal"
          onClick={handleOpenRoleModal}
        />
      </PlusIconWrapper>
      <Modal
        visible={showModal}
        onCancel={handleCloseRolesModal}
        title={
          <p style={{ margin: 0 }}>
            Ajout de rôles
            {isSubTeamPage &&
              " de l'équipe " +
                mainTeamName +
                " dans la sous-équipe " +
                displayTeamName}
          </p>
        }
        isFullScreen
        headerDivider
      >
        <CartComponent
          data={searchedRoles}
          columns={columns}
          customNoContentTableName={"Aucun rôle ajouté"}
          deleteCartElement={deleteTempRole}
          deleteAllCartElements={deleteAllTempRoles}
          handleValidCart={onAddRoleToSubTeam}
          isLoadingAddElementApi={isLoadingAddRoleToTeamApi}
          cartLabel="Rôles"
        >
          <div className="formWrapperPosition">
            <SearchIconWrapper
              aria-label="search-role-icon"
              onClick={handleClickSearch}
            >
              <FaSearch className="searchIcon" />
            </SearchIconWrapper>
            <TextInput
              innerRef={searchRef}
              placeholder={"Sélectionner un ou plusieurs rôles"}
              onChange={(e) => onChangeSearchInput(e.target.value)}
              onKeyDown={() => {}}
              value={searchInputValue}
              autoFocus
            />
          </div>
          <SlideWrapper>
            <SearchedRolesSlide
              dataFiltered={dataFiltered}
              addRole={addRole}
              dataAdded={rolesOfTeam}
              dataBeingAdded={searchedRoles}
            />
          </SlideWrapper>
        </CartComponent>
      </Modal>
    </>
  );
};

export default RoleSearchModal;
