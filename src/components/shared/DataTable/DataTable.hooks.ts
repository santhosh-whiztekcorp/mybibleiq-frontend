"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import type { DataTableProps } from "./DataTable.types";

export function useDataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPaginationChange,
  sorting = [],
  onSortingChange,
}: Pick<
  DataTableProps<TData, TValue>,
  "columns" | "data" | "pagination" | "onPaginationChange" | "sorting" | "onSortingChange"
>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(sorting);
  const [internalPagination, setInternalPagination] = React.useState<PaginationState>({
    pageIndex: pagination?.pageIndex ?? 0,
    pageSize: pagination?.pageSize ?? 10,
  });

  // Use controlled sorting if provided, otherwise use internal state
  const currentSorting = onSortingChange ? sorting : internalSorting;
  const handleSortingChange = React.useCallback(
    (updater: SortingState | ((old: SortingState) => SortingState)) => {
      const newSorting = typeof updater === "function" ? updater(currentSorting) : updater;
      if (onSortingChange) {
        onSortingChange(newSorting);
      } else {
        setInternalSorting(newSorting);
      }
    },
    [currentSorting, onSortingChange]
  );

  // Use controlled pagination if provided, otherwise use internal state
  const currentPagination = React.useMemo(
    () =>
      onPaginationChange
        ? {
            pageIndex: pagination?.pageIndex ?? 0,
            pageSize: pagination?.pageSize ?? 10,
          }
        : internalPagination,
    [onPaginationChange, pagination?.pageIndex, pagination?.pageSize, internalPagination]
  );

  const handlePaginationChange = React.useCallback(
    (updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
      const newPagination = typeof updater === "function" ? updater(currentPagination) : updater;
      if (onPaginationChange) {
        onPaginationChange(newPagination);
      } else {
        setInternalPagination(newPagination);
      }
    },
    [currentPagination, onPaginationChange]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: onPaginationChange ? undefined : getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: !!onPaginationChange,
    manualSorting: !!onSortingChange,
    pageCount: pagination ? Math.ceil(pagination.total / pagination.pageSize) : undefined,
    state: {
      sorting: currentSorting,
      pagination: currentPagination,
    },
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
  });

  const pageCount = pagination ? Math.ceil(pagination.total / pagination.pageSize) : table.getPageCount();
  const canPreviousPage = currentPagination.pageIndex > 0;
  const canNextPage = currentPagination.pageIndex < pageCount - 1;

  return {
    table,
    currentPagination,
    pageCount,
    canPreviousPage,
    canNextPage,
    handlePaginationChange,
  };
}
