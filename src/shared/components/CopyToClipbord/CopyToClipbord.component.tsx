import { IconButton } from "@mui/material";
import { Copy } from "icons";
import { useAppDispatch } from "shared/store";
import { triggerAlertCard } from "shared/store/slices/globalUi/globalUi.slice";
import styled from "styled-components";
import MESSAGES from "shared/config/constants/message.config";
import CustomTooltipAntd from "../customTooltipAntd/customTooltipAntd";

export const CopyButtonWrapper = styled(IconButton)`
  cursor: pointer;
  padding: 0;
  & svg {
    color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
    height: 14px;
    width: 14px;
  }
`;

const CopyToClipBoard = ({ text }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        dispatch(
          triggerAlertCard({
            type: "info",
            message: MESSAGES.COPIED_DATA,
            duration: 1500,
          }),
        );
      })
      .catch((error) => {
        console.error("error when copying oid of a case ", error);
      });
  };

  return (
    <CustomTooltipAntd text={""} title={"Copier identifiant"}>
      <CopyButtonWrapper onClick={handleClick}>
        <Copy />
      </CopyButtonWrapper>
    </CustomTooltipAntd>
  );
};

export default CopyToClipBoard;
