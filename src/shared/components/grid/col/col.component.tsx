interface ColProps {
  spanPercent?: string | number;
  sx?: React.CSSProperties;
}

const Col = ({
  children,
  spanPercent,
  sx,
}: React.PropsWithChildren<ColProps>) => {
  return (
    <div
      style={{
        flexBasis: spanPercent,
        maxWidth: spanPercent,
        ...sx,
      }}
    >
      {children}
    </div>
  );
};

export default Col;
