import { QuizDeleteModalProps } from "./QuizDeleteModal.types";

export const useQuizDeleteModal = (props: QuizDeleteModalProps) => {
  return {
    item: props.item,
    isLoading: props.isLoading,
  };
};
