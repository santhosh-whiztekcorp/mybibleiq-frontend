import type { ReviewAction } from "@/screens/admin/SpiritFoodManagerPage/SpiritFoodManagerPage.types";
import type { AdminSpiritFoodSummary } from "@/resources/admin-spirit-food";

export type SpiritFoodReviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: ReviewAction;
  item: AdminSpiritFoodSummary | null;
  onConfirm: (comment: string) => Promise<void>;
  isLoading: boolean;
};
