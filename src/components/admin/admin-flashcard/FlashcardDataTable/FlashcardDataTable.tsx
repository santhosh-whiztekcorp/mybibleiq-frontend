"use client";

import * as React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useFlashcardDataTableColumns } from "./FlashcardDataTable.hooks";
import type { FlashcardDataTableProps } from "./FlashcardDataTable.types";
import type { AdminFlashcardSummary } from "@/resources/admin-flashcard/admin-flashcard.types";
import type { Row } from "@tanstack/react-table";

export function FlashcardDataTable({
  items,
  isLoading = false,
  total = 0,
  pagination,
  onPaginationChange,
  searchValue,
  onSearchChange,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onClone,
}: FlashcardDataTableProps) {
  const columns = useFlashcardDataTableColumns(onEdit, onDelete, onPublish, onArchive, onClone);

  const getRowClassName = (row: Row<AdminFlashcardSummary>): string => {
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
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search flashcards..."
      showSearch={false}
      showPagination={true}
      entriesCount={items.length}
      entriesCountLabel="Flashcards"
      getRowClassName={getRowClassName}
    />
  );
}
