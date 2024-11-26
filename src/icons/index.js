export { default as AdminBadge } from "./bases/AdminBadge";
export { default as AiOutlineClose } from "./bases/AiOutlineClose";
export { default as BiChevronRight } from "./bases/BiChevronRight";
export { default as BsArrowRight } from "./bases/BsArrowRight";
export { default as BsCheckCircle } from "./bases/BsCheckCircle";
export { default as BsCheckCircleFill } from "./bases/BsCheckCircleFill";
export { default as BsFileRuledFill } from "./bases/BsFileRuledFill";
export { default as BsFillPerson } from "./bases/BsFillPerson";
export { default as BsLockFill } from "./bases/BsLockFill";
export { default as BsPencilSquare } from "./bases/BsPencilSquare";
export { default as BsPeopleFill } from "./bases/BsPeopleFill";
export { default as BsPersonCircle } from "./bases/BsPersonCircle";
export { default as BsQuestionFill } from "./bases/BsQuestionFill";
export { default as BsXCircle } from "./bases/BsXCircle";
export { default as CaretRight } from "./bases/CaretRight";
export { default as CgCalendarDate } from "./bases/CgCalendarDate";
export { default as Circle } from "./bases/Circle";
export { default as ConnectWithoutContact } from "./bases/ConnectWithoutContact";
export { default as Copy } from "./bases/Copy";
export { default as Down } from "./bases/Down";
export { default as FaArrowLeft } from "./bases/FaArrowLeft";
export { default as FaCartDown } from "./bases/FaCartDown";
export { default as FaCartPlus } from "./bases/FaCartPlus";
export { default as FaCheck } from "./bases/FaCheck";
export { default as FaCheckCircle } from "./bases/FaCheckCircle";
export { default as FaCirclePlus } from "./bases/FaCirclePlus";
export { default as FaClockRotate } from "./bases/FaClockRotate";
export { default as FaInfoCircle } from "./bases/FaInfoCircle";
export { default as FaKeyboardBackSpace } from "./bases/FaKeyboardBackSpace";
export { default as FaPencilAlt } from "./bases/FaPencilAlt";
export { default as FaPersonPlusFill } from "./bases/FaPersonPlusFill";
export { default as FaPlugCirclePlus } from "./bases/FaPlugCirclePlus";
export { default as FaQuestionCircle } from "./bases/FaQuestionCircle";
export { default as FaSave } from "./bases/FaSave";
export { default as FaSearch } from "./bases/FaSearch";
export { default as FaServer } from "./bases/FaServer";
export { default as FaTimes } from "./bases/FaTimes";
export { default as FaTrash } from "./bases/FaTrash";
export { default as FaUsers } from "./bases/FaUsers";
export { default as FiSearch } from "./bases/FiSearch";
export { default as FiTrash2 } from "./bases/FiTrash2";
export { default as GiCancelCircled } from "./bases/GiCancelCircled";
export { default as HomeIcon } from "./bases/HomeIcon";
export { default as IoMdClose } from "./bases/IoMdClose";
export { default as LamdaUserBadge } from "./bases/LamdaUserBadge";
export { default as Lock } from "./bases/Lock";
export { default as Search } from "./bases/Search";
export { default as Server } from "./bases/Server";
export { default as Settings } from "./bases/Settings";
export { default as Team } from "./bases/Team";
export { default as Up } from "./bases/Up";
export { default as User } from "./bases/User";
export { default as CustomFaCirclePlus } from "./customs/CustomFaCirclePlus";
export { default as CustomFaInfoCircle } from "./customs/CustomFaInfoCircle";
export { default as CustomFaQuestionCircle } from "./customs/CustomFaQuestionCircle";

export const CustomSvgIconWrapper = (props) => {
  const { size, color, icon, style: styleArg, ...svgProps } = props;
  let svgExtraProps = {};

  if (size !== undefined) {
    svgExtraProps.width = `${size}px`;
    svgExtraProps.height = `${size}px`;
  } else {
    // default
    svgExtraProps.width = "24px";
    svgExtraProps.height = "24px";
  }

  if (color !== undefined) {
    svgExtraProps.style = { color, ...styleArg };
  }
  const IconComp = icon;
  return <IconComp {...svgProps} {...svgExtraProps} />;
};
