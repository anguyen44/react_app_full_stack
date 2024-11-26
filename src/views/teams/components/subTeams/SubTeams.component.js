import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { CustomFaCirclePlus, FaTrash } from "icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomAlert from "shared/components/customAlert/customAlert.component";
import { AddButton } from "shared/components/CustomButtons/CustomButtons";
import { CustomPaper } from "shared/components/CustomPaper/CustomPaper";
import {
  CustomContentTableCell,
  CustomHeadTableCell,
  CustomNoContentTableCell,
} from "shared/components/CustomTableCells/CustomTableCells";
import { NumberCharactersWrapper } from "shared/components/EditTextArea/EditTextArea";
import { TextInput } from "shared/components/input/input.component";
import { TextareaInput } from "shared/components/input/textarea.component";
import ItemStatusComponent from "shared/components/itemDetails/itemInfos/itemStatus.component";
import LoadingComponent from "shared/components/loading/Loading.component";
import Modal from "shared/components/modal/modal.component";
import MoreDescription from "shared/components/moreDescription/moreDescription";
import PlusIconWrapper from "shared/components/PlusIconWrapper/PlusIconWrapper";
import TableFooter from "shared/components/Table/TableFooter";
import { BlueSectionTitle } from "shared/components/text/text.component";
import MESSAGES from "shared/config/constants/message.config";
import { SUB_TEAMS_PATH } from "shared/config/constants/path.config";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";
import { usePagination } from "shared/hooks/usePagination";
import { useSnackbar } from "shared/hooks/useSnackbar";
import TeamService from "shared/services/team/team.service";
import { useAppSelector, useShallowEqualSelector } from "shared/store";
import { createSubTeamAction } from "shared/store/sagas/team.saga";
import { getSortedSubTeamsByTeamOid } from "shared/store/selectors/teams.selector";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";
import { removeCheckedTeam } from "shared/store/slices/teamMenu/teamMenu.slice";

import {
  ActionButtonsWrapper,
  ContentItemTableRow,
  DescriptionDetail,
  InputContainer,
  InvalidMessageWrapper,
  ModalWrapper,
  SubTeamDeleteIconWrapper,
  SubTeamsTableHead,
  SubTeamsWrapper,
  WrapButton,
} from "./SubTeams.styled";

function SubTeamsComponent({
  teamOid,
  confirmRemoveSubTeam,
  isLoadingdeleteSubTeamInTeamByOidList,
}) {
  const { readOnly, isLoadingPage } = useAppSelector(
    (state) => state.teamPageReducer,
  );

  const regexConfig = useAppSelector(
    (state) => state.globalUiReducer.regexConfig,
  );

  const regexName = new RegExp(regexConfig.regexName);
  const regexDescription = new RegExp(regexConfig.regexDescription);

  const writingModeEnable = !readOnly && !isLoadingPage;

  const deleteIconRef = useRef({});

  const { isActive, message, alertType, openSnackBar, closeSnackBar } =
    useSnackbar();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    countedListForShowing,
    setPage,
    rowsPerPageOptions,
  } = usePagination(TablePreferencesEnum.SUBTEAMS);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { dispatchAlertDialog } = useAlertDialog();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputData, setInputData] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [textAreaData, setTextAreaData] = useState(false);

  const subTeams = useShallowEqualSelector(getSortedSubTeamsByTeamOid(teamOid));

  const checkedTeamsList = useSelector(
    (state) => state.teamMenuReducer.checkedSubMenu,
  );

  useEffect(() => {
    setPage(0);
  }, [teamOid]);

  useEffect(() => {
    if (!writingModeEnable) {
      deleteIconRef.current = {};
    }
  }, [writingModeEnable]);

  const hideSubMenu = (oidTeam) => {
    if (checkedTeamsList.includes(oidTeam)) {
      dispatch(removeCheckedTeam(oidTeam));
    }
  };

  const onClickSubTeam = (oidTeam) => {
    navigate(`${SUB_TEAMS_PATH}/${oidTeam}`);
  };

  const handleCloseRolesModal = () => {
    handleToggleModal();
    setInputData(false);
    setTextAreaData(false);
  };

  const handleToggleModal = () => setIsModalVisible((prev) => !prev);

  const handleCreateSubTeam = () => {
    handleToggleModal();
    dispatch(
      createSubTeamAction({
        teamOid,
        name: inputData.trim(),
        description: textAreaData.trim(),
      }),
    );
  };

  const removeSubTeam = ({ subTeamOid, displayName }) => {
    hideSubMenu(teamOid);
    confirmRemoveSubTeam(subTeamOid, displayName);
  };

  const isSubteamDeleteable = (subTeamOid) => {
    return TeamService.verifyDeletableSubTeam(subTeamOid)
      .then((res) => res.data)
      .catch((error) => {
        console.error(
          "getTeamByOid calling in error (in function isSubteamDeleteable)",
          error,
        );
      });
  };

  const handleDelete = async ({ subTeamOid, displayName }) => {
    let isDeletable = await isSubteamDeleteable(subTeamOid);
    if (!isDeletable) {
      openSnackBar(`${MESSAGES.DELETE_SUB_TEAM_ERROR}`, "info");
    } else {
      dispatchAlertDialog({
        title: "Confirmez-vous la suppression de la sous équipe?",
        description: (
          <>
            {"Si vous confirmez, la sous équipe sera définitivement supprimée."}
            <br />
            Êtes-vous sûr de vouloir supprimer ?
          </>
        ),
        handleAction: removeSubTeam,
        dataActions: { subTeamOid, displayName },
      });
    }
  };

  function getSubTeamAction(subTeamOid, subTeamDisplayName, subTeamName) {
    return (
      <ActionButtonsWrapper>
        {isLoadingdeleteSubTeamInTeamByOidList?.includes(subTeamOid) ? (
          <LoadingComponent size={12} padding={"9px"} />
        ) : (
          <SubTeamDeleteIconWrapper
            ref={(el) => {
              if (el) {
                deleteIconRef.current[subTeamName] = el;
              }
            }}
            onClick={() =>
              handleDelete({
                subTeamOid,
                subTeamDisplayName,
              })
            }
          >
            <FaTrash
              data-testid={`deleteSubTeamBtn-${subTeamOid}`}
              className="deleteIcon"
            />
          </SubTeamDeleteIconWrapper>
        )}
      </ActionButtonsWrapper>
    );
  }

  const handleChangeName = (e) => {
    const value = e.target.value;
    setInputData(value);
    setIsValidName(regexName.test(value));
  };

  const handleChangeDescription = (e) => {
    const value = e.target.value;
    setTextAreaData(e.target.value);
    setIsValidDescription(regexDescription.test(value));
  };

  return (
    <>
      <CustomAlert
        {...{
          open: isActive,
          handleCloseAlert: closeSnackBar,
          alertMessage: message,
          type: alertType,
        }}
      />
      <Modal
        title={<>Création de sous-équipe</>}
        visible={isModalVisible}
        onCancel={handleCloseRolesModal}
        width={600}
      >
        <ModalWrapper className="formWrapperPosition">
          <BlueSectionTitle>
            <div className="mb-10">
              <span className="colr-red">*</span> Nom de la sous-équipe
            </div>
          </BlueSectionTitle>

          <InputContainer>
            <TextInput
              data-testid="nameInput"
              margin="normal"
              variant="outlined"
              onChange={handleChangeName}
              placeholder="Saisir le nom de votre sous-équipe"
              required
              maxLength={255}
              isValidInput={isValidName}
              handleFocus={true}
            />

            {!isValidName && (
              <InvalidMessageWrapper>
                {MESSAGES.CREATE_SUBTEAM_NAME_REGEX_ERROR}
              </InvalidMessageWrapper>
            )}
          </InputContainer>

          <BlueSectionTitle>
            <div className="mb-10">
              <span className="colr-red">*</span> Description de la sous-équipe
            </div>
          </BlueSectionTitle>

          <InputContainer>
            <TextareaInput
              data-testid="descriptionInput"
              placeholder="Saisir la description de votre sous-équipe"
              onChange={handleChangeDescription}
              className="formWrapper"
              maxLength={255}
              isValidInput={isValidDescription}
            />

            <DescriptionDetail>
              {!isValidDescription && (
                <InvalidMessageWrapper>
                  {MESSAGES.CREATE_SUBTEAM_DESCRIPTION_REGEX_ERROR}
                </InvalidMessageWrapper>
              )}
              <NumberCharactersWrapper>
                {textAreaData ? textAreaData.length : 0}/255
              </NumberCharactersWrapper>
            </DescriptionDetail>
          </InputContainer>

          <WrapButton>
            {inputData && textAreaData && isValidName && isValidDescription ? (
              <AddButton
                variant="contained"
                onClick={handleCreateSubTeam}
                color="info"
                data-testid="handleCreateSubTeamButton"
              >
                Créer
              </AddButton>
            ) : (
              <AddButton variant="contained" disabled>
                Créer
              </AddButton>
            )}
          </WrapButton>
        </ModalWrapper>
      </Modal>
      {writingModeEnable && (
        <PlusIconWrapper padding={"0"}>
          <CustomFaCirclePlus
            data-testid="open-modal"
            onClick={handleToggleModal}
          />
        </PlusIconWrapper>
      )}
      <SubTeamsWrapper>
        <TableContainer component={CustomPaper}>
          <Table sx={{ minWidth: 650 }}>
            <SubTeamsTableHead>
              <TableRow>
                <CustomHeadTableCell width="30%" color="#fff" fontWeight="600">
                  Nom
                </CustomHeadTableCell>
                <CustomHeadTableCell width="50%" color="#fff" fontWeight="600">
                  Description
                </CustomHeadTableCell>
                <CustomHeadTableCell width="20%" color="#fff" fontWeight="600">
                  Statut
                </CustomHeadTableCell>
                {writingModeEnable && (
                  <CustomHeadTableCell
                    align="center"
                    color="#fff"
                    fontWeight="600"
                  >
                    Action
                  </CustomHeadTableCell>
                )}
              </TableRow>
            </SubTeamsTableHead>
            <TableBody>
              <>
                {subTeams?.length > 0 ? (
                  <>
                    {countedListForShowing(subTeams).map((subTeam) => (
                      <ContentItemTableRow
                        key={subTeam.name}
                        onClick={(e) => {
                          const { target } = e;
                          // const target = e.target as HTMLButtonElement;
                          if (target) {
                            if (target.dataset.name === "descriptionCollapse")
                              return;
                          }
                          if (Object.keys(deleteIconRef?.current).length > 0) {
                            if (
                              !deleteIconRef.current[subTeam.name]?.contains(
                                e.target,
                              )
                            ) {
                              onClickSubTeam(subTeam.oid);
                            }
                          } else {
                            onClickSubTeam(subTeam.oid);
                          }
                        }}
                      >
                        <CustomContentTableCell>
                          {subTeam.displayName}
                        </CustomContentTableCell>
                        <CustomContentTableCell width={"20%"} $isWordBreak>
                          <MoreDescription description={subTeam.description} />
                        </CustomContentTableCell>
                        <CustomContentTableCell>
                          <ItemStatusComponent
                            isActive={subTeam.isActive}
                            style={{ marginLeft: "12px" }}
                          />
                        </CustomContentTableCell>
                        {writingModeEnable && (
                          <TableCell align="center">
                            {getSubTeamAction(
                              subTeam.oid,
                              subTeam.displayName,
                              subTeam.name,
                            )}
                          </TableCell>
                        )}
                      </ContentItemTableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <CustomNoContentTableCell colSpan="100%" align="center">
                      Aucune sous-équipe
                    </CustomNoContentTableCell>
                  </TableRow>
                )}
              </>
            </TableBody>
            <TableFooter
              count={subTeams.length}
              {...{
                rowsPerPageOptions,
                isLoading: false,
                rowsPerPage,
                page,
                handleChangePage,
                handleChangeRowsPerPage,
              }}
            />
          </Table>
        </TableContainer>
      </SubTeamsWrapper>
    </>
  );
}

export default SubTeamsComponent;
