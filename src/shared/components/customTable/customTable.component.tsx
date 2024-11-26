import {
  Skeleton,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableTypeMap,
  Theme,
} from "@mui/material";
import { CustomPaper } from "../CustomPaper/CustomPaper";
import { usePagination } from "shared/hooks/usePagination";
import { useSort } from "shared/hooks/useSort";
import TableFooter from "../Table/TableFooter";
import {
  CustomContentTableCell,
  CustomNoContentTableCell,
} from "../CustomTableCells/CustomTableCells";
import TableHeader from "../Table/TableHeader";
import ItemStatusComponent from "../itemDetails/itemInfos/itemStatus.component";
import React, { Fragment, useEffect } from "react";
import useResizeContainer from "shared/hooks/useResizeContainer";
import { CustomToolTip } from "../customTooltip/customTooltip.styled";
import { OverlayTrigger } from "react-bootstrap";
import { TableRowCustom, TextEllipsisWrapper } from "./customTable.styled";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface CustomTableComponentProps<T> {
  data: T[];
  columns: Column[];
  customNoContentTableName: string;
  isLoading?: boolean;
  headerBackgroundColor?: string;
  headerColor?: string;
  additionalComponent?: (row: T) => React.ReactNode;
  tablePreferences?: TablePreferencesEnum;
  hideHeader?: boolean;
  hideFooter?: boolean;
  resetPage?: Number;
  tableProps?: OverridableComponent<TableTypeMap>;
  sxTableContainer?: SxProps<Theme>;
  sxTableRow?: SxProps<Theme>;
  emphasiseRowByCondition?: (row: T) => boolean;
}

function CustomTableComponent<T>({
  data: initData,
  columns,
  customNoContentTableName,
  isLoading,
  headerBackgroundColor,
  headerColor,
  additionalComponent,
  tablePreferences,
  hideHeader,
  hideFooter,
  resetPage,
  tableProps = {} as OverridableComponent<TableTypeMap>,
  sxTableContainer,
  sxTableRow,
  emphasiseRowByCondition,
}: CustomTableComponentProps<T>) {
  const { ref: tableRef, width: tableWidth } =
    useResizeContainer<HTMLTableElement>(
      !columns ||
        !columns.some(
          (col) => col.showTextEllipsis && isColWidthInPercent(col),
        ),
    );

  const {
    page,
    setPage,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPageOptions,
    countedListForShowing,
  } = usePagination(tablePreferences, hideFooter);

  const { orderDir, orderBy, onSortClick, sortItemsByCallbackAndDir } =
    useSort();

  let data = sortItemsByCallbackAndDir(initData) as T[];

  useEffect(() => {
    if (resetPage) {
      setPage(0);
    }
  }, [resetPage]);

  function isColWidthInPercent(col: Column) {
    const colWidth = col.width as string;
    return colWidth && colWidth.includes && colWidth.includes("%");
  }

  const getColWidth = (col: Column) => {
    const colWidth = col.width as string;
    if (isColWidthInPercent(col)) {
      return {
        maxWidth:
          tableWidth > 0
            ? tableWidth * (parseInt(colWidth.replace("%", "")) / 100) + "px"
            : "inherit",
        width: "fit-content",
      } as React.CSSProperties;
    } else {
      return { width: "inherit" } as React.CSSProperties;
    }
  };

  const getColValue = (col: Column, element: T | any) => {
    if (col.field === "isActive") {
      return (
        <ItemStatusComponent
          isActive={element[col.field]}
          style={{ marginLeft: "12px" }}
        />
      );
    } else if (col.customField) {
      return col.customField(element);
    } else {
      const value = element[col.field];
      if (col.showTextEllipsis) {
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <CustomToolTip
                placement="bottom"
                id="tooltip"
                minwidth={value?.length > 20 ? "200px" : "inherit"}
              >
                {value}
              </CustomToolTip>
            }
            rootClose={true}
            container={document.getElementById("portalOverlayTooltip")}
            flip
            delay={{ show: 1000, hide: 0 }}
          >
            <TextEllipsisWrapper
              style={{
                ...getColWidth(col),
              }}
            >
              {value}
            </TextEllipsisWrapper>
          </OverlayTrigger>
        );
      }
      return value;
    }
  };

  return (
    <>
      {isLoading || !data ? (
        <Skeleton variant="rounded" height={50} width="100%" />
      ) : (
        <TableContainer component={CustomPaper} sx={sxTableContainer}>
          <Table ref={tableRef} sx={{ minWidth: 650 }} {...tableProps}>
            {!hideHeader && (
              <TableHeader
                headTableData={columns}
                bgcolor={headerBackgroundColor}
                color={headerColor}
                {...{ orderDir, orderBy, onSortClick }}
              />
            )}
            <TableBody>
              <>
                {data?.length > 0 ? (
                  countedListForShowing([...data]).map((element, index) => (
                    <Fragment key={"globalRow_" + index}>
                      <TableRowCustom
                        key={index}
                        sx={sxTableRow}
                        $emphasised={
                          emphasiseRowByCondition &&
                          emphasiseRowByCondition(element)
                        }
                      >
                        {columns.map((col) => (
                          <CustomContentTableCell
                            key={index + "_" + col.field}
                            width={col.width}
                            align={
                              col.isAction || col.alignCenter
                                ? "center"
                                : "left"
                            }
                            sx={
                              col.isAction
                                ? {
                                    paddingTop: "6px!important",
                                    paddingBottom: "6px!important",
                                  }
                                : undefined
                            }
                          >
                            {getColValue(col, element)}
                          </CustomContentTableCell>
                        ))}
                      </TableRowCustom>
                      {additionalComponent && (
                        <TableRow key={"additionalRow_" + index}>
                          <TableCell
                            style={{ padding: 0 }}
                            colSpan={columns.length}
                          >
                            {additionalComponent(element)}
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <TableRow>
                    <CustomNoContentTableCell colSpan="100%" align="center">
                      {customNoContentTableName}
                    </CustomNoContentTableCell>
                  </TableRow>
                )}
              </>
            </TableBody>
            {!hideFooter && (
              <TableFooter
                count={data.length}
                {...{
                  rowsPerPageOptions,
                  isLoading,
                  rowsPerPage,
                  page,
                  handleChangePage,
                  handleChangeRowsPerPage,
                }}
              />
            )}
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default CustomTableComponent;
