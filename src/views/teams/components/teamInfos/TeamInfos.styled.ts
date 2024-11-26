import { FaUsers } from "icons";
import styled from "styled-components";

export const NameTeamLogo = styled(FaUsers)`
  height: 2em;
  width: 2em;
  color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
`;
