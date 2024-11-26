import { TableHead } from "@mui/material";
import styled from "styled-components";

export const UsersTableHead = styled(TableHead)`
  background-color: ${({ theme }) =>
    theme.palette.enedis.secondary.blue["500"]};
`;
