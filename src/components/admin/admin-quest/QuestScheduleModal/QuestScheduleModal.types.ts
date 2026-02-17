import type { AdminQuestSummary } from "@/resources/admin-quest/admin-quest.types";

export type QuestScheduleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminQuestSummary | null;
  onConfirm: (publishAt: string) => void;
  isLoading?: boolean;
};
