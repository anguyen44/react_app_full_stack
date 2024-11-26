import { IconButton, TableRow } from "@mui/material";
import { FaPencilAlt } from "icons";
import styled from "styled-components";

const RoleDeleteIconWrapper = styled(IconButton)`
  height: 25px;
  &:hover > svg {
    color: ${({ theme }) => theme.palette.enedis.secondary.red["400"]};
  }
`;

const RoleEditIconWrapper = styled(IconButton)`
  height: 25px;
  &:hover > svg {
    color: ${({ theme }) => theme.palette.enedis.secondary.green["400"]};
  }
`;

const RoleEditIcon = styled(FaPencilAlt)`
  cursor: pointer;
  color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
  height: 15px;
  width: 15px;
`;

const ActionButtonsWrapper = styled.div`
  margin: 0 auto;
`;

interface ContentItemTableRowProps {
  $isdeleting: boolean;
}

const ContentItemTableRow = styled(TableRow)<ContentItemTableRowProps>`
  cursor: pointer;
  background-color: ${(props) =>
    props.$isdeleting
      ? props.theme.palette.enedis.secondary.red["200"]
      : props.theme.palette.enedis.grey["50"]};

  &:hover {
    background-color: ${({ theme, ...props }) =>
      props.$isdeleting
        ? theme.palette.enedis.secondary.red["300"]
        : theme.palette.enedis.secondary.blue["200"]};
  }
  transition: background-color
    ${(props) => (props.$isdeleting ? "2s" : " 0.2s")} ease;
`;

export {
  ActionButtonsWrapper,
  ContentItemTableRow,
  RoleDeleteIconWrapper,
  RoleEditIcon,
  RoleEditIconWrapper,
};
