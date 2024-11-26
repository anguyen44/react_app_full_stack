import { IconButton, TableHead, TableRow } from "@mui/material";
import PlusIcon from "shared/components/PlusIconWrapper/PlusIconWrapper";
import styled from "styled-components";

export const SubTeamsWrapper = styled.div`
  padding-top: 1rem;
`;

export const StyledPlusIcon = styled(PlusIcon)`
  padding-bottom: 16px;
`;

export const SubTeamsTableHead = styled(TableHead)`
  background-color: ${({ theme }) =>
    theme.palette.enedis.secondary.blue["500"]};
`;

export const ContentItemTableRow = styled(TableRow)`
  cursor: pointer;
  background-color: ${(props) =>
    props.$isdeleting
      ? props.theme.palette.enedis.secondary.red["400"]
      : props.theme.palette.enedis.grey["50"]};

  &:hover {
    background-color: ${({ theme, ...props }) =>
      props.$isdeleting
        ? theme.palette.enedis.secondary.red["400"]
        : theme.palette.enedis.secondary.blue["200"]};
  }
  transition: background-color
    ${(props) => (props.$isdeleting ? "2s" : " 0.2s")} ease;
`;

export const ModalWrapper = styled.div`
  display: flex;

  flex-direction: column;

  > input,
  > button,
  > textarea {
    margin-bottom: 16px;
  }
`;

export const WrapButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ActionButtonsWrapper = styled.div`
  margin: 0 auto;
`;

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

export const InvalidMessageWrapper = styled.div`
  color: red;
  font-size: 11px;
`;

export const DescriptionDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubTeamDeleteIconWrapper = styled(IconButton)`
  height: 25px;
  &:hover > svg {
    color: ${({ theme }) => theme.palette.enedis.secondary.red["400"]};
  }
`;
