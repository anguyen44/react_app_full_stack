import { CircularProgress } from "@mui/material";

import { WrapperCircularProgress } from "./Loading.styled";

interface LoadingComponentProps {
  size?: string | number;
  padding?: string;
}

const LoadingComponent = ({ size, padding }: LoadingComponentProps) => {
  return (
    <WrapperCircularProgress padding={padding}>
      <CircularProgress size={size ? `${size}px` : "15px"} color="inherit" />
    </WrapperCircularProgress>
  );
};

interface LoadingWithDivComponentProps extends LoadingComponentProps {
  divPadding?: string;
}

export const LoadingWithDivComponent = ({
  divPadding,
  ...props
}: LoadingWithDivComponentProps) => {
  return (
    <div style={{ padding: divPadding ?? "10px" }}>
      <LoadingComponent {...props} />
    </div>
  );
};

export default LoadingComponent;
