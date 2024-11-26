import styled, { css } from "styled-components";

interface CustomTextareaProps {
  $isValidInput?: boolean;
}

const CustomInputTextarea = styled.textarea<CustomTextareaProps>`
  ${(props) => props.$isValidInput && logicFocusCss};
  ${(props) => !props.$isValidInput && fetchErrorRegexCss};
`;

interface CustomTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $isValidInput?: boolean;
  $handleFocus?: boolean;
}

const CustomInputText = styled.input<CustomTextProps>`
  ${(props) => props.$isValidInput && props.$handleFocus && logicFocusCss};
  ${(props) => !props.$isValidInput && fetchErrorRegexCss};
`;

const logicFocusCss = css`
  &:focus {
    border: 1px solid #4096ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    border-radius: 5px;
  }
`;

const fetchErrorRegexCss = css`
  border: 2px solid red;
  outline: none;
  box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  border-radius: 5px;
`;

export { CustomInputTextarea, CustomInputText };
