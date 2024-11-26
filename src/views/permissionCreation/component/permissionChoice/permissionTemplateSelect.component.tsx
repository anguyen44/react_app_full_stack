import Form from "antd/es/form";
import FloatSelect, {
  FloatSelectProps,
  SelectValueType,
} from "./floatSelect.component";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "shared/store";
import PermissionTemplateSelectModel from "shared/model/permissionTemplate/permissionTemplateSelect.model";
import PermissionTemplateItemCreationModalComponent from "./permissionTemplateItemCreationModal.component";
import PermissionTemplateSelectUserInputModel from "shared/model/permissionTemplate/permissionTemplateSelectUserInput.model";
import PlusIconWrapper from "shared/components/PlusIconWrapper/PlusIconWrapper";
import { Button } from "antd";
import { useModal } from "shared/hooks/useModal";
import { useState } from "react";
import { CreationParams } from "./useLoadPermissionTemplateOptions";
import Col from "shared/components/grid/col/col.component";

interface PermissionTemplateSelectComponentProps
  extends Omit<FloatSelectProps, "setValue"> {
  setValue: ActionCreatorWithPayload<SelectValueType>;
  permissionTemplateSelectList?: PermissionTemplateSelectModel[];
  portfolioFullName?: string;
  creationParams?: CreationParams;
  isFemaleLabel?: boolean;
  prefixName?: string;
}

function PermissionTemplateSelectComponent({
  setValue,
  permissionTemplateSelectList,
  portfolioFullName,
  creationParams,
  isFemaleLabel,
  prefixName,
  ...props
}: PermissionTemplateSelectComponentProps) {
  const dispatch = useAppDispatch();

  const modalProps = useModal();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [initNameValue, setInitNameValue] = useState("");

  const handleSetValue = (value: SelectValueType) => {
    dispatch(setValue(value));
  };

  const isDisabled =
    props.disabled ??
    (!permissionTemplateSelectList || permissionTemplateSelectList.length == 0);

  const userInputTemplate = permissionTemplateSelectList?.find(
    (permissionTemplateSelect) =>
      permissionTemplateSelect.isTypeUserInputValid(),
  ) as PermissionTemplateSelectUserInputModel;

  const hasUserInput = userInputTemplate != null && creationParams != null;

  const handleOpenModal = () => {
    setInitNameValue(searchValue?.toUpperCase());
    if (typeof props.value == "string") {
      handleSetValue("");
    } else {
      handleSetValue([]);
    }
    setIsDropDownOpen(false);
    modalProps.onOpenModal();
  };

  const itemLabel = `un${isFemaleLabel ? "e" : ""} ${props.label.toLocaleLowerCase()}`;

  const additionalComponent = hasUserInput ? (
    <Col spanPercent={"100%"}>
      <PlusIconWrapper>
        <Button
          style={{
            paddingLeft: "12px",
            fontSize: "14px",
          }}
          type="link"
          onClick={handleOpenModal}
        >
          {`Ajouter ${itemLabel}${searchValue?.length ? " (" + searchValue.toUpperCase() + ")" : ""}`}
        </Button>
      </PlusIconWrapper>
    </Col>
  ) : (
    <></>
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue?.length) {
      let foundValue = props.options?.find(
        (option) =>
          (option.value as string).toLowerCase() === searchValue.toLowerCase(),
      );

      if (foundValue) {
        if (props.isMulti) {
          const values = [...props.optionValue];
          const presentValue = values.find(
            (value) => value === foundValue.value,
          );

          if (presentValue) {
            values.splice(values.indexOf(presentValue), 1);
          } else {
            values.push(foundValue.value as string);
          }
          handleSetValue(values);
        } else {
          handleSetValue(foundValue.value as string);
        }

        setSearchValue("");
      } else if (
        hasUserInput &&
        !props.options?.some((option) =>
          (option.value as string)
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
        )
      ) {
        handleOpenModal();
      }
    }
  };

  return (
    <>
      {hasUserInput && (
        <PermissionTemplateItemCreationModalComponent
          userInputTemplate={userInputTemplate}
          portfolioFullName={portfolioFullName}
          modalProps={modalProps}
          creationParams={creationParams}
          itemLabel={itemLabel}
          initNameValue={initNameValue}
          prefixName={prefixName}
        />
      )}
      <Form.Item name={props.label}>
        <FloatSelect
          placeholder={props.placeholder ?? `${props.label}...`}
          setValue={handleSetValue}
          disabled={isDisabled}
          additionalComponent={additionalComponent}
          disableSearch={!props.isMulti && !hasUserInput}
          open={isDropDownOpen}
          onDropdownVisibleChange={setIsDropDownOpen}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleInputKeyDown={handleInputKeyDown}
          {...props}
        />
      </Form.Item>
    </>
  );
}

export default PermissionTemplateSelectComponent;
