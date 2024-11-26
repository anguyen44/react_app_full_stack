import { TableRow } from "@mui/material";
import { CustomHeadTableCell } from "shared/components/CustomTableCells/CustomTableCells";

import { UsersTableHead } from "./UsersTable.styled";

interface UsersTableHeaderProps {
  isWritingMode: boolean;
}

const UsersTableHeader = ({ isWritingMode }: UsersTableHeaderProps) => {
  return (
    <UsersTableHead>
      <TableRow>
        <CustomHeadTableCell width="25%" color="#fff" fontWeight="600">
          Nom & Prénom
        </CustomHeadTableCell>
        <CustomHeadTableCell width="15%" color="#fff" fontWeight="600">
          NNI
        </CustomHeadTableCell>
        <CustomHeadTableCell width="45%" color="#fff" fontWeight="600">
          Email
        </CustomHeadTableCell>
        <CustomHeadTableCell color="#fff" fontWeight="600">
          État
        </CustomHeadTableCell>
        {isWritingMode && (
          <CustomHeadTableCell align="center" color="#fff" fontWeight="600">
            Action
          </CustomHeadTableCell>
        )}
      </TableRow>
    </UsersTableHead>
  );
};

export default UsersTableHeader;
