import { FaSearch } from "icons";
import styled from "styled-components";

export const SearchBox = styled.div`
  width: 100%;
`;

export const CustomSearchIcon = styled(FaSearch)`
  position: absolute;
  top: 25%;
  left: -4%;
  color: ${(props) => props.theme.palette.enedis.grey["600"]};
`;
