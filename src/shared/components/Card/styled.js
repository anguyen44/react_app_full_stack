import { Alert } from "@mui/material";
import styled from "styled-components";

export const StyledAlert = styled(Alert)`
  width: 500px;
  display: flex;
  z-index: 2;
  &&& {
    padding: 16px;
  }
`;
