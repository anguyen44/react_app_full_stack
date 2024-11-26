import styled from "styled-components";
import { boxShadowWrapper } from "styles/cssCustom";

const SubLayoutWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: stretch;
  border-radius: 5px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.palette.enedis.grey["50"]};
  ${boxShadowWrapper}
`;

const SubMenu = styled.div`
  flex-basis: 20%;
  font-size: 14px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  border-radius: 5px 0px 0px 5px;
  background-color: var(--secondary);

  ul {
    height: 100%;
    padding-top: 15px;
    width: 100%;
    padding-left: 0.8rem;
  }
`;

const SubLayoutChildren = styled.div`
  width: 100%;
`;

const SidebarMenuItem = styled.li`
  transition: 0.4s;
  border-radius: 15px 0px 0px 15px;
  padding: 7px 2px 7px 0px;

  &:hover {
    opacity: 0.8;
  }

  &:hover,
  :focus {
    cursor: pointer;
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["600"]};
    transition: 0.4s;
  }
`;

export { SidebarMenuItem, SubLayoutChildren, SubLayoutWrapper, SubMenu };
