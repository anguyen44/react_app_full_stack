import { Backdrop } from "@mui/material";
import styled from "styled-components";

export const StyledBackdrop = styled(Backdrop)`
  && {
    background-color: rgba(255, 255, 255, 0.3);
    z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  }
`;
