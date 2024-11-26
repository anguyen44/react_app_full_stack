import { FaCirclePlus } from "icons";
import styled from "styled-components";

const CustomFaCirclePlus = styled(FaCirclePlus)`
  color: ${({ theme }) => theme.palette.enedis.secondary.green["400"]};
  width: 34px;
  height: 34px;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
    transition: 0.3s;
  }
`;

export default CustomFaCirclePlus;
