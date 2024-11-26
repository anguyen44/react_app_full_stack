import { Skeleton } from "@mui/material";
import { BsCheckCircle, BsXCircle } from "icons";
import { ItemStatus } from "./itemInfos.styled";

interface ItemStatusComponentProps {
  isActive: boolean;
  title?: string;
  isLoadingPage?: boolean;
  displayText?: boolean;
  style?: React.CSSProperties;
  fontSize?: string;
}

function ItemStatusComponent({
  isActive,
  title,
  isLoadingPage = false,
  displayText = false,
  style,
  fontSize,
}: ItemStatusComponentProps) {
  const text = isActive ? "Actif" : "Désactivé";
  return (
    <ItemStatus $enable={isActive} fontSize={fontSize}>
      {isLoadingPage ? (
        <Skeleton variant="text" height="100%" width={70} />
      ) : (
        <>
          {isActive ? (
            <BsCheckCircle style={style} title={title ?? text} />
          ) : (
            <BsXCircle style={style} title={title ?? text} />
          )}
          {displayText && <span>{text}</span>}
        </>
      )}
    </ItemStatus>
  );
}

export default ItemStatusComponent;
