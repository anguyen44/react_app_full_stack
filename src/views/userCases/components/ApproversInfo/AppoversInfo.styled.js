import styled from "styled-components";

const CaretRightIconWrapper = styled.div`
  display: inline-block;
  margin-left: 4px;
  color: ${(props) =>
    props.$readableMode
      ? "inherit"
      : props.theme.palette.enedis.secondary.blue["500"]};
  cursor: pointer;

  & svg {
    height: 17px;
    width: 17px;
  }
`;

export { CaretRightIconWrapper };
