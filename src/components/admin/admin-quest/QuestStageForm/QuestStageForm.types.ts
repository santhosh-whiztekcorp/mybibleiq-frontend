import type { StageSummary } from "@/resources/admin-quest/admin-quest.types";

export type QuestStageFormProps = {
  questId: string;
  mode: "create" | "edit";
  stageId?: string;
  stages?: StageSummary[];
  onSuccess?: () => void;
  onClose?: () => void;
};
