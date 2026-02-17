import type { AdminQuestSummary } from "@/resources/admin-quest/admin-quest.types";

export type QuestCardProps = {
  item: AdminQuestSummary;
  onEdit?: (item: AdminQuestSummary) => void;
  onDelete?: (item: AdminQuestSummary) => void;
  onPublish?: (item: AdminQuestSummary) => void;
  onArchive?: (item: AdminQuestSummary) => void;
  onClone?: (item: AdminQuestSummary) => void;
  onSchedule?: (item: AdminQuestSummary) => void;
  onManageStages?: (item: AdminQuestSummary) => void;
};
