import { Button } from "@mui/material";
import styled, { css } from "styled-components";

interface CustomButtonProps extends React.HTMLProps<HTMLAnchorElement> {
  $svg?: boolean;
}

const CustomDefaultButton = styled.a<CustomButtonProps>`
  background-color: #d1d1d4;
  border-color: #ddd;
  color: ${({ theme: { palette } }) => palette.enedis.grey["800"]};

  border-radius: 0.2rem;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.25rem 0.5rem;
  display: inline-block;

  &:hover {
    cursor: pointer;
    background-color: #d7d7d7;
  }

  ${(props) =>
    props.$svg &&
    `svg {
          height: 18px;
          margin-right: 2px;
          margin-bottom: 3px;
        }

        span {
          margin-top: 2px;
        }
          `};
`;

const CustomSuccessButton = styled.a<CustomButtonProps>`
  background-color: ${({ theme }) =>
    theme.palette.enedis.secondary.green["400"]};
  border-color: #ddd;
  color: ${({ theme }) => theme.palette.enedis.grey["50"]};

  border-radius: 0.2rem;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.25rem 0.5rem;
  display: inline-block;

  &:hover {
    cursor: pointer;
    background-color: #5bb352;
  }

  ${(props) =>
    props.$svg &&
    `svg {
          height: 18px;
          margin-right: 2px;
          margin-bottom: 3px;
        }

        span {
          margin-top: 2px;
        }
          `};
`;

const ModalTableDeleteIconWrapper = styled.div`
  cursor: pointer;
  color: brown;
  &:hover {
    color: red;
  }
`;

const ActionButton = css`
  &.MuiButton-root {
    font-size: 14px;
    text-transform: none;
    font-weight: 600;
  }

  &.MuiButton-root:hover {
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["700"]};
    transition: 0.7s;
  }
`;

const AddButton = styled(Button)`
  ${ActionButton}
  &.MuiButton-root {
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["500"]};
    color: ${({ theme }) => theme.palette.enedis.grey["50"]};
  }
`;

const CancelButton = styled(Button)`
  ${ActionButton}
  &.MuiButton-root {
    background-color: ${({ theme }) => theme.palette.enedis.grey["50"]};
    color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
  }
  &.MuiButton-root:hover {
    color: ${({ theme }) => theme.palette.enedis.grey["50"]};
  }
`;

export {
  AddButton,
  CancelButton,
  CustomDefaultButton,
  CustomSuccessButton,
  ModalTableDeleteIconWrapper,
};
