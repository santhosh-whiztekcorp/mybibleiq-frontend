"use client";

import * as React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useUserDataTableColumns } from "./UserDataTable.hooks";
import type { UserDataTableProps } from "./UserDataTable.types";
import type { AdminUserListItem } from "@/resources/admin-user-management/admin-user-management.types";
import type { Row } from "@tanstack/react-table";

export function UserDataTable({
  items,
  isLoading = false,
  total = 0,
  pagination,
  onPaginationChange,
  onView,
}: UserDataTableProps) {
  const columns = useUserDataTableColumns(onView);

  const getRowClassName = (row: Row<AdminUserListItem>): string => {
    const status = row.original.status;
    switch (status) {
      case "active":
        return "bg-green-50 hover:bg-green-100";
      case "suspended":
        return "bg-red-50 hover:bg-red-100";
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
      entriesCountLabel="Users"
      getRowClassName={getRowClassName}
    />
  );
}
