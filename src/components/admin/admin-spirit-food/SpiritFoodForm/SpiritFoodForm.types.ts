import type { AdminSpiritFoodDetail } from "@/resources/admin-spirit-food";

export type SpiritFoodFormMode = "create" | "edit";

export type SpiritFoodFormProps = {
  mode: SpiritFoodFormMode;
  spiritFood?: AdminSpiritFoodDetail;
  onClose?: () => void;
  onSuccess?: () => void;
};
