"use client";

import React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useAnnouncementDataTableColumns } from "./AnnouncementDataTable.hooks";
import type { AnnouncementDataTableProps } from "./AnnouncementDataTable.types";

export function AnnouncementDataTable({
  data,
  isLoading,
  total,
  pagination,
  onPaginationChange,
  onRejectAnnouncement,
  onViewReports,
}: AnnouncementDataTableProps) {
  const columns = useAnnouncementDataTableColumns({ onRejectAnnouncement, onViewReports });

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
      entriesCountLabel="Announcements"
      minWidth="800px"
    />
  );
}
