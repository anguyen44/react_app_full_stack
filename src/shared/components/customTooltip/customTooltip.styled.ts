import { Tooltip as TooltipReactBootstrap } from "react-bootstrap";
import styled from "styled-components";

interface CustomToolTipProps {
  minwidth?: string;
}

const CustomToolTip = styled(TooltipReactBootstrap)<CustomToolTipProps>`
  --bs-tooltip-bg: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
  min-width: ${({ minwidth }) => minwidth};
  --bs-tooltip-max-width: ${({ minwidth }) => minwidth ?? "200px"};
`;

export { CustomToolTip };
