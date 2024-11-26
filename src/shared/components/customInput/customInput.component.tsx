import {
  CustomInput,
  InputModifIconWrapper,
  InputModifBox,
} from "./customInput.styled";
import useModifForm from "./useModifForm";

interface CustomTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onAction: (value: any, callback: () => void) => void;
  initValue: string;
  setChangeValue: (value: any) => void;
  regex: string;
}

const CustomTextInput = ({
  placeholder,
  onChange,
  onKeyDown,
  onFocus,
  value,
  disabled = false,
  name,
  onAction,
  initValue,
  setChangeValue,
  regex,
  ...rest
}: React.DetailedHTMLProps<CustomTextInputProps, HTMLInputElement>) => {
  const {
    focusing,
    handleChange,
    hovering,
    isFetching,
    inputRef,
    refModifBox,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    ActionComponent,
    renderSpinnerIconSection,
    renderModifyIconSection,
    renderAlertDialogCurrentEdit,
    isValidInput,
  } = useModifForm(initValue, value, setChangeValue, onAction, disabled, regex);

  renderAlertDialogCurrentEdit();

  return (
    <InputModifBox ref={refModifBox}>
      <div
        className="formWrapperPosition"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
      >
        {renderModifyIconSection(InputModifIconWrapper)}
        {renderSpinnerIconSection(InputModifIconWrapper)}
        <CustomInput
          {...{
            ...rest,
            placeholder,
            onKeyDown,
            onFocus,
            value,
            disabled,
            name,
          }}
          onChange={handleChange}
          type="text"
          aria-label="text-input"
          title={!focusing && !disabled ? "Cliquer pour modifier" : ""}
          ref={inputRef}
          disabled={disabled}
          $isHovering={hovering}
          $isFocusing={focusing}
          $isFetching={isFetching}
          $isValidInput={isValidInput}
        />
      </div>
      <ActionComponent />
    </InputModifBox>
  );
};

export { CustomTextInput };
