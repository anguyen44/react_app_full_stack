import CircularProgress from "@mui/material/CircularProgress";
import Layout from "shared/components/layout/layout.component";

import { StyledBackdrop } from "./styled";

export default function LoadingPage({ open, ...rest }) {
  return (
    <>
      <Layout />
      <StyledBackdrop {...{ ...rest, open }}>
        <CircularProgress />
      </StyledBackdrop>
    </>
  );
}
