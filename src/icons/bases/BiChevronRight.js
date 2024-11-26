import GenericSvgIcon, { getChildProps } from "../customs/GenericSvgIcon";

const BiChevronRight = (props) => {
  return (
    <GenericSvgIcon {...props}>
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        {...getChildProps(props)}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </GenericSvgIcon>
  );
};

export default BiChevronRight;
