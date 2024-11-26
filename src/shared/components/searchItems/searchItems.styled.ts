import { FaCheckCircle, FaCirclePlus, FaClockRotate } from "icons";
import styled, { css } from "styled-components";

interface SearchItemWrapperProps {
  disabled?: boolean;
}

const SearchItemWrapper = styled.div<SearchItemWrapperProps>`
  color: #7a7a7a;
  padding: 9px;
  font-size: 13px;
  font-weight: 600;
  display: flex;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.palette.enedis.secondary.blue["200"]};
  }

  &[disabled] {
    cursor: default;
  }
`;

const NotFoundSearchItem = styled.div`
  color: ${({ theme }) => theme.palette.enedis.grey["600"]};
  padding: 9px;
  font-size: 13px;
  font-weight: 600;

  &:hover {
    cursor: not-allowed;
  }
`;

const SearchItemIconWrapper = styled.div`
  width: 25px;
  margin-right: 20px;
  padding-left: 10px;
  margin-top: auto;
  margin-bottom: auto;
`;

const SearchItemIconCommon = css`
  width: 15px;
  height: 15px;
  position: relative;
  bottom: 2px;
`;

const SearchItemIconFaCheck = styled(FaCheckCircle)`
  color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
  ${SearchItemIconCommon}
`;

const SearchItemIconFaClockRotate = styled(FaClockRotate)`
  color: #ffc328;
  ${SearchItemIconCommon}
`;

const SearchItemIconFaCirclePlus = styled(FaCirclePlus)`
  color: ${({ theme }) => theme.palette.enedis.secondary.green["400"]};
  ${SearchItemIconCommon}
`;

const SearchItemName = styled.div<SearchItemWrapperProps>`
  font-weight: bold;
  width: 100%;

  &[disabled] {
    opacity: 0.7;
  }
`;

const SlideWrapper = styled.div`
  max-height: calc(100% - 45px);
  transition: max-height 0.25s ease-in;
  background: white;
  min-height: auto;
  box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 20%);
  margin-top: 5px;
  overflow-y: auto;
  scrollbar-color: #D9D9D9#f5f5f5;
  scrollbar-width: thin;
  scroll-behavior: smooth;
`;

interface SearchIconWrapperProps {
  $isreadyforsearch?: boolean;
}

const SearchIconWrapper = styled.div<SearchIconWrapperProps>`
  background-color: ${({ theme, ...props }) =>
    props.$isreadyforsearch
      ? theme.palette.enedis.secondary.blue["500"]
      : theme.palette.enedis.secondary.blue["200"]};
  height: 2.5rem;
  width: 2.5rem;
  padding: 0px;
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  color: ${(props) =>
    props.$isreadyforsearch
      ? props.theme.palette.enedis.grey["50"]
      : "#a1a1a1"};
  cursor: pointer;
  border-radius: 0px 5px 5px 0px;
`;

export {
  SearchItemWrapper,
  NotFoundSearchItem,
  SearchItemIconWrapper,
  SearchItemIconFaCheck,
  SearchItemIconFaClockRotate,
  SearchItemIconFaCirclePlus,
  SearchItemName,
  SearchIconWrapper,
  SlideWrapper,
};
