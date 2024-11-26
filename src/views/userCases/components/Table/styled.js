import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  TableContainer,
} from "@mui/material";
import styled from "styled-components";

export const CaseDeletingIconWrapper = styled(IconButton)`
  cursor: pointer;
  & svg {
    color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
    height: 17px;
    width: 17px;
  }
  &:hover > svg {
    color: ${({ theme }) => theme.palette.enedis.secondary.red["400"]};
  }
`;

export const CaseValidatingIconWrapper = styled(IconButton)`
  cursor: pointer;

  & svg {
    color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
    height: 20px;
    width: 20px;
  }

  &:hover > svg {
    color: ${({ theme }) => theme.palette.enedis.secondary.green["400"]};
  }
`;

export const StyledTableContainer = styled(TableContainer)`
  padding: 20px 20px 30px 20px;
`;

export const StyledTableHeader = styled(AccordionSummary)`
  && {
    width: 100%;
    font-weight: 700;
    padding: 5px 10px;
    font-size: 14px;
    margin-bottom: 0px;
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["500"]};

    border-radius: 4px 4px 0 0;
    color: ${({ theme: { palette } }) => palette.enedis.grey["50"]};
  }
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  && {
    margin: 0;
    padding: 16px;

    background-color: ${({ theme: { palette } }) => palette.enedis.grey["50"]};
  }
`;

export const StyledAccordion = styled(Accordion)`
  && {
    min-height: unset;
    box-shadow: none;
  }
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  &&& {
    width: 100%;
    font-weight: 700;
    padding: 0px 8px;
    margin: 0 !important;
    font-size: 14px;

    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["500"]};

    border-radius: 4px 4px 0 0;
    color: ${({ theme: { palette } }) => palette.enedis.grey["50"]};
  }
`;

export const Wrap = styled.div`
  &&& {
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    border-radius: 3px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin: 0 10px 10px 10px;
  }
`;

export const DateWrapper = styled.div`
  margin-bottom: 10px;
`;
