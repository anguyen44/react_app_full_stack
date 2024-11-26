import Button from "antd/es/button";
import { DefaultOptionType } from "antd/es/select";
import { useCallback, useMemo } from "react";
import { SelectValueType } from "./floatSelect.component";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";

interface UseCustomSelectProps {
  showSelectAll: boolean;
  options: DefaultOptionType[];
  value: SelectValueType;
  onChange: (value: SelectValueType) => void;
  additionalComponent?: React.ReactNode;
  fetching: boolean;
}

export function useCustomSelect({
  showSelectAll = true,
  options = [],
  value,
  onChange,
  additionalComponent = <></>,
  fetching,
}: UseCustomSelectProps) {
  const handleSelectAll = useCallback(() => {
    onChange?.(options.map((option) => option.value as string));
  }, [onChange, options]);

  const handleUnselectAll = useCallback(() => {
    onChange?.([]);
  }, [onChange]);

  const dropdownRender = useMemo(() => {
    const selectButton = showSelectAll ? (
      <Col spanPercent={"50%"}>
        <Button
          style={{ paddingLeft: "12px", fontSize: "14px" }}
          type="link"
          onClick={!value?.length ? handleSelectAll : handleUnselectAll}
        >
          {!value?.length ? "Tout sélectionner" : "Tout désélectionner"}
        </Button>
      </Col>
    ) : (
      <></>
    );

    return (menu) => (
      <>
        {!fetching && (
          <Row>
            {selectButton}
            {additionalComponent}
          </Row>
        )}
        {menu}
      </>
    );
  }, [
    handleSelectAll,
    handleUnselectAll,
    options,
    showSelectAll,
    value?.length,
  ]);

  return {
    dropdownRender,
    onChange,
    options,
  };
}
