import styled from "styled-components";

interface StyleRowProps {
  margin?: string;
  height?: string;
}

const StyleRow = styled.div<StyleRowProps>`
  display: flex;
  margin: ${({ margin }) => (margin ? margin : "0")};
  height: ${({ height }) => (height ? height : "auto")};
`;

interface RowProps extends StyleRowProps {
  sx?: React.CSSProperties;
}

const Row = ({
  children,
  sx,
  margin,
  height,
}: React.PropsWithChildren<RowProps>) => {
  return (
    <StyleRow style={{ ...sx }} margin={margin} height={height}>
      {children}
    </StyleRow>
  );
};

export default Row;
