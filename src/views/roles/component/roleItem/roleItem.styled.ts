import styled from "styled-components";
import { boxShadowWrapper } from "styles/cssCustom";

const WrapperRoleItem = styled.div`
  display: flex;
  padding: 25px;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  ${boxShadowWrapper}
`;

const RoleInfoWrapper = styled.div`
  margin-bottom: 20px;
`;

export { RoleInfoWrapper, WrapperRoleItem };
