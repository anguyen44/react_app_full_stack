import {
  CustomFormControl,
  CustomFormLabel,
  CustomFormValueContent,
} from "./customLabel.styled";

interface CustomLabelProps extends React.PropsWithChildren {
  label: React.ReactNode;
}

const CustomLabel = ({ label, children }: CustomLabelProps) => {
  return (
    <CustomFormControl>
      <CustomFormLabel>{label}</CustomFormLabel>
      <CustomFormValueContent>{children}</CustomFormValueContent>
    </CustomFormControl>
  );
};

export default CustomLabel;
