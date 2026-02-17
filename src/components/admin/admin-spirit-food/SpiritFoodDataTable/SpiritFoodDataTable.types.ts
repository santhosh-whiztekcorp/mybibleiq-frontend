import type { AdminSpiritFoodSummary } from "@/resources/admin-spirit-food";
import type { PaginationState } from "@tanstack/react-table";

export type SpiritFoodDataTableProps = {
  items: AdminSpiritFoodSummary[];
  isLoading?: boolean;
  pagination?: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
  onPaginationChange?: (pagination: PaginationState) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  currentUserId?: string | null;
  onEdit?: (item: AdminSpiritFoodSummary) => void;
  onSubmit?: (item: AdminSpiritFoodSummary) => void;
  onApprove?: (item: AdminSpiritFoodSummary) => void;
  onCancel?: (item: AdminSpiritFoodSummary) => void;
  onRequestDelete?: (item: AdminSpiritFoodSummary) => void;
  onApproveDelete?: (item: AdminSpiritFoodSummary) => void;
  onCancelDelete?: (item: AdminSpiritFoodSummary) => void;
};
