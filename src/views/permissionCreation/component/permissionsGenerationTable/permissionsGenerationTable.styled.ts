import styled from "styled-components";

const IconRemoveWrapper = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.palette.enedis.secondary.red["500"]};
  text-align: center;
  cursor: pointer;
  &:hover > svg {
    color: ${({ theme }) => theme.palette.enedis.secondary.red["600"]};
  }
  transition: 0.1s;
`;

const WrapperTable = styled.div`
  .ant-table-thead .ant-table-cell {
    background: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["500"]}!important;
    color: white;
  }
  tbody .ant-table-cell span {
    cursor: help;
  }
`;

const WrapperFooter = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

export { IconRemoveWrapper, WrapperTable, WrapperFooter };
