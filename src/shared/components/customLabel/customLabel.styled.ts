import { FormControl, FormLabel } from "@mui/material";
import styled from "styled-components";

const CustomFormControl = styled(FormControl)`
  flex-direction: row !important;
`;

const CustomFormLabel = styled(FormLabel)`
  font-weight: 600 !important;
  color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]}!important;
`;

const CustomFormValueContent = styled.span`
  margin-left: 15px;
`;

export { CustomFormControl, CustomFormLabel, CustomFormValueContent };
