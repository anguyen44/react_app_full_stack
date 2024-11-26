import { FaPencilAlt } from "icons";
import styled from "styled-components";

const RoleInfoEditIcon = styled(FaPencilAlt)`
  color: ${(props) =>
    props.$isediting
      ? props.theme.palette.enedis.secondary.green["400"]
      : props.theme.palette.enedis.secondary.blue["500"]};
  &:hover {
    color: ${({ theme }) => theme.palette.enedis.secondary.green["400"]};
  }
  margin-left: 15px;
  cursor: pointer;
`;

const DisplayNameInput = styled.input`
  border-color: rgb(162, 161, 161);
  border-radius: 5px;
`;

const RoleInfosSectionWrapper = styled.div`
  line-height: 34px;
`;

export { DisplayNameInput, RoleInfoEditIcon, RoleInfosSectionWrapper };
