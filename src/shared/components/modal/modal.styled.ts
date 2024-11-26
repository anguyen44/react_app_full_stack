import { IoMdClose } from "icons";
import styled, { keyframes } from "styled-components";

const StyledIoMdClose = styled(IoMdClose)`
  padding: 5px 7px;
`;

const BackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(49, 49, 49, 0.8);
  z-index: 1;
`;

const fadeShow = keyframes`
 0% {  opacity: 0; }
 100% {  opacity: 1; }
`;

export interface StyleModalProps {
  width?: number | string;
  height?: string;
  maxwidth?: string;
  top?: string;
}

const ModalWrapper = styled.div<StyleModalProps>`
  position: fixed;
  top: ${({ top }) => top ?? "10%"};
  left: 50%;
  margin-left: 0;
  margin-top: 0;
  transform: translate(-50%, 0%);
  line-height: 1.4;
  background: white;
  border-radius: 6px;
  max-width: ${({ maxwidth }) => (maxwidth ? `${maxwidth}` : "100vw")};
  width: ${({ width }) => width};
  min-height: auto;
  height: ${({ height }) => height};
  z-index: 2;
  animation-name: ${fadeShow};
  animation-duration: 0.6s;
`;

const ModalHeader = styled.div`
  padding: 10px 15px;
  font-size: 15px;
  color: ${({ theme }) => theme.palette.enedis.grey["50"]};
  font-weight: 600;
  background-color: ${({ theme }) =>
    theme.palette.enedis.secondary.blue["500"]};
  border-radius: 5px 5px 0 0;
`;

interface ModalContentWrapperProps {
  contentpadding?: string;
}

const ModalContentWrapper = styled.div<ModalContentWrapperProps>`
  padding: ${({ contentpadding }) =>
    contentpadding ? `${contentpadding}` : "15px"};
  height: calc(100% - 45px);
`;

const ModalClosure = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${({ theme }) => theme.palette.enedis.grey["50"]};

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.palette.enedis.secondary.blue["600"]};
    border-radius: 5px;
    transition: all 0.25s;
  }
`;

const ModalFooter = styled.div`
  margin-bottom: 20px;
`;

export {
  BackDrop,
  ModalClosure,
  ModalContentWrapper,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
  StyledIoMdClose,
};
