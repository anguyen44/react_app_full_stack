import * as React from "react";

const BsArrowRight = (props) => {
  return (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-arrow-right"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M11.354 8.354a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708 0l-.708-.708a.5.5 0 0 1 0-.708L9.293 8l-3.354-3.354a.5.5 0 0 1 0-.708l.708-.708a.5.5 0 0 1 .708 0l4 4z"
      />
      <path
        fillRule="evenodd"
        d="M4.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  );
};

export default BsArrowRight;
