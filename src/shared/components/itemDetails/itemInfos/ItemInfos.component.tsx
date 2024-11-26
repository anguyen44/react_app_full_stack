import { Skeleton } from "@mui/material";
import { format } from "date-fns";
import { CgCalendarDate, User } from "icons";
import { useEffect, useState } from "react";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import { removeAllLineBreaks } from "shared/utils/global.utils";

import {
  ItemDate,
  ItemDisplayNameWrapper,
  ItemInfoSection,
  ItemOwner,
  ItemTitle,
} from "./itemInfos.styled";
import {
  CommonPageReducers,
  CommonPageState,
} from "shared/store/slices/common/commonPageReducers";
import { Slice } from "@reduxjs/toolkit";
import ItemStatusComponent from "./itemStatus.component";
import { CustomTextInput } from "shared/components/customInput/customInput.component";
import { CustomTextarea } from "shared/components/customInput/customTextarea.component";
import { GenericElementModel } from "shared/model/genericElement.model";
import { useAppDispatch, useAppSelector } from "shared/store";

interface ItemInfosComponent<T extends GenericElementModel> {
  item: T;
  reducerState: CommonPageState;
  slice: Slice<CommonPageReducers>;
  icon: React.ReactNode;
  showName?: boolean;
  disableEditName?: boolean;
  disableEditDescription?: boolean;
  hideCreatedDate?: boolean;
  onUpdateDisplayName?: (displayName: String, callback: () => void) => void;
  onUpdateDescription?: () => {};
}

function ItemInfosComponent<T extends GenericElementModel>({
  item,
  reducerState,
  slice,
  icon,
  showName,
  disableEditName,
  disableEditDescription,
  hideCreatedDate,
  onUpdateDisplayName,
  onUpdateDescription,
}: ItemInfosComponent<T>) {
  const { isLoadingPage } = reducerState;
  const dispatch = useAppDispatch();
  const { isActive, owner } = item;
  const { createTimestamp } = item as any;

  let { name, displayName, description } = item;

  displayName = displayName + (showName ? " (".concat(name).concat(")") : "");
  displayName = removeAllLineBreaks(displayName);
  description = removeAllLineBreaks(description);

  const [displayNameForChange, setDisplayNameForChange] = useState("");
  const [descriptionForChange, setDescriptionForChange] = useState("");

  const regexConfig = useAppSelector(
    (state) => state.globalUiReducer.regexConfig,
  );

  useEffect(() => {
    setDisplayNameForChange(displayName);
  }, [displayName]);

  useEffect(() => {
    setDescriptionForChange(description);
  }, [description]);

  return (
    <>
      <Row>
        <Col spanPercent={"40%"}>
          <ItemInfoSection>
            <ItemTitle>
              <Row>
                <Col>{icon}</Col>
                <Col spanPercent={"72%"}>
                  <ItemDisplayNameWrapper>
                    {isLoadingPage ? (
                      <Skeleton variant="rounded" height="100%" width={200} />
                    ) : (
                      <CustomTextInput
                        value={displayNameForChange}
                        setChangeValue={setDisplayNameForChange}
                        onAction={onUpdateDisplayName}
                        disabled={disableEditName}
                        initValue={displayName}
                        regex={regexConfig?.regexName}
                      />
                    )}
                  </ItemDisplayNameWrapper>
                </Col>
              </Row>
            </ItemTitle>

            {!hideCreatedDate && (
              <ItemDate>
                <CgCalendarDate title="Date de création" minwidth="120px" />
                {isLoadingPage ? (
                  <Skeleton variant="text" height="100%" width={70} />
                ) : (
                  <>
                    <span>
                      {createTimestamp
                        ? format(new Date(createTimestamp), "dd/MM/yyyy")
                        : "None"}
                    </span>
                  </>
                )}
              </ItemDate>
            )}

            <ItemStatusComponent
              isActive={isActive}
              title={"Statut"}
              isLoadingPage={isLoadingPage}
              displayText={true}
            />

            <ItemOwner>
              {isLoadingPage ? (
                <Skeleton variant="text" height="100%" width={70} />
              ) : (
                <>
                  {owner?.oid && (
                    <div>
                      <User title="Propriétaire" />
                      <span>{owner.givenName + " " + owner.name}</span>
                    </div>
                  )}
                </>
              )}
            </ItemOwner>
          </ItemInfoSection>
        </Col>
        <Col spanPercent={"57%"}>
          <div className="description">
            <div className="editTitle">
              <span>Description</span>
            </div>
            {isLoadingPage ? (
              <Skeleton variant="rounded" height="4em" width="100%" />
            ) : (
              <CustomTextarea
                value={descriptionForChange}
                setChangeValue={setDescriptionForChange}
                onAction={onUpdateDescription}
                disabled={disableEditDescription}
                initValue={description}
                regex={regexConfig?.regexDescription}
              />
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ItemInfosComponent;
