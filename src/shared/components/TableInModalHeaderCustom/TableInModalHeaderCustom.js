import { TableRow } from "@mui/material";
import styled from "styled-components";

const TableInModalHeaderCustom = styled(TableRow)`
  &.MuiTableRow-root {
    background-color: ${({ theme, ...props }) =>
      props.$modeadmin
        ? theme.palette.enedis.secondary.blue["500"]
        : theme.palette.enedis.grey["50"]};
    .MuiTableCell-root {
      ${(props) =>
        props.$modeadmin
          ? `
            color: ${props.theme.palette.enedis.grey["50"]};
            font-size: 12px;
            font-weight: 500;
           
        `
          : `
            color: #0000008a;
            font-size: 12px;
            font-weight: 500;
        `};
    }
    position: sticky;
    top: 0;
  }
`;

export { TableInModalHeaderCustom };
