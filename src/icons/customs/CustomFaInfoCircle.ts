import { FaInfoCircle } from "icons";
import styled from "styled-components";

const CustomFaInfoCircle = styled(FaInfoCircle)`
  color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
  width: 1.25em;
  height: 1.25em;
`;

export default CustomFaInfoCircle;
