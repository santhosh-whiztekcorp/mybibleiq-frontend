import type { AdminQuestSummary } from "@/resources/admin-quest/admin-quest.types";

export type QuestDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminQuestSummary | null;
  onConfirm: () => void;
  isLoading?: boolean;
};
