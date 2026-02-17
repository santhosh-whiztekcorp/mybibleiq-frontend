import type { AdminQuestSummary } from "@/resources/admin-quest/admin-quest.types";

export type QuestDataTableProps = {
  items: AdminQuestSummary[];
  isLoading?: boolean;
  total?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onEdit?: (item: AdminQuestSummary) => void;
  onDelete?: (item: AdminQuestSummary) => void;
  onPublish?: (item: AdminQuestSummary) => void;
  onArchive?: (item: AdminQuestSummary) => void;
  onClone?: (item: AdminQuestSummary) => void;
  onSchedule?: (item: AdminQuestSummary) => void;
  onManageStages?: (item: AdminQuestSummary) => void;
};
