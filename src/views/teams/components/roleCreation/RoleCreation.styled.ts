import styled from "styled-components";

interface PortfolioSearchIconSectionWrapperProps {
  active: number;
}

const PortfolioSearchIconSectionWrapper = styled.div<PortfolioSearchIconSectionWrapperProps>`
  color: ${({ active }) => (active ? "#1677ff" : "#bebebe")};
`;

const SelectedPortfolioItemWrapper = styled.div`
  display: inline-flex;
  position: absolute;
  top: 8px;
  left: 10px;
`;

const SelectedPortfolioItem = styled.span`
  display: flex;
  height: 24px;
  margin-bottom: 2px;
  line-height: 22px;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  cursor: default;
  padding-inline-start: 8px;
  padding-inline-end: 4px;
  color: ${({ theme: { palette } }) => palette.enedis.grey["800"]};
  font-size: 14px;
`;

const PortfolioItemDelete = styled.span`
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.45);
  & svg {
    height: 12px;
    width: 12px;
  }

  &:hover {
    color: ${({ theme: { palette } }) => palette.enedis.grey["800"]};
    cursor: pointer;
  }
`;

const PortfolioItemContent = styled.span`
  display: inline-block;
  margin-inline-end: 4px;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
`;

export {
  PortfolioItemContent,
  PortfolioItemDelete,
  PortfolioSearchIconSectionWrapper,
  SelectedPortfolioItem,
  SelectedPortfolioItemWrapper,
};
