"use client";

import * as React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useAssignmentDataTableColumns } from "./AssignmentDataTable.hooks";
import type { AssignmentDataTableProps } from "./AssignmentDataTable.types";

export function AssignmentDataTable({
  items,
  isLoading = false,
  total = 0,
  pagination,
  onPaginationChange,
}: AssignmentDataTableProps) {
  const columns = useAssignmentDataTableColumns();

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
      entriesCountLabel="Assignments"
      minWidth="900px"
    />
  );
}
