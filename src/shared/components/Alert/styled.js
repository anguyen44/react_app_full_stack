import { DialogActions, DialogTitle } from "@mui/material";
import styled from "styled-components";

export const StyledDialogTitle = styled(DialogTitle)`
  color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
`;

export const StyledDialogActions = styled(DialogActions)`
  && {
    padding: 8px;
    margin: 0;
  }
`;

export const Container = styled.div`
  max-width: 500px;
`;
