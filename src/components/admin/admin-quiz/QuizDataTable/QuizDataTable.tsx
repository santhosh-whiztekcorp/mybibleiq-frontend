"use client";

import * as React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useQuizDataTableColumns } from "./QuizDataTable.hooks";
import type { QuizDataTableProps } from "./QuizDataTable.types";
import type { AdminQuizSummary } from "@/resources/admin-quiz/admin-quiz.types";
import type { Row } from "@tanstack/react-table";

export function QuizDataTable({
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
  onSchedule,
}: QuizDataTableProps) {
  const columns = useQuizDataTableColumns(onEdit, onDelete, onPublish, onArchive, onClone, onSchedule);

  const getRowClassName = (row: Row<AdminQuizSummary>): string => {
    const status = row.original.status;
    switch (status) {
      case "Published":
        return "bg-green-50 hover:bg-green-100";
      case "Archived":
        return "bg-red-50 hover:bg-red-100";
      case "Draft":
        return "bg-gray-100 hover:bg-gray-200";
      case "Scheduled":
        return "bg-yellow-50 hover:bg-yellow-100";
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
      entriesCountLabel="Quizzes"
      getRowClassName={getRowClassName}
    />
  );
}
