import { TableHead, TableRow } from "@mui/material";
import {
  DefaultComponentProps,
  OverridableTypeMap,
} from "@mui/material/OverridableComponent";
import { CustomHeadTableCell } from "shared/components/CustomTableCells/CustomTableCells";
import MyTableSortLabel from "./MyTableSortLabel";

interface TableHeaderProps extends DefaultComponentProps<OverridableTypeMap> {
  headTableData: Column[];
  haveNoActions?: boolean;
  color?: string;
  bgcolor?: string;
  orderDir?: SortType;
  orderBy?: string;
  onSortClick?: (column: string, sortType: string) => void;
}

const TableHeader = ({
  headTableData,
  haveNoActions,
  color,
  orderDir,
  orderBy,
  onSortClick,
  ...props
}: TableHeaderProps) => {
  const headerColor = color ?? (props.bgcolor ? "#fff" : null);

  return (
    <TableHead {...props}>
      <TableRow>
        {headTableData?.map((column, index) => {
          const line = column.name;
          const columnId = column?.sortStatus?.sortCode;

          if (!(haveNoActions && line === "Validation")) {
            if (
              (line === "Action" ||
                line === "Actions" ||
                line === "Validation" ||
                line === "Validations" ||
                line === "Oid") &&
              !haveNoActions
            ) {
              return (
                <CustomHeadTableCell
                  key={"col_" + index}
                  align="center"
                  color={headerColor}
                >
                  {line}
                </CustomHeadTableCell>
              );
            } else {
              return (
                <CustomHeadTableCell
                  key={"col_" + index}
                  color={headerColor}
                  align={line === "Oid" ? "center" : "left"}
                >
                  <MyTableSortLabel
                    columnId={columnId ? columnId : line}
                    {...{ orderBy, orderDir, onSortClick }}
                    columnUnsortable={!column?.sortStatus?.sortable}
                    sortType={column?.sortStatus?.sortType}
                  >
                    {line}
                  </MyTableSortLabel>
                </CustomHeadTableCell>
              );
            }
          }
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
