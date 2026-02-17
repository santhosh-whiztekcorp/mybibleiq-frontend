import { AdminQuestStatusEnum, QuestStatusActionEnum } from "./admin-quest.schemas";
import type { AdminQuestStatus, QuestStatusAction, AdminQuestListInput } from "./admin-quest.types";

/* ---- Quest Status Options ---- */
export const QUEST_STATUS_OPTIONS = AdminQuestStatusEnum.options;
export const QUEST_STATUS_LABELS: Record<AdminQuestStatus, string> = {
  Draft: "Draft",
  Published: "Published",
  Archived: "Archived",
  Scheduled: "Scheduled",
};

/* ---- Quest Status Actions ---- */
export const QUEST_STATUS_ACTIONS = QuestStatusActionEnum.options;
export const QUEST_STATUS_ACTION_LABELS: Record<QuestStatusAction, string> = {
  Publish: "Publish",
  Archive: "Archive",
  Schedule: "Schedule",
  Clone: "Clone",
};

/* ---- Query Keys ---- */
export const adminQuestQueryKeys = {
  all: ["admin-quests"] as const,
  lists: () => [...adminQuestQueryKeys.all, "list"] as const,
  list: (filters: AdminQuestListInput) => [...adminQuestQueryKeys.lists(), filters] as const,
  details: () => [...adminQuestQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminQuestQueryKeys.details(), id] as const,
  stats: () => [...adminQuestQueryKeys.all, "stats"] as const,
  statsStatus: () => [...adminQuestQueryKeys.stats(), "status"] as const,
};

export { QUEST_THEME_KEYS, getThemeConfig } from "./admin-quest.constants.base";
