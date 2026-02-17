import type { ColumnDef, PaginationState, SortingState, Row } from "@tanstack/react-table";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pagination?: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
  onPaginationChange?: (pagination: PaginationState) => void;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showPagination?: boolean;
  className?: string;
  entriesCount?: number;
  entriesCountLabel?: string;
  minWidth?: string;
  getRowClassName?: (row: Row<TData>) => string;
};
