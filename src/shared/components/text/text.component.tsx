import React from "react";

interface BlueSectionTitleProps extends React.PropsWithChildren {
  size?: string;
}

const BlueSectionTitle = ({ children, size }: BlueSectionTitleProps) => {
  return (
    <div
      style={{
        color: "#248BC0",
        fontWeight: 600,
        fontSize: `${size ? size : ""}`,
      }}
    >
      {children}
    </div>
  );
};

export { BlueSectionTitle };
