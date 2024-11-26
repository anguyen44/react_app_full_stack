import { Paper } from "@mui/material";
import styled from "styled-components";
import { boxShadowWrapper } from "styles/cssCustom";

const CustomPaper = styled(Paper)`
  &.MuiPaper-root {
    ${boxShadowWrapper}
    border-radius: 5px;
  }
`;

const CustomPaperForTableInModal = styled(Paper)`
  &.MuiPaper-root {
    ${boxShadowWrapper}
    border-radius: 5px;
    max-height: 50vh;
    overflow: auto;
  }
`;

export { CustomPaper, CustomPaperForTableInModal };
