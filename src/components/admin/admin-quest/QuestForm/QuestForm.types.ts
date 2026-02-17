import type { AdminQuestDetail } from "@/resources/admin-quest/admin-quest.types";

export type QuestFormProps = {
  item?: AdminQuestDetail | null;
  onSuccess?: () => void;
  onClose?: () => void;
};
