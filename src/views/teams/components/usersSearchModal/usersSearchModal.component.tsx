import { CustomFaCirclePlus, FaSearch } from "icons";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { TextInput } from "shared/components/input/input.component";
import { LoadingWithDivComponent } from "shared/components/loading/Loading.component";
import Modal from "shared/components/modal/modal.component";
import PlusIconWrapper from "shared/components/PlusIconWrapper/PlusIconWrapper";
import MESSAGES from "shared/config/constants/message.config";
import useDebounce from "shared/hooks/useDebounce";
import { addUserToTeamAction } from "shared/store/sagas/team.saga";
import { getMemberByNniOrEmailAction } from "shared/store/sagas/user.saga";
import { searchMainTeamOfSubTeam } from "shared/store/selectors/searchMainTeam.selector";
import {
  addSearchedMember,
  deleteSearchedMember,
  resetSearchedMember,
} from "shared/store/slices/teamPage/teamPage.slice";

import SearchedUsersSlide, {
  UserFiltered,
} from "./searchedUsersSlide/searchedUsersSlide.component";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";
import { useAppDispatch, useAppSelector } from "shared/store";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import { useModal } from "shared/hooks/useModal";
import { UserModel } from "shared/model/user.model";
import { sortUsersByName } from "shared/utils/sort.utils";
import CartComponent from "shared/components/cart/cart.component";
import {
  SearchIconWrapper,
  SlideWrapper,
} from "shared/components/searchItems/searchItems.styled";
import { usersSearchColumns } from "views/users/components/searchTemplateModal/useUsersSearchTemplateModal";

interface UsersSearchModalProps {
  teamOid: string;
}

const UsersSearchModal = ({ teamOid }: UsersSearchModalProps) => {
  const dispatch = useAppDispatch();

  const { dispatchAlertSuccess } = useAlertCard();

  const { dispatchAlertDialog, dispatchImpossibleCaseValidationAlertDialog } =
    useAlertDialog();

  const { showModal, onCloseModal, onOpenModal } = useModal();

  const { displayName: mainTeamName, oid: mainTeamOid } = useAppSelector(
    searchMainTeamOfSubTeam(teamOid),
  );

  const currentTeamInfo = useAppSelector(
    (state) => state.teamPageReducer.teamInfo,
  );

  const { pathname } = useLocation();
  const isSubTeamPage = pathname.includes("sub_teams");
  const [activeSearch, setActiveSearch] = useState(false);
  const [dataFiltered, setDataFiltered] = useState<UserFiltered[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchInputValueDebounced, setSearchInputValueDebounced] =
    useState("");
  const debouncedSearchInputValue = useDebounce(searchInputValueDebounced, 800);
  const [isLoadingAddUserApi, setIsLoadingAddUserApi] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const searchedMembers = useAppSelector(
    (state) => state.teamPageReducer.searchedMembers,
  );
  const currentTeamMembers = useAppSelector(
    (state) => state.teamPageReducer.members,
  );

  const mainTeamMembers = useAppSelector(
    (state) => state.teamPageReducer.mainTeamMembers,
  );

  const isCaseValidationImpossible = useAppSelector(
    (state) => state.teamPageReducer.isCaseValidationImpossible,
  );

  const handleOpenModal = () => {
    if (isSubTeamPage && isCaseValidationImpossible) {
      dispatchImpossibleCaseValidationAlertDialog({
        handleAction: onOpenModal,
      });
    } else {
      onOpenModal();
    }
  };

  const handleCloseModal = () => {
    if (searchedMembers?.length > 0 && !isLoadingAddUserApi) {
      const label = isSubTeamPage ? "la sous-équipe" : "l'équipe";
      const isPlural = searchedMembers.length > 1;
      const plural = isPlural ? "s" : "";
      dispatchAlertDialog({
        title: `Membre${plural} non ajouté${plural} à ${label}`,
        description: (
          <>
            Le{isPlural ? "s" : ""} membre{plural} sélectionné{plural} n'
            {isPlural ? "ont" : "a"} pas été ajouté{plural} à {label}.
            <br />
            Êtes-vous sûr de vouloir quitter cette page ?
          </>
        ),
        handleAction: closeUsersModal,
      });
    } else {
      closeUsersModal();
    }
  };

  const closeUsersModal = () => {
    onCloseModal();
    setSearchInputValue("");
    resetSearchTable();
    handleDeleteAllUsersInCart();
  };

  const onChangeSearchInput = (newValue) => {
    setSearchInputValue(newValue);
    if (!isSubTeamPage) {
      setDataFiltered([]);
    }
    if (newValue.length === 0) {
      resetSearchTable();
    }
  };

  const onEnterSearchInput = (event) => {
    if (event.key === "Enter" && !activeSearch) {
      handleClickSearch();
    }
  };

  const resetSearchTable = () => {
    setDataFiltered([]);
    setActiveSearch(false);
  };

  const NotFoundItemObjectError = {
    name: "error",
    message: MESSAGES.USER_NOT_FOUND,
  } as UserFiltered;

  const fetchSearchUsersByQuery = (query: string) => {
    setActiveSearch(true);
    dispatch(
      getMemberByNniOrEmailAction({
        query: query,
        onSuccessCallback: () => {
          setActiveSearch(false);
        },
        onSetExistedDatas: (data: UserModel[]) => {
          setDataFiltered(sortUsersByName(data));
        },
        onSetNoData: () => {
          setDataFiltered([NotFoundItemObjectError]);
        },
        onFailureCallback: (error) => {
          switch (error?.response?.status) {
            case 404:
              setActiveSearch(false);
              setDataFiltered([NotFoundItemObjectError]);
              break;
            case 400:
              setActiveSearch(false);
              setDataFiltered([
                {
                  name: "error",
                  message: MESSAGES.ADD_USER_FAIL_SEARCHING_MESSAGE,
                } as UserFiltered,
              ]);
              break;
            default:
              console.error(
                "Calling getMemberByNniOrEmail api for searching member in main team",
                error,
              );
          }
        },
      } as any),
    );
  };

  const getMainTeamMemberAlreadyAdded = () =>
    sortUsersByName(
      mainTeamMembers.filter(
        (mainTeamMember) =>
          !currentTeamMembers.some(
            (currentTeamMember) => mainTeamMember.nni === currentTeamMember.nni,
          ),
      ),
    );

  const filterData = (searchInputValue: string, forceQuery: boolean) => {
    setDataFiltered([]);

    const query = searchInputValue ? searchInputValue : null;

    if (!query) {
      setDataFiltered(isSubTeamPage ? getMainTeamMemberAlreadyAdded() : []);
    } else {
      const isQueryDisabled = query.length < 5;
      const searchedData =
        isSubTeamPage && (!forceQuery || isQueryDisabled)
          ? mainTeamMembers.filter(
              (m) =>
                m.nni.toLowerCase().includes(query.toLowerCase()) ||
                m.email.toLowerCase().includes(query.toLowerCase()),
            )
          : [];

      if (searchedData.length > 0) {
        setDataFiltered(sortUsersByName(searchedData));
      } else if (!isQueryDisabled) {
        if (!forceQuery) {
          setActiveSearch(true);
          setSearchInputValueDebounced(query);
        } else {
          fetchSearchUsersByQuery(query);
        }
      }
    }
  };

  const addMember = (member: UserModel) => {
    if (searchInputValue?.length > 0) {
      setSearchInputValue("");
      resetSearchTable();
      searchRef.current?.focus();
    }
    dispatch(addSearchedMember(member));
  };

  const searchedMembersToOidListForRequest = (usersList: UserModel[]) => {
    return usersList.map((u) => u.oid);
  };

  const addUsersToTeams = (teamOids: string[], userOids: string[]) => {
    if ([teamOids, userOids].every(Boolean)) {
      dispatch(
        addUserToTeamAction({
          params: [teamOids, userOids],
          onSuccessCallback: () => {
            dispatchAlertSuccess(
              MESSAGES.ADD_USER_TO_TEAM_SUCCESS_NEED_VALIDATION,
            );
            closeUsersModal();
            setIsLoadingAddUserApi(false);
          },
          onFailureCallback: () => {
            setIsLoadingAddUserApi(false);
          },
        }),
      );
    }
  };

  const addUsersToCurrentTeam = (userOids: string[]) => {
    dispatch(
      addUserToTeamAction({
        params: [[teamOid], userOids],
        onSuccessCallback: () => {
          dispatchAlertSuccess(MESSAGES.ADD_USER_TO_TEAM_SUCCESS);
          closeUsersModal();
          setIsLoadingAddUserApi(false);
        },
        onFailureCallback: () => {
          console.error(
            "Calling the api addUserToTeam in addUsersToCurrentTeam function",
          );
          setIsLoadingAddUserApi(false);
        },
        addMembersTemporarily: true,
        searchedMembers: searchedMembers,
      }),
    );
  };

  const onAddMemberToTeam = () => {
    /**set local state of list teams members of the team */
    /**call api */

    const memberOidExistedInMainTeam = [...searchedMembers]
      .filter((member) => {
        if (
          mainTeamMembers.filter(
            (mainTeamMember) => mainTeamMember.oid === member.oid,
          ).length > 0
        ) {
          return member;
        }
      })
      .map((m) => m.oid);
    const membersHaveNoTeam = [...searchedMembers].filter((member) => {
      if (!memberOidExistedInMainTeam?.includes(member.oid)) return member;
    });
    const memberOidHaveNoTeam = membersHaveNoTeam.map((m) => m.oid);

    if (!isSubTeamPage) {
      setIsLoadingAddUserApi(true);
      addUsersToCurrentTeam(
        searchedMembersToOidListForRequest(searchedMembers),
      );
    } else {
      const description = (
        <>
          {membersHaveNoTeam.length > 1
            ? "Les utilisateurs "
            : "L'utilisateur "}
          <b>{membersHaveNoTeam.map((m) => m.fullName).join(", ")}</b> qui
          <>{membersHaveNoTeam.length > 1 ? " ne sont" : ` n'est`}</> pas dans
          l&apos;équipe mère <b>({mainTeamName})</b> y{" "}
          <>
            {membersHaveNoTeam.length > 1 ? " seront ajoutés" : "sera ajouté"}
          </>{" "}
          si la demande est validée.
        </>
      );
      if (
        memberOidExistedInMainTeam.length > 0 &&
        memberOidHaveNoTeam.length > 0
      ) {
        dispatchAlertDialog({
          title: "Confirmez-vous l'ajout de membre(s) ?",
          description: description,
          titleButtonAction: "Valider",
          handleAction: () => {
            setIsLoadingAddUserApi(true);
            Promise.all([
              addUsersToTeams([teamOid], memberOidExistedInMainTeam), //NOSONAR
              addUsersToTeams([teamOid, mainTeamOid], memberOidHaveNoTeam), //NOSONAR
            ]);
          },
          dataActions: {},
        });
      } else if (memberOidExistedInMainTeam.length === 0) {
        dispatchAlertDialog({
          title: "Confirmez-vous l'ajout de membre(s) ?",
          description: description,
          titleButtonAction: "Valider",
          handleAction: () => {
            setIsLoadingAddUserApi(true);
            addUsersToTeams([teamOid, mainTeamOid], memberOidHaveNoTeam);
          },
          dataActions: {},
        });
      } else if (memberOidHaveNoTeam.length === 0) {
        setIsLoadingAddUserApi(true);
        addUsersToTeams([teamOid], memberOidExistedInMainTeam);
      }
    }
  };

  const getModalTitle = (displayName: string) => {
    return `Ajout de membres dans ${isSubTeamPage ? "la sous-équipe" : "l'équipe"} ${displayName}`;
  };

  const handleClickSearch = () => filterData(searchInputValue, true);

  const userAlreadyExistMessage = isSubTeamPage
    ? MESSAGES.USER_EXISTED_IN_SUB_TEAM
    : MESSAGES.USER_EXISTED_IN_TEAM;

  const handleDeleteUserInCart = (oid: string) =>
    dispatch(deleteSearchedMember(oid));

  const handleDeleteAllUsersInCart = () => dispatch(resetSearchedMember());

  useEffect(() => {
    if (debouncedSearchInputValue) {
      fetchSearchUsersByQuery(debouncedSearchInputValue);
    }
    return () => {
      setActiveSearch(false);
      setSearchInputValueDebounced("");
    };
  }, [debouncedSearchInputValue]);

  useEffect(() => {
    filterData(searchInputValue, false);
  }, [searchInputValue]);

  useEffect(() => {
    if (isSubTeamPage && showModal) {
      filterData(searchInputValue, false);
    }
  }, [showModal]);

  return (
    <>
      <PlusIconWrapper>
        <CustomFaCirclePlus
          data-testid="open-modal"
          onClick={handleOpenModal}
        />
      </PlusIconWrapper>
      <Modal
        visible={showModal}
        onCancel={handleCloseModal}
        title={<>{getModalTitle(currentTeamInfo?.displayName)}</>}
        isFullScreen
        headerDivider
      >
        <CartComponent
          data={searchedMembers}
          columns={usersSearchColumns}
          customNoContentTableName={"Aucun membre ajouté"}
          deleteCartElement={handleDeleteUserInCart}
          deleteAllCartElements={handleDeleteAllUsersInCart}
          handleValidCart={onAddMemberToTeam}
          isLoadingAddElementApi={isLoadingAddUserApi}
          cartLabel="Membres"
        >
          <div className="formWrapperPosition">
            <SearchIconWrapper
              onClick={handleClickSearch}
              aria-label="search-user-icon"
              $isreadyforsearch={searchInputValue?.length >= 5}
            >
              <FaSearch className="searchIcon" />
            </SearchIconWrapper>
            <TextInput
              innerRef={searchRef}
              placeholder={"Rechercher par NNI ou email..."}
              onChange={(e) => onChangeSearchInput(e.target.value)}
              onKeyDown={onEnterSearchInput}
              value={searchInputValue}
              autoFocus
            />
          </div>
          <SlideWrapper>
            {activeSearch && <LoadingWithDivComponent />}
            <SearchedUsersSlide
              dataFiltered={dataFiltered}
              dataAdded={currentTeamMembers}
              dataBeingAdded={searchedMembers}
              addMember={addMember}
              userAlreadyExistMessage={userAlreadyExistMessage}
            />
          </SlideWrapper>
        </CartComponent>
      </Modal>
    </>
  );
};

export default UsersSearchModal;
