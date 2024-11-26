import { FormControl, FormControlTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FaCirclePlus, FaPlugCirclePlus } from "icons";
import styled, { css } from "styled-components";

const ModalTitleWrapper = styled.div`
  display: flex;
  font-size: 16px;
  margin-right: 20px;
`;

const TextTitleWrapperCss = css`
  margin-top: auto;
  margin-bottom: auto;
`;

const IconTitleWrapper = styled.div`
  ${TextTitleWrapperCss}
  position:relative;
  bottom: 1px;
`;

const TextTitleWrapper = styled.div`
  ${TextTitleWrapperCss}
`;

const IconTitleCss = css`
  font-size: 22px;
  margin-right: 10px;
`;

const IconTitleCirclePlus = styled(FaCirclePlus)`
  ${IconTitleCss}
`;

const IconTitlePlugCirclePlus = styled(FaPlugCirclePlus)`
  ${IconTitleCss}
`;

const LoadingWrapper = styled.div`
  position: absolute;
  float: left;
  display: flex;
  width: 100%;
  margin-left: 22px;
  top: 10px;
`;

interface FormControlWrapperProps
  extends OverridableComponent<FormControlTypeMap> {
  isRequired?: boolean;
}

const FormControlWrapper = styled(FormControl)<FormControlWrapperProps>`
  width: 100%;

  & fieldset {
    ${(props) => props.isRequired && "border: 1px solid #4096ff;"}

    legend {
      width: auto;
      font-size: 0.7em;
    }
  }

  label[data-shrink="true"] {
    font-size: 15px !important;
    font-weight: 500 !important;
    opacity: 1 !important;
  }

  & .MuiInputLabel-asterisk {
    color: ${({ theme }) => theme.palette.enedis.secondary.red["500"]};
  }

  .ant-select-selection-item {
    font-size: 16px;
  }
`;

export {
  ModalTitleWrapper,
  IconTitleWrapper,
  TextTitleWrapper,
  IconTitleCirclePlus,
  IconTitlePlugCirclePlus,
  LoadingWrapper,
  FormControlWrapper,
};
