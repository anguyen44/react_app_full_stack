import { BsPencilSquare } from "icons";
import styled from "styled-components";

export const CustomModifyPencil = styled(BsPencilSquare)`
  color: ${(props) =>
    props.$isediting
      ? props.theme.palette.enedis.secondary.blue["500"]
      : props.theme.palette.enedis.grey["600"]};
  cursor: pointer;
`;
