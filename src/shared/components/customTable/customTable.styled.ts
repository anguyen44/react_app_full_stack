import styled from "styled-components";
import { TableRow } from "@mui/material";

export const TextEllipsisWrapper = styled.div`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: default;
`;

interface CustomCaseTableRowProps {
  $emphasised?: boolean;
}

export const TableRowCustom = styled(TableRow)<CustomCaseTableRowProps>`
  ${({ $emphasised }) => $emphasised && `border: 2px solid red`};
`;
