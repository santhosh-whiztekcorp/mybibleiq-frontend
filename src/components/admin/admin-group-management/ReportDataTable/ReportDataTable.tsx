"use client";

import React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useReportDataTableColumns } from "./ReportDataTable.hooks";
import type { ReportDataTableProps } from "./ReportDataTable.types";

export function ReportDataTable({
  items,
  isLoading = false,
  total = 0,
  pagination,
  onPaginationChange,
  onDismissReport,
  onWarnLeader,
}: ReportDataTableProps) {
  const columns = useReportDataTableColumns(onDismissReport, onWarnLeader);

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
      entriesCountLabel="Reports"
      minWidth="800px"
    />
  );
}
