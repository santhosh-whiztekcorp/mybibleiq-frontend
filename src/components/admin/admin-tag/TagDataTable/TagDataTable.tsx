"use client";

import * as React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useTagDataTableColumns } from "./TagDataTable.hooks";
import { TagDataTableProps } from "./TagDataTable.types";

export function TagDataTable({
  items,
  isLoading = false,
  total = 0,
  pagination,
  onPaginationChange,
  searchValue,
  onSearchChange,
  onEdit,
  onDelete,
}: TagDataTableProps) {
  const columns = useTagDataTableColumns(onEdit, onDelete);

  return (
    <DataTable
      columns={columns}
      data={items}
      isLoading={isLoading}
      pagination={{
        ...pagination,
        total,
      }}
      onPaginationChange={onPaginationChange}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search tags..."
      showSearch={false}
      showPagination={true}
      entriesCount={items.length}
      entriesCountLabel="Tags"
    />
  );
}
