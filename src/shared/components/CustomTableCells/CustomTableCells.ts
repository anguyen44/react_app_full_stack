import { TableCell, TableCellProps, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";

const CustomTableHead = styled(TableHead)`
  background-color: ${({ theme }) =>
    theme.palette.enedis.secondary.blue["500"]};
  width: 100%;
`;

interface CustomHeadTableCellProps extends TableCellProps {
  fontWeight?: string;
  backgroundColor?: string;
}

const CustomHeadTableCell = styled(TableCell)<CustomHeadTableCellProps>`
  &.MuiTableCell-root {
    color: ${({ color }) => color ?? "#0000008a"};
    font-size: 13px;
    font-weight: ${({ fontWeight }) => fontWeight ?? "800"};
    box-sizing: border-box;
    padding: 12px;
  }
`;

interface CustomContentTableCellProps extends TableCellProps {
  $isWordBreak?: boolean;
}

const CustomContentTableCell = styled(TableCell)<CustomContentTableCellProps>`
  &.MuiTableCell-root {
    font-size: 13px;
    padding: 12px;
    word-break: ${(props) => (props.$isWordBreak ? "break-word" : "normal")};
  }
`;

interface CustomCaseTableRowProps {
  $isBadCase?: boolean;
}

const CustomCaseTableRow = styled(TableRow)<CustomCaseTableRowProps>`
  border: ${({ $isBadCase }) => ($isBadCase ? "2px solid red" : "transparent")};
`;

interface CustomNoContentTableCellProps
  extends Omit<TableCellProps, "colSpan"> {
  colSpan?: string;
}

const CustomNoContentTableCell = styled(
  TableCell,
)<CustomNoContentTableCellProps>`
  &.MuiTableCell-root {
    color: ${({ theme: { palette } }) => palette.enedis.grey["800"]};
    font-size: 13px;
    border-bottom: 0;
  }
`;

export {
  CustomTableHead,
  CustomContentTableCell,
  CustomHeadTableCell,
  CustomNoContentTableCell,
  CustomCaseTableRow,
};
