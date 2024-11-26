import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import { FaTrash } from "icons";
import {
  CustomContentTableCell,
  CustomNoContentTableCell,
} from "shared/components/CustomTableCells/CustomTableCells";
import ItemStatusComponent from "shared/components/itemDetails/itemInfos/itemStatus.component";
import LoadingComponent from "shared/components/loading/Loading.component";
import { teams } from "shared/config/constants/selenium.config";
import { UserModel } from "shared/model/user.model";

interface UsersTableBodyProps {
  users: UserModel[];
  countedListForShowing: (users: UserModel[]) => UserModel[];
  writingModeEnable: boolean;
  isDeletingItem: string[];
  handleDelete: HandleDeleteType;
  customName?: string;
}
type HandleDeleteType = (memberOid: string, memberFullName: string) => void;

const UsersTableBody = ({
  users,
  countedListForShowing,
  writingModeEnable,
  isDeletingItem,
  handleDelete,
  customName,
}: UsersTableBodyProps) => {
  function getMemberAction(
    memberOid: string,
    memberFullName: string,
    isDeletingItem: string[],
    handleDelete: HandleDeleteType,
  ) {
    return (
      <div>
        {isDeletingItem?.includes(memberOid) ? (
          <LoadingComponent size={12} padding={"9px"} />
        ) : (
          <>
            <IconButton
              className="trashIconWrapper"
              onClick={() => handleDelete(memberOid, memberFullName)}
            >
              <FaTrash
                data-testid={`deleteMemberBtn-${memberOid}`}
                className="deleteIcon"
              />
            </IconButton>
          </>
        )}
      </div>
    );
  }

  return (
    <TableBody>
      <>
        {users?.length > 0 ? (
          <>
            {countedListForShowing(users).map((user) => (
              <TableRow
                key={user.nni}
                className={user.deleted ? "deletingStatusRow" : ""}
              >
                <CustomContentTableCell
                  component="th"
                  scope="row"
                  width="25%"
                  data-selenium={teams.USER_NAME}
                >
                  {user.name} {user.givenName}
                </CustomContentTableCell>
                <CustomContentTableCell
                  data-selenium={teams.USER_NNI}
                  width="15%"
                >
                  {user.nni}
                </CustomContentTableCell>
                <CustomContentTableCell width="45%">
                  {user.email}
                </CustomContentTableCell>
                <CustomContentTableCell>
                  <ItemStatusComponent
                    isActive={user.isActive}
                    style={{ marginLeft: "5px" }}
                  />
                </CustomContentTableCell>
                {writingModeEnable && (
                  <TableCell align="center">
                    {getMemberAction(
                      user.oid,
                      `${user.name} ${user.givenName}`,
                      isDeletingItem,
                      handleDelete,
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </>
        ) : (
          <TableRow>
            <CustomNoContentTableCell colSpan="100%" align="center">
              {`Aucun ${customName ?? "membre"} présent`}
            </CustomNoContentTableCell>
          </TableRow>
        )}
      </>
    </TableBody>
  );
};

export default UsersTableBody;
