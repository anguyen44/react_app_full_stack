import { Box } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme: { palette } }) => palette.enedis.grey["50"]};
  min-height: 100vh;
  display: flex;
  flex-flow: column;
`;

export const Wrap = styled.div`
  overflow: hidden;
  ${({ $grow }) => $grow && "flex-grow: 1"};

  ${({ $header, theme: { palette } }) =>
    $header &&
    `border-bottom: 1px solid ${palette.enedis.primary.blue["500"]}`};
  ${({ $header, theme: { palette } }) =>
    $header && `background-color: ${palette.enedis.grey["50"]}`};

  ${({ $footer, theme: { palette } }) =>
    $footer && `background-color: ${palette.enedis.grey["50"]}`};
`;

export const Block = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
`;

export const StyledBox = styled(Box)`
  ${({ $grow }) => $grow && "flex-grow: 1"};
`;
