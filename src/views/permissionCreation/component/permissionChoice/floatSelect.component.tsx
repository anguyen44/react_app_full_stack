import Empty from "antd/es/empty";
import Select, { DefaultOptionType, SelectProps } from "antd/es/select";
import Spin from "antd/es/spin";
import { useEffect, useState } from "react";

import { useCustomSelect } from "./useCustomSelect";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { getOmittedValuesTooltip } from "shared/utils/permissionTemplate.util";

export interface FloatSelectProps extends SelectProps {
  label?: string;
  placeholder?: string;
  type?: SizeType;
  required?: boolean;
  optionValue?: SelectValueType;
  setValue: (value: SelectValueType) => void;
  disabled?: boolean;
  options: DefaultOptionType[];
  fetching?: boolean;
  isMulti?: boolean;
  disableSearch?: boolean;
  additionalComponent?: React.ReactNode;
  searchValue?: string;
  setSearchValue?: SetState<string>;
  handleInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export type SelectValueType = string | string[];

const FloatSelect = ({
  label,
  placeholder,
  type = "default" as SizeType,
  required,
  optionValue: value,
  setValue,
  disabled,
  options,
  fetching,
  isMulti = false,
  disableSearch,
  additionalComponent,
  searchValue,
  setSearchValue = () => null,
  handleInputKeyDown,
  ...otherProps
}: FloatSelectProps) => {
  const [isOccupied, setIsOccupied] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleChange = (value: SelectValueType) => {
    setValue(value);
    setSearchValue("");
  };

  const onSearch = (valueText: string) => {
    if ((valueText && valueText.length > 0) || (value && value.length > 0)) {
      setSearchValue(valueText);
      setIsOccupied(true);
    } else {
      setSearchValue("");
    }
  };

  const onClear = () => {
    setSearchValue("");
    setIsOccupied(true);
  };

  const onBlur = () => {
    setFocused(false);
    if (!value || value.length === 0) {
      setIsOccupied(false);
    }
  };

  const onFocus = () => {
    setFocused(true);
    if (isMulti) {
      setSearchValue("");
    }
    setIsOccupied(true);
  };

  useEffect(() => {
    if (value && value.length !== 0) {
      onClear();
    } else {
      if (focused && isMulti) {
        onClear();
      } else {
        setIsOccupied(false);
      }
    }
  }, [value]);

  if (!placeholder) placeholder = label;

  const labelClass =
    isOccupied || focused ? "label as-label" : "label as-placeholder";

  const requiredMark = required ? <span className="text-danger">*</span> : null;

  const sharedProps = isMulti
    ? {
        mode: "multiple" as "multiple" | "tags",
        maxTagCount: "responsive" as number | "responsive",
      }
    : {};

  const selectProps = useCustomSelect({
    showSelectAll: options?.length && isMulti ? true : false,
    value,
    onChange: handleChange,
    options,
    additionalComponent,
    fetching,
  });

  const settingProps = {
    allowClear: true,
    size: type,
    showSearch: !disableSearch,
    virtual: false,
    style: {
      width: "100%",
    },
  };

  return (
    <div className="float-label">
      <Select
        {...sharedProps}
        {...selectProps}
        {...settingProps}
        onSearch={onSearch}
        searchValue={searchValue}
        onClear={onClear}
        onBlur={onBlur}
        onFocus={onFocus}
        onInputKeyDown={handleInputKeyDown}
        disabled={disabled}
        value={value}
        notFoundContent={
          fetching ? (
            <Spin size="small" />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Pas de données"
            />
          )
        }
        defaultActiveFirstOption={false}
        maxTagPlaceholder={isMulti ? getOmittedValuesTooltip : undefined}
        onDropdownVisibleChange={otherProps.onDropdownVisibleChange}
        open={otherProps.open}
        autoFocus={otherProps.autoFocus}
      />
      <label className={labelClass}>
        {isOccupied || focused ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
};

export default FloatSelect;
