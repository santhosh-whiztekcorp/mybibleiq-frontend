"use client";

import * as React from "react";
import { type Row } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import { useGroupDataTableColumns } from "./GroupDataTable.hooks";
import type { GroupDataTableProps } from "./GroupDataTable.types";
import type { AdminGroupListItem } from "@/resources/admin-group-management/admin-group-management.types";

export function GroupDataTable({
  items,
  isLoading = false,
  total = 0,
  pagination,
  onPaginationChange,
  onView,
}: GroupDataTableProps) {
  const columns = useGroupDataTableColumns(onView);

  const getRowClassName = (row: Row<AdminGroupListItem>): string => {
    const status = row.original.status;
    switch (status) {
      case "active":
        return "bg-green-50/30 hover:bg-green-50";
      case "suspended":
        return "bg-red-50/30 hover:bg-red-50";
      default:
        return "";
    }
  };

  return (
    <DataTable
      columns={columns}
      data={items}
      isLoading={isLoading}
      pagination={{
        pageIndex: pagination?.pageIndex ?? 0,
        pageSize: pagination?.pageSize ?? 10,
        total,
      }}
      onPaginationChange={onPaginationChange}
      showSearch={false}
      showPagination={true}
      entriesCount={items.length}
      entriesCountLabel="Groups"
      getRowClassName={getRowClassName}
    />
  );
}
