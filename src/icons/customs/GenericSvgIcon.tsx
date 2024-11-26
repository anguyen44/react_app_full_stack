import { OverlayTrigger } from "react-bootstrap";
import { OverlayDelay } from "react-bootstrap/esm/OverlayTrigger";
import { CustomToolTip } from "shared/components/customTooltip/customTooltip.styled";

export interface GenericSvgIconProps extends React.SVGProps<SVGSVGElement> {
  title?: React.ReactNode;
  minwidth?: string;
  delay?: OverlayDelay;
  children?: React.ReactElement;
}

const GenericSvgIcon = ({
  title,
  minwidth,
  delay,
  children,
}: GenericSvgIconProps) => {
  const tooltip = title ? (
    <CustomToolTip placement="bottom" id="tooltip" minwidth={minwidth}>
      {title}
    </CustomToolTip>
  ) : null;
  return tooltip ? (
    <OverlayTrigger
      placement="bottom"
      overlay={tooltip}
      delay={delay}
      rootClose={true}
      container={document.getElementById("portalOverlayTooltip")}
      flip
    >
      {children}
    </OverlayTrigger>
  ) : (
    <>{children}</>
  );
};

export const getChildProps = (props: GenericSvgIconProps) => {
  const childProps = {
    ...props,
    title: undefined,
    minwidth: undefined,
    delay: undefined,
    children: undefined,
  };
  return childProps;
};

export default GenericSvgIcon;
