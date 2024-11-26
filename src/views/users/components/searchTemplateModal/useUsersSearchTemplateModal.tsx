import { CustomFaCirclePlus, FaSearch } from "icons";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "shared/components/input/input.component";
import { LoadingWithDivComponent } from "shared/components/loading/Loading.component";
import Modal from "shared/components/modal/modal.component";
import PlusIconWrapper from "shared/components/PlusIconWrapper/PlusIconWrapper";
import MESSAGES from "shared/config/constants/message.config";
import { useModal } from "shared/hooks/useModal";
import { getMemberByNniOrEmailAction } from "shared/store/sagas/user.saga";

import SearchedUsersSlide from "views/teams/components/usersSearchModal/searchedUsersSlide/searchedUsersSlide.component";
import { useAppDispatch, useAppSelector } from "shared/store";
import { UserModel } from "shared/model/user.model";
import {
  OrgPageReducers,
  OrgPageState,
} from "shared/store/slices/common/orgPageReducers";
import { Slice } from "@reduxjs/toolkit";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import CartComponent from "shared/components/cart/cart.component";
import {
  SearchIconWrapper,
  SlideWrapper,
} from "shared/components/searchItems/searchItems.styled";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";
import useDebounce from "shared/hooks/useDebounce";

interface UseUsersSearchTemplateModalProps<S extends OrgPageState> {
  currentUsers: UserModel[];
  reducerState: S;
  orgSlice: Slice<OrgPageReducers>;
  isPortfolioPage: boolean;
  isApproverSearchModal?: boolean;
}

const useUsersSearchTemplateModal = <S extends OrgPageState>({
  currentUsers,
  reducerState,
  orgSlice,
  isPortfolioPage,
  isApproverSearchModal = false,
}: UseUsersSearchTemplateModalProps<S>) => {
  const dispatch = useAppDispatch();

  const [isSearching, setIsSearching] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchInputValueDebounced, setSearchInputValueDebounced] =
    useState("");
  const debouncedSearchInputValue = useDebounce(searchInputValueDebounced, 800);
  const searchRef = useRef<HTMLInputElement>(null);

  const { searchedMembers: usersInDemande } = reducerState;
  const { addSearchedMember, deleteSearchedMember } = orgSlice.actions;
  const { resetSearchedMember } = orgSlice.actions as any;

  const currentUserOid = useAppSelector((state) => state.userReducer.user?.oid);

  const { showModal, onCloseModal, onOpenModal } = useModal();

  const { dispatchAlertError } = useAlertCard();

  const { dispatchAlertDialog } = useAlertDialog();

  const NotFoundItemObjectError = {
    name: "error",
    message: MESSAGES.USER_NOT_FOUND,
  };

  const FailUsersSearch = {
    name: "error",
    message: MESSAGES.ADD_USER_FAIL_SEARCHING_MESSAGE,
  };

  const handleUsersSearchModal = () => {
    if (usersInDemande?.length > 0 && !isSearching) {
      const isPlural = usersInDemande.length > 1;
      const plural = isPlural ? "s" : "";
      dispatchAlertDialog({
        title: `Suppléant${plural} non ajouté${plural} à l'équipe`,
        description: (
          <>
            Le{isPlural ? "s" : ""} suppléant{plural} sélectionné{plural} n'
            {isPlural ? "ont" : "a"} pas été ajouté{plural} à l'équipe.
            <br />
            Êtes-vous sûr de vouloir quitter cette page ?
          </>
        ),
        handleAction: onCloseUsersSearchModal,
      });
    } else {
      onCloseUsersSearchModal();
    }
  };

  const onCloseUsersSearchModal = () => {
    resetSearchSectionStatus();
    onCloseModal();
    dispatch(resetSearchedMember());
  };

  const toInitialSearchSectionStatus = () => {
    setIsSearching(false);
    setSearchedData([]);
  };

  const resetSearchSectionStatus = () => {
    setSearchInputValue("");
    toInitialSearchSectionStatus();
  };

  const onInputChange = (e) => {
    const { value } = e.target;
    setSearchInputValue(value);
    if (!value) {
      toInitialSearchSectionStatus();
    }
  };

  const onClickOnSearchIcon = () => {
    fetchUsersByQuery(searchInputValue);
  };

  const onEnterSearchInput = (event) => {
    if (event.key === "Enter") {
      onClickOnSearchIcon();
    }
  };

  const fetchUsersByQuery = (query: string) => {
    if (query?.length >= 5) {
      setSearchInputValueDebounced("");
      setSearchedData([]);
      setIsSearching(true);
      dispatch(
        getMemberByNniOrEmailAction({
          query: query,
          onSuccessCallback: () => {
            setIsSearching(false);
          },
          onSetExistedDatas: (data) => {
            setSearchedData(data);
          },
          onSetNoData: () => {
            setSearchedData([NotFoundItemObjectError]);
          },
          onFailureCallback: (error) => {
            switch (error?.response?.status) {
              case 404:
                setIsSearching(false);
                setSearchedData([NotFoundItemObjectError]);
                break;
              case 400:
                setIsSearching(false);
                setSearchedData([FailUsersSearch]);
                break;
              default:
                console.error(
                  "Calling getMemberByNniOrEmail api for searching users in appovers tag",
                  error,
                );
            }
          },
        } as any),
      );
    } else {
      toInitialSearchSectionStatus();
    }
  };

  const userAlreadyExistMessage = isApproverSearchModal
    ? !isPortfolioPage
      ? MESSAGES.APPROVER_EXISTED_IN_TEAM
      : MESSAGES.APPROVER_EXISTED_IN_PORTFOLIO
    : MESSAGES.USER_EXISTED_IN_TEAM;

  const checkEligibilityOfAddingAnUserInDemande = (
    user: UserModel,
    executableCallBack: VoidFunction,
  ) => {
    const fullName = user.getFullName();
    if (usersInDemande.filter((m) => m.nni === user.nni).length > 0) {
      /**add condition check existed users in demande*/
      dispatchAlertError(
        MESSAGES.USER_ADDED_IN_WAITING_LIST.format({ fullName }) as string,
        5000,
      );
    } else if (currentUsers.filter((m) => m.nni === user.nni).length > 0) {
      /**add condition checking existed uses in the org as a member or a approver*/
      dispatchAlertError(
        userAlreadyExistMessage.format({ fullName }) as string,
        5000,
      );
    } else if (isApproverSearchModal && currentUserOid === user.oid) {
      dispatchAlertError(
        "Il n'est pas possible de vous désigner vous-même comme suppléant.",
        5000,
      );
    } else {
      /**When user is eligible for being added in the users in demande list*/
      executableCallBack();
    }
  };

  const addAnUserInDemande = (user: UserModel) => {
    resetSearchSectionStatus();
    searchRef.current?.focus();
    checkEligibilityOfAddingAnUserInDemande(user, () => {
      dispatch(addSearchedMember(user));
    });
  };

  const handleDeleteUserInCart = (oid: string) => {
    dispatch(deleteSearchedMember(oid));
  };

  const handleDeleteAllUsersInCart = () => dispatch(resetSearchedMember());

  useEffect(() => {
    setSearchInputValueDebounced(searchInputValue);
    setSearchedData([]);
    setIsSearching(searchInputValue?.length >= 5);
  }, [searchInputValue]);

  useEffect(() => {
    if (debouncedSearchInputValue) {
      fetchUsersByQuery(debouncedSearchInputValue);
    }
    return () => {
      setIsSearching(false);
      setSearchInputValueDebounced("");
    };
  }, [debouncedSearchInputValue]);

  const render = (
    title: string,
    handleValidCart: VoidFunction,
    isLoadingAddElementApi: boolean,
  ) => {
    return (
      <>
        <PlusIconWrapper>
          <CustomFaCirclePlus data-testid="open-modal" onClick={onOpenModal} />
        </PlusIconWrapper>
        <Modal
          visible={showModal}
          onCancel={handleUsersSearchModal}
          title={<>{title}</>}
          isFullScreen
          headerDivider
        >
          <CartComponent
            data={usersInDemande}
            columns={usersSearchColumns}
            customNoContentTableName={"Aucun suppléant ajouté"}
            deleteCartElement={handleDeleteUserInCart}
            deleteAllCartElements={handleDeleteAllUsersInCart}
            handleValidCart={handleValidCart}
            isLoadingAddElementApi={isLoadingAddElementApi}
            cartLabel="Suppléants"
          >
            <div className="formWrapperPosition">
              <SearchIconWrapper
                onClick={onClickOnSearchIcon}
                aria-label="search-user-icon"
                $isreadyforsearch={searchInputValue?.length >= 5}
              >
                <FaSearch className="searchIcon" />
              </SearchIconWrapper>
              <TextInput
                innerRef={searchRef}
                placeholder={"Rechercher par NNI ou email..."}
                onChange={onInputChange}
                onKeyDown={onEnterSearchInput}
                value={searchInputValue}
                autoFocus
              />
            </div>
            <SlideWrapper>
              {isSearching && <LoadingWithDivComponent />}
              <SearchedUsersSlide
                dataFiltered={searchedData}
                dataAdded={currentUsers}
                dataBeingAdded={usersInDemande}
                addMember={addAnUserInDemande}
                userAlreadyExistMessage={userAlreadyExistMessage}
              />
            </SlideWrapper>
          </CartComponent>
        </Modal>
      </>
    );
  };

  return { render, usersInDemande, onCloseUsersSearchModal };
};

export const usersSearchColumns: Column[] = [
  {
    name: "Nom & Prénom",
    field: "displayName",
    width: "25%",
    customField: (user: UserModel) => user.getFullName(),
  },
  {
    name: "NNI",
    field: "nni",
    width: "20%",
  },
  { name: "Email", field: "email", width: "45%" },
];

export default useUsersSearchTemplateModal;
