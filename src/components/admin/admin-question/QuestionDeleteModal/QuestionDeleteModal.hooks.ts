import { UseQuestionDeleteModalProps } from "./QuestionDeleteModal.types";

export const useQuestionDeleteModal = (props: UseQuestionDeleteModalProps) => {
  return {
    item: props.item,
    isLoading: props.isLoading,
  };
};
