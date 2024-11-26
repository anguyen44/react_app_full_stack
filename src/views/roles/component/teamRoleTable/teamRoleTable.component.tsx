import {
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CustomPaper } from "shared/components/CustomPaper/CustomPaper";
import TeamRoleModel from "shared/model/teamRole.model";
import {
  CustomContentTableCell,
  CustomHeadTableCell,
  CustomNoContentTableCell,
} from "shared/components/CustomTableCells/CustomTableCells";
import { usePagination } from "shared/hooks/usePagination";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";
import { ContentItemTableRow } from "../rolesTable/rolesTable.styled";
import { roles as ROLES_SELENIUM_VARIABLES } from "shared/config/constants/selenium.config";
import { useRef } from "react";
import MoreDescription from "shared/components/moreDescription/moreDescription";
import ItemStatusComponent from "shared/components/itemDetails/itemInfos/itemStatus.component";
import TableFooter from "shared/components/Table/TableFooter";
import LoadingComponent from "shared/components/loading/Loading.component";
import { StyledHeader, StyledHeaderContent } from "./teamRoleTable.styled";

interface TeamRoleTableProps {
  roles: TeamRoleModel[];
  haveActions: boolean;
  isLoading: boolean;
  getRoleAction: (
    roleOid: string,
    roleDiplayName: string,
    roleName: string,
    teamOid: string,
  ) => JSX.Element;
  onOpenRoleModal: (oid: string) => void;
  title: string;
}

const TeamRoleTable = ({
  roles,
  haveActions,
  isLoading,
  getRoleAction,
  title,
  onOpenRoleModal,
}: TeamRoleTableProps) => {
  const deleteIconRef = useRef({});
  const editIconRef = useRef({});

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    countedListForShowing,
    rowsPerPageOptions,
  } = usePagination(TablePreferencesEnum.ALL_ROLES);

  return (
    <>
      <StyledHeader>
        <StyledHeaderContent>{title}</StyledHeaderContent>
      </StyledHeader>
      <TableContainer
        component={CustomPaper}
        sx={{
          padding: "25px 30px 0 30px",
          borderRadius: "0 0 8px 8px",
        }}
      >
        {roles ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <CustomHeadTableCell>N°</CustomHeadTableCell>
                <CustomHeadTableCell style={{ width: "15%" }}>
                  Equipe
                </CustomHeadTableCell>
                <CustomHeadTableCell>Rôle</CustomHeadTableCell>
                <CustomHeadTableCell>Description</CustomHeadTableCell>
                <CustomHeadTableCell>Ressource</CustomHeadTableCell>
                <CustomHeadTableCell>Statut</CustomHeadTableCell>
                {haveActions && (
                  <CustomHeadTableCell align="center">
                    Actions
                  </CustomHeadTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                {isLoading ? (
                  <TableRow>
                    <CustomNoContentTableCell
                      colSpan="100%"
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      <Skeleton variant="rounded" height={50} width="100%" />
                    </CustomNoContentTableCell>
                  </TableRow>
                ) : (
                  <>
                    {roles?.length > 0 ? (
                      countedListForShowing([...roles]).map((d, index) => {
                        return (
                          <ContentItemTableRow
                            data-selenium={`${ROLES_SELENIUM_VARIABLES.ROLE_ITEM}_${index}`}
                            $isdeleting={d.deleted}
                            key={d.name}
                            onClick={(e) => {
                              const { target } = e;
                              if (target) {
                                if (
                                  (target as any).dataset?.name ===
                                  "descriptionCollapse"
                                )
                                  return;
                              }
                              if (
                                Object.keys(deleteIconRef?.current).length >
                                  0 &&
                                Object.keys(editIconRef?.current).length > 0
                              ) {
                                if (
                                  !deleteIconRef.current[d.name]?.contains(
                                    e.target,
                                  ) &&
                                  !editIconRef.current[d.name]?.contains(
                                    e.target,
                                  )
                                ) {
                                  onOpenRoleModal(d.oid);
                                }
                              } else {
                                onOpenRoleModal(d.oid);
                              }
                            }}
                          >
                            <CustomContentTableCell>
                              {index + 1}
                            </CustomContentTableCell>
                            <CustomContentTableCell>
                              {d.teamDisplayName}
                            </CustomContentTableCell>
                            <CustomContentTableCell
                              data-selenium={ROLES_SELENIUM_VARIABLES.ROLE_NAME}
                            >
                              {d.displayName}
                            </CustomContentTableCell>
                            <CustomContentTableCell
                              align="left"
                              width="20%"
                              $isWordBreak
                            >
                              <MoreDescription description={d.description} />
                            </CustomContentTableCell>
                            <CustomContentTableCell>
                              {d.portfolio?.displayName}
                            </CustomContentTableCell>
                            <CustomContentTableCell>
                              <ItemStatusComponent
                                isActive={d.isActive}
                                style={{ marginLeft: "12px" }}
                              />
                            </CustomContentTableCell>
                            {haveActions && (
                              <CustomContentTableCell
                                align="center"
                                width={"9%"}
                              >
                                {getRoleAction(
                                  d.oid,
                                  d.displayName,
                                  d.name,
                                  d.teamOid,
                                )}
                              </CustomContentTableCell>
                            )}
                          </ContentItemTableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <CustomNoContentTableCell colSpan="100%" align="center">
                          Aucun rôle présent
                        </CustomNoContentTableCell>
                      </TableRow>
                    )}
                  </>
                )}
              </>
            </TableBody>
            <TableFooter
              count={roles.length}
              {...{
                rowsPerPageOptions,
                isLoading,
                rowsPerPage,
                page,
                handleChangePage,
                handleChangeRowsPerPage,
              }}
            />
          </Table>
        ) : (
          <div style={{ textAlign: "center", paddingBottom: "20px" }}>
            <LoadingComponent />
          </div>
        )}
      </TableContainer>
    </>
  );
};

export default TeamRoleTable;
