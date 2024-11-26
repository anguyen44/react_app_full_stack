import { FaCartPlus } from "icons";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const ContainerWrapper = styled(Container)`
  padding-left: 0;
  height: 100%;
`;

const HeaderCartWrapper = styled.div`
  font-weight: 700;
  padding: 10px 8px;
  font-size: 14px;
  display: flex;

  background-color: ${({ theme }) =>
    theme.palette.enedis.secondary.blue["500"]};

  border-radius: 4px 4px 0 0;
  color: ${({ theme: { palette } }) => palette.enedis.grey["50"]};
`;

const HeaderCartIcon = styled(FaCartPlus)`
  margin-left: 5px;
  margin-right: 12px;
`;

const HeaderCartContent = styled.div`
  position: relative;
  top: 1px;
`;

const HeaderDeleteAllCartElementsWrapper = styled.div`
  height: 20px;
  width: 20px;
  position: relative;
  bottom: 2px;
  margin-left: auto;
  margin-right: 5%;

  & svg {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.enedis.grey["50"]};
    height: 18px;
    width: 18px;
  }
`;

const TableContentWrapper = styled.div`
  height: calc(100% - 68px);
`;

const LoadingWrapper = styled.div`
  color: ${({ theme }) => theme.palette.enedis.grey["600"]};
  position: absolute;
  display: flex;
  width: 100%;
  margin-left: 20px;
  top: 10px;
`;

export {
  ContainerWrapper,
  HeaderCartWrapper,
  HeaderCartIcon,
  HeaderCartContent,
  HeaderDeleteAllCartElementsWrapper,
  TableContentWrapper,
  LoadingWrapper,
};
