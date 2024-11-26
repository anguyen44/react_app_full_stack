import * as React from "react";

const BsPersonCircle = (props) => {
  return (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-person-circle"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M7.977.004a8 8 0 1 0 .046 15.992A8 8 0 0 0 7.977.004zm-.975 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 5c-1.401 0-2.487.746-3.462 1.467a6.862 6.862 0 0 1 6.924 0C9.462 10.746 8.376 10 7.002 10z" />
    </svg>
  );
};

export default BsPersonCircle;
