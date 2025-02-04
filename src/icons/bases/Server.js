import * as React from "react";

function Server(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M13 19h1a1 1 0 011 1h7v2h-7a1 1 0 01-1 1h-4a1 1 0 01-1-1H2v-2h7a1 1 0 011-1h1v-2H4a1 1 0 01-1-1v-4a1 1 0 011-1h16a1 1 0 011 1v4a1 1 0 01-1 1h-7v2M4 3h16a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1m5 4h1V5H9v2m0 8h1v-2H9v2M5 5v2h2V5H5m0 8v2h2v-2H5z" />
    </svg>
  );
}

export default Server;
