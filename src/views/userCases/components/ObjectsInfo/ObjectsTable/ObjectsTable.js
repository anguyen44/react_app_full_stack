import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CustomPaper } from "shared/components/CustomPaper/CustomPaper";
import {
  CustomContentTableCell,
  CustomHeadTableCell,
  CustomNoContentTableCell,
} from "shared/components/CustomTableCells/CustomTableCells";
import TableFooter from "shared/components/Table/TableFooter";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";
import { usePagination } from "shared/hooks/usePagination";
import { ContentItemTableRow } from "views/roles/component/rolesTable/rolesTable.styled";

const ObjectsTable = ({ objects }) => {
  const isLoading = false;
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    countedListForShowing,
    rowsPerPageOptions,
  } = usePagination(TablePreferencesEnum.OBJECTS);

  return (
    <TableContainer component={CustomPaper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <CustomHeadTableCell>N°</CustomHeadTableCell>
            <CustomHeadTableCell>Nom de permission</CustomHeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {objects?.length > 0 ? (
              countedListForShowing([...objects]).map((object, index) => (
                <ContentItemTableRow key={index}>
                  <CustomContentTableCell>{index + 1}</CustomContentTableCell>
                  <CustomContentTableCell>{object.name}</CustomContentTableCell>
                </ContentItemTableRow>
              ))
            ) : (
              <TableRow>
                <CustomNoContentTableCell colSpan="100%" align="center">
                  Aucun objet retrouvé
                </CustomNoContentTableCell>
              </TableRow>
            )}
          </>
        </TableBody>
        <TableFooter
          count={objects.length}
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
  );
};

export default ObjectsTable;
