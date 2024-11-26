import { NavDropdown } from "react-bootstrap";
import styled from "styled-components";

const CustomNavDropDown = styled(NavDropdown)`
  color: gainsboro;
  .nav-link {
    padding: 0.5rem 0.5rem;
    span {
      color: gainsboro;
      &:hover,
      &:focus {
        color: ${({ theme }) => theme.palette.enedis.grey["50"]};
      }
    }
  }
  .show {
    top: 54px;
  }
`;

export default CustomNavDropDown;
