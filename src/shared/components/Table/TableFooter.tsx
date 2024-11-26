import { TablePagination, TableRow } from "@mui/material";
import { useEffect } from "react";
import { CustomTableFooter } from "shared/components/CustomTableFooter/CustomTableFooter";
import TablePreferencesEnum, {
  getDefaultRowPerPage,
} from "shared/enumeration/tablePreferences.enum";
import styled from "styled-components";

// <p> overrided by "reboot.scss" from bootstrap lib
export const StyledTablePagination = styled(TablePagination)`
  p {
    margin-bottom: 0;
  }
`;

interface TableFooterProps {
  count: number;
  isLoading?: boolean;
  rowsPerPage: number;
  page: number;
  handleChangePage: (_: any, page: number) => void;
  handleChangeRowsPerPage: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  rowsPerPageOptions: number[];
}

const TableFooter = ({
  count,
  isLoading,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPageOptions,
  ...rest
}: TableFooterProps) => {
  // prettier-ignore
  const labelDisplayedRows = ({ from, to, count }) => //NOSONAR
    `${from}–${to} sur ${count !== -1 ? count : `plus de ${to}`}`; //NOSONAR
  const labelRowsPerPage = "Lignes par page ";

  useEffect(() => {
    if (count < rowsPerPage) {
      handleChangePage("", 0);
    }
  }, [count]);

  return (
    <CustomTableFooter {...rest}>
      <TableRow>
        {count > getDefaultRowPerPage(TablePreferencesEnum.DEFAULT) &&
          !isLoading && (
            <StyledTablePagination
              showFirstButton
              showLastButton
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              {...{
                count,
                page,
                rowsPerPage,
                labelDisplayedRows,
                rowsPerPageOptions,
                labelRowsPerPage,
              }}
            />
          )}
      </TableRow>
    </CustomTableFooter>
  );
};

export default TableFooter;
