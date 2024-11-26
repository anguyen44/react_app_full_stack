import styled from "styled-components";

export const StyledHeader = styled.div`
  && {
    min-height: unset;
    box-shadow: none;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
`;

export const StyledHeaderContent = styled.div`
  &&& {
    width: 100%;
    font-weight: 700;
    padding: 14px 8px;
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
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;
