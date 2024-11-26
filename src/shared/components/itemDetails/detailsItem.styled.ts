import styled from "styled-components";
import { CustomModifyPencil } from "../CustomModifyPencil/CustomModifyPencil";

export const ItemWrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
`;

interface ItemInfosProps {
  $infosStyle?: React.CSSProperties;
}

export const ItemInfos = styled.div<ItemInfosProps>`
  height: ${({ $infosStyle }) => $infosStyle?.height ?? "100px"};
  margin-bottom: 20px;
  border-radius: 0 5px 0 0;
`;

export const Wrap = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
`;

export const WrapOperation = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  height: auto;
  padding: 0.7em 1em;
  margin-bottom: 1.5em;
`;

export const DetailsItemModifyPencil = styled(CustomModifyPencil)`
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 1;
`;
