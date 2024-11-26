interface SortStatusProps {
  sortable: boolean;
  sortCode: string;
  sortType: string;
}

interface Column {
  name: string;
  field: string;
  customField?: (row: any) => React.ReactNode;
  width?: string | number;
  showTextEllipsis?: boolean;
  isAction?: boolean;
  alignCenter?: boolean;
  sortStatus?: SortStatusProps;
}
