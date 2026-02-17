"use client";

import * as React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useQuestionDataTableColumns } from "./QuestionDataTable.hooks";
import type { QuestionDataTableProps } from "./QuestionDataTable.types";
import type { AdminQuestionSummary } from "@/resources/admin-question/admin-question.types";
import type { Row } from "@tanstack/react-table";

export function QuestionDataTable({
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
}: QuestionDataTableProps) {
  const columns = useQuestionDataTableColumns(onEdit, onDelete, onPublish, onArchive, onClone);

  const getRowClassName = (row: Row<AdminQuestionSummary>): string => {
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
      entriesCountLabel="Questions"
      getRowClassName={getRowClassName}
    />
  );
}
