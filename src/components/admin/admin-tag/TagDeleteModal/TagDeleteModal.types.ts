import type { AdminTagSummary } from "@/resources/admin-tag";

export type TagDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminTagSummary | null;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
};
