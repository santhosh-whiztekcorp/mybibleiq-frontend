import type { AdminQuestSummary, QuestStatusAction } from "@/resources/admin-quest/admin-quest.types";

export type QuestStatusActionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminQuestSummary | null;
  action: QuestStatusAction | null;
  onConfirm: () => void;
  isLoading?: boolean;
};

export type UseQuestStatusActionModalProps = QuestStatusActionModalProps;
