import { TabPanel, TabPanelProps } from "@mui/lab";
import { Tab, TabProps } from "@mui/material";
import styled from "styled-components";

interface CustomTabProps extends TabProps {
  $withBackground?: boolean;
  color?: string;
}

export const CustomTab = styled(Tab)<CustomTabProps>`
  &.MuiTab-root {
    font-weight: 600;
    font-size: 14px;
    font-family: var(--fontFamily);
    color: ${({ theme, ...props }) =>
      props.color ?? theme.palette.enedis.secondary.blue["500"]};
  }

  &.Mui-selected {
    background: ${({ theme, ...props }) =>
      props.$withBackground && theme.palette.enedis.secondary.blue["500"]};
    color: ${({ theme, ...props }) =>
      (props.$withBackground || props.color) &&
      (props.color ?? theme.palette.enedis.grey["50"]) + "!important"};
  }
`;

interface CustomTabPanelProps extends TabPanelProps {
  height?: string;
  maxheight?: string;
}

export const CustomTabPanel = styled(TabPanel)<CustomTabPanelProps>`
  &.MuiTabPanel-root {
    padding: 16px;
    min-height: 200px;
  }
  .MuiTableCell-root {
    padding: 10px;
  }
`;
