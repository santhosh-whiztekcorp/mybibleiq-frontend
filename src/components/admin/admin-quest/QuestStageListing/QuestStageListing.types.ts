import type { StageSummary } from "@/resources/admin-quest/admin-quest.types";

export type QuestStageListingProps = {
  questId: string;
  questStatus: string;
  stages: StageSummary[];
  onAddStage: () => void;
  onEditStage: (stageId: string) => void;
  onDeleteStage: (stageId: string) => void;
  onClose: () => void;
};
