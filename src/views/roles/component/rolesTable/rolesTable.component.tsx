import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { FaTrash } from "icons";
import { useEffect } from "react";
import { CustomPaper } from "shared/components/CustomPaper/CustomPaper";
import {
  CustomTableHead,
  CustomContentTableCell,
  CustomHeadTableCell,
  CustomNoContentTableCell,
} from "shared/components/CustomTableCells/CustomTableCells";
import LoadingComponent from "shared/components/loading/Loading.component";
import TableFooter from "shared/components/Table/TableFooter";
import { usePagination } from "shared/hooks/usePagination";

import {
  ActionButtonsWrapper,
  ContentItemTableRow,
  RoleDeleteIconWrapper,
  RoleEditIcon,
  RoleEditIconWrapper,
} from "./rolesTable.styled";
import { RolesOrgComponentProps } from "../rolesOrg/rolesOrg.component";
import ItemStatusComponent from "shared/components/itemDetails/itemInfos/itemStatus.component";
import RoleModel from "shared/model/role.model";
import { OrgPageState } from "shared/store/slices/common/orgPageReducers";
import RoleWithTeamModel from "shared/model/roleWithTeam.model";
import MESSAGES from "shared/config/constants/message.config";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";
import MoreDescription from "shared/components/moreDescription/moreDescription";
import RoleService from "shared/services/role/role.service";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";

interface RolesTableProps<T extends OrgPageState>
  extends RolesOrgComponentProps<T> {
  roles: RoleModel[];
  editIconRef: React.MutableRefObject<any>;
  deleteIconRef: React.MutableRefObject<any>;
  writingModeEnable: boolean;
  onOpenRoleModal: (oid: string) => void;
  onClickEditRoleButton: (oidRole: string, roleDiplayName: string) => void;
  isPortfolioPage: boolean;
  resetPage: Number;
  isLoadingPage: boolean;
  isSubTeamPage: boolean;
  isCaseValidationImpossible: boolean;
}

const RolesTable = <T extends OrgPageState>({
  roles,
  editIconRef,
  deleteIconRef,
  writingModeEnable,
  onOpenRoleModal,
  onClickEditRoleButton,
  orgOid,
  confirmRemoveRole,
  isLoadingDeleteRoleInOrgByOidList,
  isPortfolioPage,
  resetPage,
  isLoadingPage,
  isSubTeamPage,
  isCaseValidationImpossible,
}: RolesTableProps<T>) => {
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    countedListForShowing,
    setPage,
    rowsPerPageOptions,
  } = usePagination(TablePreferencesEnum.ROLES);

  const { dispatchAlertInfo } = useAlertCard();

  const {
    dispatchAlertDialog,
    dispatchImpossibleDeleteCaseValidationAlertDialog,
  } = useAlertDialog();

  const handleDisableRole = ({ oid, name }) => {
    confirmRemoveRole(oid, name);
  };

  const dispatchTriggerAlertDialog = (
    oid: string,
    name: string,
    message: string,
  ) => {
    if (isSubTeamPage && isCaseValidationImpossible) {
      dispatchImpossibleDeleteCaseValidationAlertDialog({
        handleAction: handleDisableRole,
        dataActions: { oid, name },
        elementLabel: "rôle",
      });
    } else {
      dispatchAlertDialog({
        title: "Confirmez-vous la suppression du rôle ?",
        description: (
          <>
            {message}
            <br />
            Êtes-vous sûr de vouloir supprimer ?
          </>
        ),
        handleAction: handleDisableRole,
        dataActions: { oid, name },
      });
    }
  };

  const handleEdit = (roleOid: string, roleDiplayName: string) => {
    if (isPortfolioPage) {
      dispatchAlertInfo(MESSAGES.UNAVAILABLE_FUNCTIONALITY);
    } else {
      onClickEditRoleButton(roleOid, roleDiplayName);
    }
  };

  const handleDelete = (roleOid: string, roleDiplayName: string) => {
    if (isPortfolioPage) {
      dispatchAlertInfo(MESSAGES.UNAVAILABLE_FUNCTIONALITY);
    } else {
      if (isSubTeamPage) {
        dispatchTriggerAlertDialog(
          roleOid,
          roleDiplayName,
          MESSAGES.DELETE_ROLE_CONFIRM_NEED_VALIDATION,
        );
      } else {
        RoleService.findSubTeamsForRole(roleOid)
          .then((subTeams) => {
            if (subTeams?.length > 0) {
              dispatchAlertInfo(
                <div>
                  {MESSAGES.DELETE_ROLE_ERROR(subTeams.length > 1)}
                  <ol style={{ listStyleType: "none" }}>
                    {subTeams.map((item) => (
                      <li style={{ listStyleType: "circle" }}>
                        {item.displayName}
                      </li>
                    ))}
                  </ol>
                </div>,
              );
            } else {
              dispatchTriggerAlertDialog(
                roleOid,
                roleDiplayName,
                MESSAGES.DELETE_ROLE_CONFIRM,
              );
            }
          })
          .catch((error) => {
            console.error(
              "findSubTeamsForRole calling in error (in function isRoleDeletable)",
              error,
            );
          });
      }
    }
  };

  const getRoleAction = (
    roleOid,
    roleDiplayName,
    roleName,
    isDeleted: boolean,
  ) => {
    return (
      <ActionButtonsWrapper>
        {isLoadingDeleteRoleInOrgByOidList?.includes(roleOid) ? (
          <LoadingComponent size={12} padding={"9px"} />
        ) : (
          <>
            {!isDeleted && (
              <>
                <RoleEditIconWrapper
                  ref={(el) => {
                    if (el) {
                      editIconRef.current[roleName] = el;
                    }
                  }}
                  onClick={(e) => {
                    handleEdit(roleOid, roleDiplayName);
                    e.stopPropagation();
                  }}
                >
                  <RoleEditIcon />
                </RoleEditIconWrapper>
                <RoleDeleteIconWrapper
                  ref={(el) => {
                    if (el) {
                      deleteIconRef.current[roleName] = el;
                    }
                  }}
                  onClick={(e) => {
                    handleDelete(roleOid, roleDiplayName);
                    e.stopPropagation();
                  }}
                >
                  <FaTrash
                    data-testid={`deletRoleBtn-${roleOid}`}
                    className="deleteIcon"
                  />
                </RoleDeleteIconWrapper>
              </>
            )}
          </>
        )}
      </ActionButtonsWrapper>
    );
  };

  useEffect(() => {
    setPage(0);
  }, [orgOid, resetPage]);

  return (
    <div>
      {isLoadingPage ? (
        <Skeleton variant="rounded" height={50} width="100%" />
      ) : (
        <TableContainer component={CustomPaper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <CustomTableHead>
              <TableRow>
                <CustomHeadTableCell width="25%" color="#fff" fontWeight="600">
                  Nom
                </CustomHeadTableCell>
                <CustomHeadTableCell width="30%" color="#fff" fontWeight="600">
                  Description
                </CustomHeadTableCell>
                <CustomHeadTableCell width="25%" color="#fff" fontWeight="600">
                  {isPortfolioPage ? "Equipe" : "Ressource"}
                </CustomHeadTableCell>
                <CustomHeadTableCell color="#fff" fontWeight="600">
                  Statut
                </CustomHeadTableCell>
                <>
                  {writingModeEnable ? (
                    <CustomHeadTableCell
                      align="center"
                      color="#fff"
                      fontWeight="600"
                    >
                      Actions
                    </CustomHeadTableCell>
                  ) : (
                    <CustomHeadTableCell />
                  )}
                </>
              </TableRow>
            </CustomTableHead>
            <TableBody>
              <>
                {roles?.length > 0 ? (
                  countedListForShowing(roles).map((row) => (
                    <ContentItemTableRow
                      key={row.name}
                      onClick={(e) => {
                        const target = e.target as HTMLButtonElement;
                        if (target) {
                          if (target.dataset.name === "descriptionCollapse")
                            return;
                        }
                        if (!row.deleted) {
                          if (
                            Object.keys(deleteIconRef?.current).length > 0 &&
                            Object.keys(editIconRef?.current).length > 0
                          ) {
                            if (
                              !deleteIconRef.current[row.name]?.contains(
                                e.target,
                              ) &&
                              !editIconRef.current[row.name]?.contains(e.target)
                            ) {
                              onOpenRoleModal(row.oid);
                            }
                          } else {
                            onOpenRoleModal(row.oid);
                          }
                        }
                      }}
                      $isdeleting={row.deleted}
                    >
                      <CustomContentTableCell component="th" scope="row">
                        {row.displayName}
                      </CustomContentTableCell>
                      <CustomContentTableCell width={"20%"} $isWordBreak>
                        <MoreDescription description={row.description} />
                      </CustomContentTableCell>
                      <CustomContentTableCell>
                        {isPortfolioPage
                          ? (row as RoleWithTeamModel).team?.displayName
                          : row.portfolio?.displayName}
                      </CustomContentTableCell>
                      <CustomContentTableCell>
                        <ItemStatusComponent
                          isActive={row.isActive}
                          style={{ marginLeft: "12px" }}
                        />
                      </CustomContentTableCell>
                      {writingModeEnable ? (
                        <TableCell align="center" style={{ padding: 0 }}>
                          {getRoleAction(
                            row.oid,
                            row.displayName,
                            row.name,
                            isPortfolioPage && !(row as RoleWithTeamModel).team,
                          )}
                        </TableCell>
                      ) : (
                        <TableCell />
                      )}
                    </ContentItemTableRow>
                  ))
                ) : (
                  <TableRow>
                    <CustomNoContentTableCell colSpan="100%" align="center">
                      Aucun rôle présent
                    </CustomNoContentTableCell>
                  </TableRow>
                )}
              </>
            </TableBody>
            <TableFooter
              count={roles.length}
              {...{
                rowsPerPageOptions,
                rowsPerPage,
                page,
                handleChangePage,
                handleChangeRowsPerPage,
              }}
            />
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default RolesTable;
