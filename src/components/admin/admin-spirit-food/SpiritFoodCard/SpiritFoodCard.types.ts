import type { AdminSpiritFoodSummary } from "@/resources/admin-spirit-food";

export type SpiritFoodCardProps = {
  item: AdminSpiritFoodSummary;
  onEdit?: (item: AdminSpiritFoodSummary) => void;
  onSubmit?: (item: AdminSpiritFoodSummary) => void;
  onApprove?: (item: AdminSpiritFoodSummary) => void;
  onCancel?: (item: AdminSpiritFoodSummary) => void;
  onRequestDelete?: (item: AdminSpiritFoodSummary) => void;
  onApproveDelete?: (item: AdminSpiritFoodSummary) => void;
  onCancelDelete?: (item: AdminSpiritFoodSummary) => void;
  currentUserId?: string | null;
};
