import { FaQuestionCircle } from "icons";
import styled from "styled-components";

const CustomFaQuestionCircle = styled(FaQuestionCircle)`
  cursor: help;
  color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
  width: 1.25em;
  height: 1.25em;
`;

export default CustomFaQuestionCircle;
