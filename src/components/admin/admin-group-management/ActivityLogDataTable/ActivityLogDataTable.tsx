"use client";

import React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useActivityLogDataTableColumns } from "./ActivityLogDataTable.hooks";
import type { ActivityLogDataTableProps } from "./ActivityLogDataTable.types";

export function ActivityLogDataTable({
  data,
  isLoading,
  total,
  pagination,
  onPaginationChange,
}: ActivityLogDataTableProps) {
  const columns = useActivityLogDataTableColumns();

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      pagination={{
        pageIndex: pagination?.pageIndex ?? 0,
        pageSize: pagination?.pageSize ?? 10,
        total,
      }}
      onPaginationChange={onPaginationChange}
      showSearch={false}
      showPagination={true}
      entriesCount={data.length}
      entriesCountLabel="Activity Logs"
      minWidth="800px"
    />
  );
}
