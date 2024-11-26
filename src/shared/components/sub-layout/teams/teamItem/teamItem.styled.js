import { BiChevronRight } from "icons";
import styled from "styled-components";

const CustomArrowIcon = styled(BiChevronRight)`
  font-size: 22px;
  transition: ${(props) =>
    props.$checked ? "rotate 0.4s linear" : "rotate 0.3s linear"};
  rotate: ${(props) => (props.$checked ? "90deg" : "0deg")};
  height: auto;
`;

const SubTeamsCollapse = styled.div`
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  max-height: ${(props) => (props.$checked ? "1000px" : "0")};
  transition: ${(props) =>
    props.$checked ? "max-height 0.8s ease-in" : "max-height 0.8s ease-out"};
`;

const MenuItemWrapper = styled.div`
  padding-bottom: 5px;
  color: ${({ theme: { palette } }) => palette.enedis.grey["50"]};
  font-weight: 500;
`;

const RotateIconWrapper = styled.span`
  color: black;
  display: block;
  color: ${({ theme: { palette } }) => palette.enedis.grey["50"]};

  &:hover {
    color: ${({ theme }) => theme.palette.enedis.grey["50"]};
  }
`;

export {
  CustomArrowIcon,
  MenuItemWrapper,
  RotateIconWrapper,
  SubTeamsCollapse,
};
