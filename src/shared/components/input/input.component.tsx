import { CustomInputText } from "./input.styled";

interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isValidInput?: boolean;
  handleFocus?: boolean;
  innerRef?: any;
}

const TextInput = ({
  isValidInput = true,
  handleFocus = false,
  innerRef,
  ...rest
}: TextInputProps) => {
  return (
    <CustomInputText
      {...rest}
      ref={innerRef}
      type="text"
      className="formWrapper"
      aria-label="text-input"
      $isValidInput={isValidInput}
      $handleFocus={handleFocus}
    />
  );
};

export { TextInput };
