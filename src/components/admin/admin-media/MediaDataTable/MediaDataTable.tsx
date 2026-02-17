"use client";

import * as React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useMediaDataTableColumns } from "./MediaDataTable.hooks";
import type { MediaDataTableProps } from "./MediaDataTable.types";
import type { AdminMediaSummary } from "@/resources/admin-media/admin-media.types";
import type { Row } from "@tanstack/react-table";

export function MediaDataTable({
  items,
  isLoading = false,
  total = 0,
  pagination,
  onPaginationChange,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onClone,
  onPreview,
}: MediaDataTableProps) {
  const columns = useMediaDataTableColumns(onEdit, onDelete, onPublish, onArchive, onClone, onPreview);

  const getRowClassName = (row: Row<AdminMediaSummary>): string => {
    const status = row.original.status;
    switch (status) {
      case "Published":
        return "bg-green-50 hover:bg-green-100";
      case "Archived":
        return "bg-red-50 hover:bg-red-100";
      case "Draft":
        return "bg-gray-100 hover:bg-gray-200";
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
        ...pagination,
        total,
      }}
      onPaginationChange={onPaginationChange}
      showSearch={false}
      showPagination={true}
      entriesCount={items.length}
      entriesCountLabel="Media Items"
      getRowClassName={getRowClassName}
    />
  );
}
