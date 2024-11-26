import { Skeleton, Table, TableContainer } from "@mui/material";
import { useEffect } from "react";
import { CustomPaper } from "shared/components/CustomPaper/CustomPaper";
import Col from "shared/components/grid/col/col.component";
import TableFooter from "shared/components/Table/TableFooter";
import { usePagination } from "shared/hooks/usePagination";

import { useShallowEqualSelector } from "shared/store";
import { OrgPageState } from "shared/store/slices/common/orgPageReducers";
import UsersTableBody from "views/teams/components/userTable/UsersTableBody.component";
import UsersTableHeader from "views/teams/components/userTable/UsersTableHeader.component";
import ApproverSearchModal from "./approverSearchModal.component";
import { OrgApproversWrapper } from "./orgApprovers.styled";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";
import { sortApproversListByName } from "shared/store/selectors/orgs.selector";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";

interface OrgApproversComponentProps<T extends OrgPageState> {
  orgOid: string;
  confirmRemoveApprover: (approverOid: string, approverName: string) => void;
  isLoadingDeleteApproverInOrgByOidList: string[];
  reducerState: T;
  isLoading?: boolean;
}

function OrgApproversComponent<T extends OrgPageState>({
  orgOid,
  confirmRemoveApprover,
  isLoadingDeleteApproverInOrgByOidList,
  reducerState,
  isLoading,
}: OrgApproversComponentProps<T>) {
  const { dispatchAlertDialog } = useAlertDialog();

  const { readOnly, isOwner } = reducerState;
  const writingModeEnable = !readOnly && !isLoading && isOwner;

  const approvers = useShallowEqualSelector(
    sortApproversListByName(reducerState),
  );

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    countedListForShowing,
    setPage,
    rowsPerPageOptions,
  } = usePagination(TablePreferencesEnum.APPROVERS);

  useEffect(() => {
    setPage(0);
  }, []);

  const removeApprover = ({ approverOid, approverName }) => {
    confirmRemoveApprover(approverOid, approverName);
  };

  const handleDelete = (approverOid, approverName) => {
    dispatchAlertDialog({
      title: "Confirmez-vous la suppression du suppléant ?",
      description: (
        <>
          {"Si vous confirmez, ce suppléant sera définitivement supprimé."}
          <br />
          Êtes-vous sûr de vouloir le supprimer ?
        </>
      ),
      handleAction: removeApprover,
      dataActions: { approverOid, approverName },
    });
  };

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" height={50} width="100%" />
      ) : (
        <>
          {writingModeEnable && (
            <Col sx={{ position: "relative" }}>
              {writingModeEnable && (
                <ApproverSearchModal
                  orgOid={orgOid}
                  currentUsers={approvers}
                  reducerState={reducerState}
                />
              )}
            </Col>
          )}
          <OrgApproversWrapper>
            <TableContainer component={CustomPaper}>
              <Table sx={{ minWidth: 650 }}>
                <UsersTableHeader isWritingMode={writingModeEnable} />
                <UsersTableBody
                  users={approvers}
                  isDeletingItem={isLoadingDeleteApproverInOrgByOidList}
                  writingModeEnable={writingModeEnable}
                  {...{
                    countedListForShowing,
                    handleDelete,
                  }}
                  customName="suppléant"
                />
                <TableFooter
                  count={approvers.length}
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
            </TableContainer>
          </OrgApproversWrapper>
        </>
      )}
    </>
  );
}

export default OrgApproversComponent;
