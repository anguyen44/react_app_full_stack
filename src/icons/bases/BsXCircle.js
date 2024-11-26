import GenericSvgIcon, { getChildProps } from "../customs/GenericSvgIcon";

const BsXCircle = (props) => {
  return (
    <GenericSvgIcon {...props}>
      <svg
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x-circle"
        viewBox="0 0 512 512"
        {...getChildProps(props)}
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
      </svg>
    </GenericSvgIcon>
  );
};

export default BsXCircle;