import { Grid } from "@mui/material";
import styled from "styled-components";

export const StyledGrid = styled(Grid)`
  padding: 8px 0;
`;

export const Logo = styled.img`
  border-radius: 0 0 80px;

  box-shadow:
    rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset,
    rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border: 2px solid ${({ theme: { palette } }) => palette.enedis.grey["50"]};
  width: 100%;
  background-color: ${({ theme: { palette } }) => palette.enedis.grey["100"]};
  margin-top: -8px;
  object-fit: contain;
  padding: 0 32px;
  width: 100%;
  @keyframes fadeIn {
    0% {
      margin-top: -50%;
    }
    100% {
      margin-top: -8px;
    }
  }
  animation: fadeIn 700ms;
`;
