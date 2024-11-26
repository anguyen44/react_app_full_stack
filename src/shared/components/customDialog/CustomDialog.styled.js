import { Button, DialogTitle } from "@mui/material";
import styled from "styled-components";

const ApprouveButton = styled(Button)`
  &.MuiButton-root {
    color: ${({ theme }) => theme.palette.enedis.grey["50"]};
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["500"]};
    font-size: 12px;
    text-transform: none;
  }

  &.MuiButton-root:hover {
    background: #0a0a23;
  }
`;

const RejectButton = styled(Button)`
  &.MuiButton-root {
    font-size: 12px;
    text-transform: none;
    color: #1f1a28;
    background: #fff;
  }

  &.MuiButton-root:hover {
    background: #e9e9e9;
  }
`;

const CustomDialogTitle = styled(DialogTitle)`
  &.MuiDialogTitle-root {
    padding: 8px 10px;
    font-weight: 500;
    display: flex;
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["500"]};
    font-size: 15px;
    color: ${({ theme }) => theme.palette.enedis.grey["50"]};
  }
`;

export { ApprouveButton, CustomDialogTitle, RejectButton };
