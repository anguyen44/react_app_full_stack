import TabsComponent from "shared/components/tabs/Tabs.component";
import ConfirmDialog from "shared/components/warning/ConfirmDialog.component";
import { useConfirm } from "shared/hooks/useDialog";
import {
  ItemInfos,
  ItemWrapper,
  Wrap,
  WrapOperation,
} from "./detailsItem.styled";
import ItemOperationsComponent from "./itemOperations/itemOperations.component";
import { useAppDispatch } from "shared/store";
import { Slice } from "@reduxjs/toolkit";
import { CommonPageReducers } from "shared/store/slices/common/commonPageReducers";
interface ItemDetailsComponentProps extends React.PropsWithChildren {
  tabsComponentTitle: string[];
  tabsComponentContent: React.ReactNode[];
  infosStyle?: React.CSSProperties;
  slice: Slice<CommonPageReducers>;
}

function ItemDetailsComponent({
  tabsComponentTitle,
  tabsComponentContent,
  children,
  infosStyle,
  slice,
}: ItemDetailsComponentProps) {
  const dispatch = useAppDispatch();
  const { onConfirm, onCancel, show, title, text, type } = useConfirm();

  const { toggleIsWrittingStatus } = slice.actions as any;

  const modifyInfos = () => {
    dispatch(toggleIsWrittingStatus());
  };

  return (
    <>
      <ConfirmDialog {...{ onConfirm, onCancel, show, title, text, type }} />
      <ItemWrapper>
        <ItemInfos $infosStyle={infosStyle}>{children}</ItemInfos>

        <WrapOperation>
          <ItemOperationsComponent />
        </WrapOperation>

        <Wrap>
          <TabsComponent
            title={tabsComponentTitle}
            content={tabsComponentContent}
          />
        </Wrap>
      </ItemWrapper>
    </>
  );
}

export default ItemDetailsComponent;
