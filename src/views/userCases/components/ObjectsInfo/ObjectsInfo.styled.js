import styled from "styled-components";

const CaretRightIconWrapper = styled.div`
  color: ${(props) =>
    props.$readableMode
      ? "inherit"
      : props.theme.palette.enedis.secondary.blue["500"]};
  cursor: pointer;
  & a {
    display: grid;
    grid-template-columns: 0.1fr 0.1fr;
  }
  & svg {
    height: 17px;
    width: 17px;
  }
`;

export { CaretRightIconWrapper };
