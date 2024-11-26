import styled from "styled-components";

const PlusIconWrapper = styled.div`
  text-align: right;
  padding: ${(props) => (props.padding ? props.padding : "inherit")};
`;

export default PlusIconWrapper;
