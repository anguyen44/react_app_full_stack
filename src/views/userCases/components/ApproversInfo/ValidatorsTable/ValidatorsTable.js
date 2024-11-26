import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CustomPaper } from "shared/components/CustomPaper/CustomPaper";
import { CustomNoContentTableCell } from "shared/components/CustomTableCells/CustomTableCells";
import { TableInModalHeaderCustom } from "shared/components/TableInModalHeaderCustom/TableInModalHeaderCustom";

const ValidatorsTable = ({ validators }) => {
  return (
    <TableContainer component={CustomPaper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableInModalHeaderCustom $modeadmin={false}>
            <TableCell>
              <strong>NNI</strong>
            </TableCell>

            <TableCell>
              <strong>Prénom</strong>
            </TableCell>
            <TableCell>
              <strong>Nom</strong>
            </TableCell>
            <TableCell>
              <strong>Courriel</strong>
            </TableCell>
          </TableInModalHeaderCustom>
        </TableHead>
        <TableBody>
          <>
            {validators?.length > 0 ? (
              validators.map((validator) => (
                <TableRow
                  key={validator.nni}
                  sx={{
                    "& > .MuiTableCell-root": {
                      fontSize: "12px",
                    },
                  }}
                >
                  <TableCell>{validator.nni}</TableCell>
                  <TableCell>{validator.givenName}</TableCell>
                  <TableCell>{validator.familyName.toUpperCase()}</TableCell>
                  <TableCell>{validator.email}</TableCell>
                </TableRow>
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
      </Table>
    </TableContainer>
  );
};

export default ValidatorsTable;
