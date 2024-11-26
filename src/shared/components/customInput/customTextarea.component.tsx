import {
  CustomEditTextArea,
  TextareaModifBox,
  TextareaModifIconWrapper,
} from "./customInput.styled";
import useModifForm from "./useModifForm";

interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onAction: (value: any, callback: () => void) => void;
  initValue: string;
  setChangeValue: (value: any) => void;
  regex: string;
}

const CustomTextarea = ({
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
}: React.DetailedHTMLProps<CustomTextareaProps, HTMLTextAreaElement>) => {
  const {
    handleChange,
    focusing,
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
    <TextareaModifBox ref={refModifBox}>
      <div
        className="formWrapperPosition"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
      >
        {renderModifyIconSection(TextareaModifIconWrapper)}
        {renderSpinnerIconSection(TextareaModifIconWrapper)}
        <CustomEditTextArea
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
    </TextareaModifBox>
  );
};

export { CustomTextarea };
