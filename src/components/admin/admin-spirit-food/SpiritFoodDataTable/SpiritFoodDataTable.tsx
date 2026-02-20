"use client";

import { DataTable } from "@/components/shared/DataTable";
import { useSpiritFoodDataTableColumns } from "./SpiritFoodDataTable.hooks";
import type { SpiritFoodDataTableProps } from "./SpiritFoodDataTable.types";
import type { AdminSpiritFoodSummary } from "@/resources/admin-spirit-food/admin-spirit-food.types";
import type { Row } from "@tanstack/react-table";

export function SpiritFoodDataTable({
  items,
  isLoading = false,
  pagination,
  onPaginationChange,
  searchValue = "",
  onSearchChange,
  currentUserId,
  onEdit,
  onSubmit,
  onApprove,
  onCancel,
  onRequestDelete,
  onApproveDelete,
  onCancelDelete,
}: SpiritFoodDataTableProps) {
  const columns = useSpiritFoodDataTableColumns(
    currentUserId,
    onEdit,
    onSubmit,
    onApprove,
    onCancel,
    onRequestDelete,
    onApproveDelete,
    onCancelDelete
  );

  const getRowClassName = (row: Row<AdminSpiritFoodSummary>): string => {
    const status = row.original.status;
    switch (status) {
      case "Delivered":
        return "bg-green-50 hover:bg-green-100";
      case "Deleted":
      case "PendingDelete":
        return "bg-red-50 hover:bg-red-100";
      case "Scheduled":
        return "bg-yellow-50 hover:bg-yellow-100";
      case "InProgress":
      case "InReview":
        return "bg-blue-50 hover:bg-blue-100";
      default:
        return "";
    }
  };

  return (
    <DataTable
      columns={columns}
      data={items}
      isLoading={isLoading}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search by book, reference, date, maker or checker..."
      showSearch={false}
      showPagination={true}
      entriesCount={items.length}
      entriesCountLabel="Spirit Food Entries"
      getRowClassName={getRowClassName}
    />
  );
}
