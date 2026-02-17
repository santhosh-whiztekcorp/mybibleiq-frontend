import { AdminMediaSummary } from "@/resources/admin-media/admin-media.types";

export type MediaDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminMediaSummary | null;
  onConfirm: () => void;
  isLoading?: boolean;
};
