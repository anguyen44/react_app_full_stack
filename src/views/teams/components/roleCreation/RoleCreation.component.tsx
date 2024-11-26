import { AiOutlineClose, CustomFaCirclePlus, FaSearch } from "icons";
import { useEffect, useRef, useState } from "react";
import { AddButton } from "shared/components/CustomButtons/CustomButtons";
import { NumberCharactersWrapper } from "shared/components/EditTextArea/EditTextArea";
import { TextInput } from "shared/components/input/input.component";
import LoadingComponent from "shared/components/loading/Loading.component";
import { LoadingWrapperCustom } from "shared/components/loading/Loading.styled";
import Modal from "shared/components/modal/modal.component";
import PlusIconWrapper from "shared/components/PlusIconWrapper/PlusIconWrapper";
import { BlueSectionTitle } from "shared/components/text/text.component";
import MESSAGES from "shared/config/constants/message.config";
import { useModal } from "shared/hooks/useModal";
import PortfolioService from "shared/services/portfolio/portfolio.service";
import { createNewRoleAction } from "shared/store/sagas/role.saga";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";

import {
  PortfolioItemContent,
  PortfolioItemDelete,
  PortfolioSearchIconSectionWrapper,
  SelectedPortfolioItem,
  SelectedPortfolioItemWrapper,
} from "./RoleCreation.styled";
import SearchingPortfoliosSlide, {
  FilteringPortfolios,
} from "./searchingPortfoliosSlide/SearchingRolesSlide.component";
import { useAppDispatch, useAppSelector } from "shared/store";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";
import { sortItemsByDisplayName } from "shared/utils/sort.utils";
import { SearchIconWrapper } from "shared/components/searchItems/searchItems.styled";
import {
  DescriptionDetail,
  InputContainer,
  InvalidMessageWrapper,
} from "../subTeams/SubTeams.styled";
import { TextareaInput } from "shared/components/input/textarea.component";
import useDebounce from "shared/hooks/useDebounce";

const initialValues = {
  roleDisplayName: "",
  roleDescription: "",
  rolePortfolio: "",
};

interface RoleCreationComponentProps {
  isPortfolioPage?: boolean;
}

const RoleCreationComponent = ({
  isPortfolioPage = false,
}: RoleCreationComponentProps) => {
  const refPortfoliosSearchingBox = useRef(null);
  const { showModal, onCloseModal, onOpenModal } = useModal();
  const [values, setValues] = useState(initialValues);

  const [activeSearch, setActiveSearch] = useState(false);
  const [filteringPortfolios, setFilteringPortfolios] = useState<
    FilteringPortfolios[]
  >([]);
  const [waitingPortfolio, setWaitingPortfolio] = useState<
    FilteringPortfolios[]
  >([]);
  const [isLoadingAddNewRoleApi, setIsLoadingAddNewRoleApi] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidPortfolio, setIsValidPortfolio] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [
    searchPortfolioInputValueDebounced,
    setSearchPortfolioInputValueDebounced,
  ] = useState("");
  const debouncedSearchPortfolioInputValue = useDebounce(
    searchPortfolioInputValueDebounced,
    800,
  );

  const modeHavingWaitingPorfolio =
    waitingPortfolio.length > 0 && values.rolePortfolio === "";

  const { oid: teamOid, name: teamName } = useAppSelector(
    (state) => state.teamPageReducer.teamInfo,
  );

  const regexConfig = useAppSelector(
    (state) => state.globalUiReducer.regexConfig,
  );
  const regexRoleName = new RegExp(regexConfig.regexName);
  const regexPortfolioName = new RegExp(regexConfig.regexDisplayName);
  const regexDescription = new RegExp(regexConfig.regexDescription);

  const { dispatchAlertSuccess, dispatchAlertInfo } = useAlertCard();

  const { dispatchImpossibleCaseValidationAlertDialog } = useAlertDialog();

  const dispatch = useAppDispatch();

  const setInitDataEntry = () => {
    setValues(initialValues);
  };

  const handleCloseRolesModal = () => {
    onCloseModal();
    setInitDataEntry();
    resetSearchTableSlide();
    setWaitingPortfolio([]);
    setIsLoadingAddNewRoleApi(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    const validationRules = {
      roleDisplayName: setIsValidName,
      rolePortfolio: setIsValidPortfolio,
      roleDescription: setIsValidDescription,
    };

    const regexRules = {
      roleDisplayName: regexRoleName,
      rolePortfolio: regexPortfolioName,
      roleDescription: regexDescription,
    };

    if (validationRules[name]) {
      validationRules[name](regexRules[name].test(value));
    }
  };

  const onEnterSearchInput = (event) => {
    if (event.key === "Enter") {
      onSearchPortfolio(values.rolePortfolio);
    }
  };

  const handleCreateRole = () => {
    if (waitingPortfolio[0].isCaseValidationImpossible) {
      dispatchImpossibleCaseValidationAlertDialog({
        handleAction: onCreateRole,
        descriptionLabel:
          "Attention, personne n'a été déclaré propriétaire de la ressource (INS) qui sera associée à ce rôle. Les demandes d'ajout de permissions à ce rôle risquent de ne pas aboutir.",
        isPortfolio: true,
      });
    } else {
      onCreateRole();
    }
  };

  const onCreateRole = () => {
    setIsLoadingAddNewRoleApi(true);
    dispatch(
      createNewRoleAction({
        params: [
          values.roleDisplayName.trim(),
          values.roleDescription.trim(),
          waitingPortfolio[0].oid,
          teamOid,
          teamName,
        ],
        onSuccessCallback: () => {
          setIsLoadingAddNewRoleApi(false);
          handleCloseRolesModal();
          dispatchAlertSuccess(
            MESSAGES.CREATE_NEW_ROLE_SUCCESS.format({
              roleDisplayName: values.roleDisplayName.trim(),
            }) as string,
          );
        },
        onFailureCallback: () => {
          setIsLoadingAddNewRoleApi(false);
        },
        teamOid: teamOid,
      }),
    );
  };

  const onSearchPortfolio = (keyWords) => {
    setActiveSearch(true);
    setFilteringPortfolios([]);
    if (keyWords?.length >= 3) {
      if (isValidPortfolio) {
        PortfolioService.getPortfoliosByQuery(keyWords)
          .then((res) => {
            if (res.length) {
              setFilteringPortfolios(
                sortItemsByDisplayName(res as FilteringPortfolios[]),
              );
            } else {
              setFilteringPortfolios([
                {
                  name: "error",
                  message: MESSAGES.NOT_FOUND,
                } as FilteringPortfolios,
              ]);
            }
            setActiveSearch(false);
          })
          .catch((error) => {
            if (error.response?.data.status === 400) {
              showBadRequestError();
            }
            console.error(
              "on searching portfolios by name or display name ERROR",
              error.response,
            );
          });
      } else {
        showBadRequestError();
      }
    } else {
      setFilteringPortfolios([
        { name: "error", message: MESSAGES.EMPTY_ENTRY } as FilteringPortfolios,
      ]);
      setActiveSearch(false);
    }
  };

  const showBadRequestError = () => {
    setFilteringPortfolios([
      {
        name: "error",
        message: MESSAGES.SEARCH_PORTFOLIO_BAD_REQUEST,
      } as FilteringPortfolios,
    ]);
    setActiveSearch(false);
  };

  const addTemporaryPorfolio = (portfolioItem: FilteringPortfolios) => {
    setWaitingPortfolio([
      { ...portfolioItem, getFullName: portfolioItem.getFullName },
    ]);
    setFilteringPortfolios([]);
    setValues({
      ...values,
      rolePortfolio: "",
    });
  };

  const removePortfolioItem = (portfolioItem) => {
    setWaitingPortfolio([
      ...waitingPortfolio.filter((item) => item.oid !== portfolioItem.oid),
    ]);
  };

  const resetSearchTableSlide = () => {
    setFilteringPortfolios([]);
    setActiveSearch(false);
  };

  const handleClickOutSideOfSearchingBox = (e) => {
    if (
      refPortfoliosSearchingBox.current &&
      !refPortfoliosSearchingBox.current.contains(e.target)
    ) {
      resetSearchTableSlide();
    }
  };

  const handleOpenModal = () => {
    if (isPortfolioPage) {
      dispatchAlertInfo(MESSAGES.UNAVAILABLE_FUNCTIONALITY);
    } else {
      onOpenModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSideOfSearchingBox, true);
    return () =>
      document.removeEventListener("click", handleClickOutSideOfSearchingBox);
  }, []);

  useEffect(() => {
    setFilteringPortfolios([]);
    if (values.rolePortfolio?.length >= 3) {
      setActiveSearch(true);
      setSearchPortfolioInputValueDebounced(values.rolePortfolio);
    }
  }, [values.rolePortfolio]);

  useEffect(() => {
    if (debouncedSearchPortfolioInputValue) {
      onSearchPortfolio(debouncedSearchPortfolioInputValue);
    }
    return () => {
      setActiveSearch(false);
      setSearchPortfolioInputValueDebounced("");
    };
  }, [debouncedSearchPortfolioInputValue]);

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
        onCancel={handleCloseRolesModal}
        title={<p style={{ margin: 0 }}>Création de rôle</p>}
        width={600}
        headerDivider
        footer={
          <div className="addButton">
            {values.roleDisplayName &&
            waitingPortfolio.length &&
            values.roleDescription &&
            !isLoadingAddNewRoleApi &&
            isValidName &&
            isValidDescription ? (
              <>
                <AddButton
                  variant="contained"
                  color="info"
                  data-testid="ajouter-button-api"
                  onClick={handleCreateRole}
                >
                  Créer le rôle
                </AddButton>
              </>
            ) : (
              <AddButton variant="contained" disabled>
                Créer le rôle
              </AddButton>
            )}
            <LoadingWrapperCustom>
              {isLoadingAddNewRoleApi && <LoadingComponent />}
            </LoadingWrapperCustom>
          </div>
        }
      >
        <div>
          <BlueSectionTitle>
            <div className="mb-10">
              <span className="colr-red">*</span> Nom du rôle
            </div>
          </BlueSectionTitle>

          <InputContainer>
            <TextInput
              data-testid="nameInput"
              onChange={handleInputChange}
              placeholder="Nom du rôle"
              required
              maxLength={255}
              isValidInput={isValidName || !values.roleDisplayName}
              handleFocus={true}
              name="roleDisplayName"
              value={values.roleDisplayName}
            />

            {!isValidName && values.roleDisplayName?.length > 0 && (
              <InvalidMessageWrapper>
                {MESSAGES.CREATE_SUBTEAM_NAME_REGEX_ERROR}
              </InvalidMessageWrapper>
            )}
          </InputContainer>
        </div>

        <div>
          <BlueSectionTitle>
            <div className="mb-10 mt-15">
              <span className="colr-red">*</span> INS ou ressource transverse
            </div>
          </BlueSectionTitle>
          <PortfolioSearchIconSectionWrapper
            active={values.rolePortfolio ? 1 : 0}
            className="formWrapperPosition"
            ref={refPortfoliosSearchingBox}
          >
            {!modeHavingWaitingPorfolio && (
              <SearchIconWrapper
                onClick={() => onSearchPortfolio(values.rolePortfolio)}
                $isreadyforsearch={
                  isValidPortfolio && values.rolePortfolio?.length >= 3
                }
                data-testid="portfoliosSearchIcon"
              >
                <FaSearch size={18} className="searchIcon" />
              </SearchIconWrapper>
            )}
            <TextInput
              placeholder={
                !modeHavingWaitingPorfolio ? "Rechercher une ressource" : ""
              }
              onChange={handleInputChange}
              onKeyDown={onEnterSearchInput}
              disabled={modeHavingWaitingPorfolio}
              value={values.rolePortfolio}
              name="rolePortfolio"
              handleFocus={true}
              isValidInput={isValidPortfolio || !values.rolePortfolio}
            />
            <SearchingPortfoliosSlide
              activeSearch={activeSearch}
              dataFiltered={filteringPortfolios}
              addItemFunction={addTemporaryPorfolio}
            />
            {/*BEGIN - waiting selected portfolio items on the portfolio form */}
            {waitingPortfolio && waitingPortfolio.length > 0 && (
              <SelectedPortfolioItemWrapper>
                <SelectedPortfolioItem>
                  <PortfolioItemContent>
                    {waitingPortfolio[0].getFullName()}
                  </PortfolioItemContent>
                  <PortfolioItemDelete>
                    <AiOutlineClose
                      onClick={() => removePortfolioItem(waitingPortfolio[0])}
                      aria-label="removePortfolioItem"
                    />
                  </PortfolioItemDelete>
                </SelectedPortfolioItem>
              </SelectedPortfolioItemWrapper>
            )}
            {/*END - waiting selected portfolio items on the portfolio form */}
          </PortfolioSearchIconSectionWrapper>
        </div>

        <div>
          <BlueSectionTitle>
            <div className="mb-10 mt-15">
              <span className="colr-red">*</span> Description
            </div>
          </BlueSectionTitle>

          <InputContainer>
            <TextareaInput
              data-testid="roleDescriptionInput"
              placeholder="Description du rôle"
              onChange={handleInputChange}
              className="formWrapper"
              maxLength={255}
              name="roleDescription"
              isValidInput={isValidDescription || !values.roleDescription}
            />

            <DescriptionDetail>
              {!isValidDescription && values.roleDescription?.length > 0 && (
                <InvalidMessageWrapper>
                  {MESSAGES.CREATE_SUBTEAM_DESCRIPTION_REGEX_ERROR}
                </InvalidMessageWrapper>
              )}
              <NumberCharactersWrapper>
                {values.roleDescription ? values.roleDescription.length : 0}/255
              </NumberCharactersWrapper>
            </DescriptionDetail>
          </InputContainer>
        </div>
      </Modal>
    </>
  );
};

export default RoleCreationComponent;
