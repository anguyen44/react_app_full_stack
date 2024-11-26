import { Skeleton } from "@mui/material";
import { Circle } from "icons";
import styled from "styled-components";

const PageTitle = styled.h3`
  color: ${(props) => props.theme.palette.enedis.grey["900"]};
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  margin-left: 15px;
`;

const IconWrapper = styled.span`
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 3px 8.3px 0.7px rgba(163, 93, 255, 0.35);
  background: linear-gradient(90deg, #da8cff, #9a55ff);
  font-size: 0.9375rem;
  line-height: 36px;
  color: ${(props) => props.theme.palette.enedis.grey["50"]};
  margin-right: 0.7rem;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
    transition: 0.15s ease;
  }
`;

interface ContentItemWrapperProps extends React.HTMLProps<HTMLDivElement> {
  $redbackground?: boolean;
  $bluebackground?: boolean;
  $eternalbackground?: boolean;
  $celestialbackground?: boolean;
  $mountainrockbackground?: boolean;
  $quebalbackground?: boolean;
  margin?: string | number;
  $disableHover?: boolean;
}

const ContentItemWrapper = styled.div<ContentItemWrapperProps>`
  min-height: 150px;
  cursor: ${(props) => (props.$disableHover ? "default" : "pointer")};
  margin: ${(props) => props.margin ?? "0 15px"};
  padding: 2rem 1.2rem 2rem 1.8rem;
  position: relative;
  border-radius: 0.3125rem;
  color: ${(props) => props.theme.palette.enedis.grey["50"]};

  ${(props) =>
    props.$redbackground &&
    `
        background: linear-gradient(90deg, #ffbf96, #fe7096);
    `}
  ${(props) =>
    props.$bluebackground &&
    `
        background: linear-gradient(90deg, #90caf9, #047edf 99%);
    `}

  ${(props) =>
    props.$eternalbackground &&
    `
        background: linear-gradient(90deg,#537895, #09203F);
    `}
  ${(props) =>
    props.$celestialbackground &&
    `
        background: linear-gradient(90deg,#C33764, #1D2671 );
    `}
  ${(props) =>
    props.$mountainrockbackground &&
    `
        background: linear-gradient(90deg,#868F96, #596164 );
    `}
  ${(props) =>
    props.$quebalbackground &&
    `
        background: linear-gradient(90deg,#5ACF86, #11998E );
    `}

   ${(props) =>
    !props.$disableHover &&
    `
    &:hover {
      opacity: 0.75;
      transition: 0.15s ease;
    }
    `}
`;

const CircleCustom = styled(Circle)`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
`;

const HeaderContentItem = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 16px;
`;

const MiddleContentItem = styled.div`
  font-size: 14px;
  text-align: right;
  top: 50px;
  position: relative;
`;

const CasesToValidateNumber = styled.span`
  font-size: 16px;
`;

const ContentItemIconWrapper = styled.div`
  float: right;
  font-weight: 400;
  font-size: 1.73rem;
  position: relative;
  & svg {
    top: 0;
    position: absolute;
    right: 0px;
  }
`;

const SkeletonCustom = styled(Skeleton)`
  &.MuiSkeleton-root {
    height: 100%;
    margin: 0 15px;
  }
`;

export {
  CircleCustom,
  ContentItemIconWrapper,
  ContentItemWrapper,
  HeaderContentItem,
  IconWrapper,
  MiddleContentItem,
  PageTitle,
  SkeletonCustom,
  CasesToValidateNumber,
};
