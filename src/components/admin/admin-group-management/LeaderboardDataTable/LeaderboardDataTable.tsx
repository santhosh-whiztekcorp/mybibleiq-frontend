"use client";

import React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useLeaderboardDataTableColumns } from "./LeaderboardDataTable.hooks";
import type { LeaderboardDataTableProps } from "./LeaderboardDataTable.types";

export function LeaderboardDataTable({
  items,
  isLoading = false,
  total = 0,
  pagination,
  onPaginationChange,
}: LeaderboardDataTableProps) {
  const columns = useLeaderboardDataTableColumns();

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
      entriesCountLabel="Members"
    />
  );
}
