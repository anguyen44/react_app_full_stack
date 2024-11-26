import {
  SearchItemIconFaCheck,
  SearchItemIconFaClockRotate,
  SearchItemIconFaCirclePlus,
} from "./searchItems.styled";

interface SearchItemIconProps {
  isAdded: boolean;
  isBeingAdded: boolean;
  title?: string;
}

const SearchItemIcon = ({
  isAdded,
  isBeingAdded,
  title,
}: SearchItemIconProps) => {
  const tooltipProps = {
    title: title,
    delay: { show: 500, hide: 0 },
    minwidth: "max-content",
  };
  if (isAdded) {
    return <SearchItemIconFaCheck {...tooltipProps} />;
  } else if (isBeingAdded) {
    return <SearchItemIconFaClockRotate {...tooltipProps} />;
  } else {
    return <SearchItemIconFaCirclePlus {...tooltipProps} />;
  }
};

export default SearchItemIcon;
