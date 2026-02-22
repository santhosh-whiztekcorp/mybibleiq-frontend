"use client";

import React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useGlobalUpdateDataTableColumns } from "./GlobalUpdateDataTable.hooks";
import type { GlobalUpdateDataTableProps } from "./GlobalUpdateDataTable.types";

export function GlobalUpdateDataTable({
  items,
  isLoading,
  total,
  pagination,
  onPaginationChange,
  onView,
  onEdit,
  onDeliver,
  onDelete,
}: GlobalUpdateDataTableProps) {
  const columns = useGlobalUpdateDataTableColumns(onView, onEdit, onDeliver, onDelete);

  return (
    <DataTable
      columns={columns}
      data={items}
      isLoading={isLoading}
      pagination={{
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        total,
      }}
      onPaginationChange={(newPagination) => onPaginationChange(newPagination.pageIndex, newPagination.pageSize)}
      showSearch={false}
      showPagination={true}
      entriesCount={items.length}
      entriesCountLabel="Updates"
    />
  );
}
