import { AdminMediaSummary } from "@/resources/admin-media/admin-media.types";

export type MediaPreviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminMediaSummary | null;
};
