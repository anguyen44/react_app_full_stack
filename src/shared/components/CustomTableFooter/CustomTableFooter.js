import { TableFooter } from "@mui/material";
import styled from "styled-components";

const CustomTableFooter = styled(TableFooter)`
  & .MuiTablePagination-root {
    border-bottom: 0;
  }
`;

export { CustomTableFooter };
