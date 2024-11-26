import styled from "styled-components";

interface EditTextAreaProps {
  $disabledMode?: boolean;
  $isHovering?: boolean;
  $isFocusing?: boolean;
  $isFetching?: boolean;
  $isValidInput?: boolean;
}

const EditTextArea = styled.textarea<EditTextAreaProps>`
  height: 4.5em;
  width: 100%;
  resize: none;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme, ...props }) =>
    props.$disabledMode ? theme.palette.enedis.grey["600"] : "inherit"};
`;

const NumberCharactersWrapper = styled.div`
  flex-grow: 1;
  text-align: right;
  color: ${({ theme }) => theme.palette.enedis.grey["700"]};
  font-size: 10px;
`;

export { EditTextArea, NumberCharactersWrapper };
