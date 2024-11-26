import { TabPanel } from "@mui/lab";
import styled from "styled-components";

const CustomTabPanel = styled(TabPanel)`
  &.MuiTabPanel-root {
    padding: 0 10px 10px 10px;
  }
  .MuiTableCell-root {
    padding: 10px;
  }
`;

export default CustomTabPanel;
