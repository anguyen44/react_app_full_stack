import TableFooter from "shared/components/Table/TableFooter";
import styled from "styled-components";

const PermisisonTableFooterInModal = styled(TableFooter)`
  ${(props) =>
    props.$isSticky &&
    `
    &.MuiTableFooter-root {
      position: sticky;
      bottom: 0;
      background: white;
      border-top: 1px solid #e0e0e0;
    }
    `}
`;

const SpanContent = styled.span`
  font-size: 14px;
  margin-left: 5px;
  word-break: break-word;
  max-height: 100px;
  overflow: auto;
  display: ${(props) => (props.$isBlock ? "block" : "inline")};
`;

const TableWrapper = styled.div`
  padding: 10px 0 10px 0;
`;

export { PermisisonTableFooterInModal, SpanContent, TableWrapper };
