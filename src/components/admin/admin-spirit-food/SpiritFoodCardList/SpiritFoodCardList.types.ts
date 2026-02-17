import type { AdminSpiritFoodSummary } from "@/resources/admin-spirit-food";

export type SpiritFoodCardListProps = {
  items: AdminSpiritFoodSummary[];
  currentUserId?: string | null;
  onEdit?: (item: AdminSpiritFoodSummary) => void;
  onSubmit?: (item: AdminSpiritFoodSummary) => void;
  onApprove?: (item: AdminSpiritFoodSummary) => void;
  onCancel?: (item: AdminSpiritFoodSummary) => void;
  onRequestDelete?: (item: AdminSpiritFoodSummary) => void;
  onApproveDelete?: (item: AdminSpiritFoodSummary) => void;
  onCancelDelete?: (item: AdminSpiritFoodSummary) => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
};
