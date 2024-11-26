import { TableSortLabel } from "@mui/material";
import { tableSortLabelClasses } from "@mui/material/TableSortLabel";
import ImportExportIcon from "@mui/icons-material/ImportExport";

type MyTableSortLabelProps = {
  columnId: string;
  columnUnsortable?: boolean;
  orderBy: string;
  orderDir: SortType;
  onSortClick: (column: string, sortType: string) => void;
  sortType?: string;
  children: React.ReactNode;
};

const MyTableSortLabel: React.FC<MyTableSortLabelProps> = ({
  columnId,
  columnUnsortable,
  orderBy,
  orderDir,
  onSortClick,
  sortType,
  children,
}) => {
  if (columnUnsortable) {
    return <>{children}</>;
  }

  const handleClickSort = () => onSortClick(columnId, sortType);

  const active = orderBy === columnId;
  return (
    <TableSortLabel
      active={active}
      direction={active ? orderDir : "desc"}
      onClick={handleClickSort}
      sx={{
        [`.${tableSortLabelClasses.icon}`]: {
          opacity: 0.5,
        },
        "&.Mui-active": {
          "&&": {
            color: "white",
            "& * ": {
              color: "white",
            },
          },
        },
        "&:hover": {
          color: "white",

          "&& $icon": {
            opacity: 1,
            color: "white",
          },
        },
      }}
      IconComponent={active ? undefined : ImportExportIcon}
    >
      {children}
    </TableSortLabel>
  );
};

export default MyTableSortLabel;
