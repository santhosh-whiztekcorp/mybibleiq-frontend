import { QuestDeleteModalProps } from "./QuestDeleteModal.types";

export const useQuestDeleteModal = (props: QuestDeleteModalProps) => {
  return {
    item: props.item,
    isLoading: props.isLoading,
  };
};
