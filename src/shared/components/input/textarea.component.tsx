import { CustomInputTextarea } from "./input.styled";

interface TextInputProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  isValidInput?: boolean;
}

const TextareaInput = ({ isValidInput = true, ...rest }: TextInputProps) => {
  return (
    <CustomInputTextarea
      {...rest}
      className="formWrapper"
      aria-label="text-input"
      $isValidInput={isValidInput}
    />
  );
};

export { TextareaInput };
