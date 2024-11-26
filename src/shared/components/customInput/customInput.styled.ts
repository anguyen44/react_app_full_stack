import { FaCheck, FaTimes } from "icons";
import styled, { css } from "styled-components";
import { EditTextArea } from "../EditTextArea/EditTextArea";

interface CustomNoContentTableCellProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  $isHovering?: boolean;
  $isFocusing?: boolean;
  $isFetching?: boolean;
  $isValidInput?: boolean;
}

const CustomInput = styled.input<CustomNoContentTableCellProps>`
  border: none;
  height: 2.5rem;
  padding: 0.5em;
  padding-left: 0.2em;
  width: 100%;
  font-size: 17px;
  font-weight: 600;
  border-radius: 5px 0 0 5px;
  background-color: #ffffff;
  color: #248bc0;

  ${(props) => !props.disabled && props.$isHovering && logicHoverCss}
  ${(props) =>
    !props.disabled &&
    props.$isFocusing &&
    props.$isValidInput &&
    logicFocusCss}  
  ${(props) => !props.disabled && props.$isFetching && logicFetchingCss}
  ${(props) => !props.disabled && !props.$isValidInput && fetchErrorRegexCss}
`;

const modifyIconCss = css`
  background-color: #dfe1e6;
  padding: 0px;
  position: absolute;
  box-sizing: border-box;
  transform: translateY(-50%);
  cursor: pointer;
  color: #172b4d;
`;

const InputModifIconWrapper = styled.div`
  height: 2.5rem;
  width: 1.5rem;
  right: -1.2em;
  top: 50%;

  ${modifyIconCss}
`;

const TextareaModifIconWrapper = styled.div`
  height: 74px;
  width: 1.5rem;
  right: -1.5em;
  top: 38px;
  ${modifyIconCss}
`;

const InputModifBox = styled.div`
  position: relative;
  width: 110%;
`;

const TextareaModifBox = styled.div`
  position: relative;
`;

const ActionWrapper = styled.div`
  position: absolute;
  right: 0;
  box-shadow: 0 3px 6px rgba(111, 111, 111, 0.2);
  border: 1px solid #dfe1e5;
  border-radius: 0 0 5px 5px;
  padding: 0 2px;
  background-color: white;
`;

const buttonActionCss = css`
  color: #707070;
  font-size: 16px;
  cursor: pointer;
  margin: 2px;
  padding: 0 3px;
  background: #dfe1e5;
  border-radius: 3px;
  transition: all 0.5s;
  &:hover {
    color: #333;
    background: #c1c7d0;
  }
`;

const logicHoverCss = css`
  border: 0.5px solid #e9e9e9;
  outline: none;
  box-shadow: 0px 0px 1px #bebebe;
`;

const logicFocusCss = css`
  &:focus {
    border: 1px solid #4096ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    border-radius: 5px;
  }
`;

const logicFetchingCss = css`
  border: 0.5px solid #e9e9e9;
  outline: none;
  box-shadow: 0px 0px 1px #bebebe;
  pointer-events: none;
  background-color: #e0e0e0;
  opacity: 0.5;
`;

const CustomEditTextArea = styled(EditTextArea)`
  padding: 0.5em;
  border-radius: 5px 0 0 5px;
  width: 100%;
  border: 1.5px solid #e9e9e9;
  font-size: 15px;
  height: 5em;

  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;

  ${(props) => !props.disabled && props.$isHovering && logicHoverCss};
  ${(props) =>
    !props.disabled &&
    props.$isFocusing &&
    props.$isValidInput &&
    logicFocusCss};
  ${(props) => !props.disabled && props.$isFetching && logicFetchingCss};
  ${(props) => !props.disabled && !props.$isValidInput && fetchErrorRegexCss};
`;

const CustomFaCheck = styled(FaCheck)`
  ${buttonActionCss}
`;

const CustomFaTimes = styled(FaTimes)`
  ${buttonActionCss}
`;

const fetchErrorRegexCss = css`
  border: 2px solid red;
  outline: none;
  box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  border-radius: 5px;
`;

export {
  CustomInput,
  InputModifIconWrapper,
  ActionWrapper,
  CustomFaCheck,
  CustomFaTimes,
  InputModifBox,
  CustomEditTextArea,
  TextareaModifIconWrapper,
  TextareaModifBox,
};
