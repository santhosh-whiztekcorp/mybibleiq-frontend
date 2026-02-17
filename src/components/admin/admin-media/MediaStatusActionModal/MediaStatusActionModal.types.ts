import { AdminMediaSummary, MediaStatusAction } from "@/resources/admin-media/admin-media.types";

export type MediaStatusActionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminMediaSummary | null;
  action: MediaStatusAction | null;
  onConfirm: () => void;
  isLoading?: boolean;
};
