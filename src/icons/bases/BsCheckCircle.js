import GenericSvgIcon, { getChildProps } from "../customs/GenericSvgIcon";

const BsCheckCircle = (props) => {
  return (
    <GenericSvgIcon {...props}>
      <svg
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-check-circle"
        viewBox="0 0 16 16"
        {...getChildProps(props)}
      >
        <path
          fillRule="evenodd"
          d="M0 8A8 8 0 1 0 16 8A8 8 0 0 0 0 8zM11.293 4.293a1 1 0 0 1 1.414 0l1 1a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L6 10.586l4.293-4.293a1 1 0 0 1 1.414 0z"
        />
      </svg>
    </GenericSvgIcon>
  );
};

export default BsCheckCircle;
