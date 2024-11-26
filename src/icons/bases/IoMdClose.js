import * as React from "react";

const IoMdClose = (props) => {
  return (
    <svg viewBox="0 0 512 512" height="32" width="32" {...props}>
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M368 368L144 144M368 144L144 368"
      />
    </svg>
  );
};

export default IoMdClose;
