import { Skeleton, Table, TableContainer } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { CustomPaper } from "shared/components/CustomPaper/CustomPaper";
import CustomSearchComponent from "shared/components/customSearchComponent/customSearch.component";
import TableFooter from "shared/components/Table/TableFooter";
import { teams } from "shared/config/constants/selenium.config";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";
import { usePagination } from "shared/hooks/usePagination";
import { sortUsersByName } from "shared/utils/sort.utils";

import UsersSearchModal from "../usersSearchModal/usersSearchModal.component";
import UsersTableBody from "../userTable/UsersTableBody.component";
import UsersTableHeader from "../userTable/UsersTableHeader.component";
import { UserModel } from "shared/model/user.model";
import { useAppSelector } from "shared/store";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";

interface TeamMembersComponentProps {
  teamOid: string;
  members: UserModel[];
  confirmRemoveMember: (memberOid: string, memberFullName: string) => void;
  isSubTeamPage: boolean;
  isLoadingdeleteUserInTeamByOidList: string[];
  isLoading: boolean;
}

function TeamMembersComponent({
  teamOid,
  members,
  confirmRemoveMember,
  isSubTeamPage,
  isLoadingdeleteUserInTeamByOidList,
  isLoading,
}: TeamMembersComponentProps) {
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    countedListForShowing,
    setPage,
    rowsPerPageOptions,
  } = usePagination(TablePreferencesEnum.MEMBERS);

  const { readOnly, isLoadingPage, isCaseValidationImpossible } =
    useAppSelector((state) => state.teamPageReducer);
  const writingModeEnable = !readOnly && !isLoadingPage && !isLoading;

  const [searchKeyWord, setSearchKeyWord] = useState("");

  const {
    dispatchAlertDialog,
    dispatchImpossibleDeleteCaseValidationAlertDialog,
  } = useAlertDialog();

  function removeMember({ memberOid, memberFullName }) {
    confirmRemoveMember(memberOid, memberFullName);
  }

  const handleDelete = (memberOid, memberFullName) => {
    if (isSubTeamPage && isCaseValidationImpossible) {
      dispatchImpossibleDeleteCaseValidationAlertDialog({
        handleAction: removeMember,
        dataActions: { memberOid, memberFullName },
        elementLabel: "membre",
      });
    } else {
      const MESSAGE_CONTENT = isSubTeamPage
        ? "Si vous confirmez, une demande de suppression du membre sera créée."
        : "Si vous confirmez, l'utilisateur sera définitivement supprimé.";
      dispatchAlertDialog({
        title: "Confirmez-vous la suppression de l'utilisateur ?",
        description: (
          <>
            {MESSAGE_CONTENT}
            <br />
            Êtes-vous sûr de vouloir supprimer ?
          </>
        ),
        handleAction: removeMember,
        dataActions: { memberOid, memberFullName },
      });
    }
  };

  const onChangeSearchBox = (e) => {
    setPage(0);
    const searchingText = e.target.value ? e.target.value : "";
    setSearchKeyWord(searchingText);
  };

  const customedMemberList = useMemo(() => {
    return sortUsersByName(
      members?.filter(
        (member) =>
          member.name.toLowerCase().includes(searchKeyWord.toLowerCase()) ||
          member.givenName.toLowerCase().includes(searchKeyWord.toLowerCase()),
      ),
    );
  }, [members, searchKeyWord]);

  useEffect(() => {
    setPage(0);
    setSearchKeyWord("");
  }, [teamOid]);

  return (
    <>
      <CustomSearchComponent
        {...{ searchKeyWord, onChangeSearchBox }}
        dataSelenium={teams.INPUTSEARCH_SUBTEAM}
        additionalComponent={
          <>{writingModeEnable && <UsersSearchModal {...{ teamOid }} />}</>
        }
        isLoading={isLoading}
      />
      <div>
        {isLoading ? (
          <Skeleton variant="rounded" height={50} width="100%" />
        ) : (
          <TableContainer component={CustomPaper}>
            <Table sx={{ minWidth: 650 }}>
              <UsersTableHeader isWritingMode={writingModeEnable} />
              <UsersTableBody
                users={customedMemberList}
                isDeletingItem={isLoadingdeleteUserInTeamByOidList}
                {...{
                  countedListForShowing,
                  writingModeEnable,
                  handleDelete,
                }}
              />
              <TableFooter
                count={customedMemberList?.length}
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
        )}
      </div>
    </>
  );
}

export default TeamMembersComponent;
