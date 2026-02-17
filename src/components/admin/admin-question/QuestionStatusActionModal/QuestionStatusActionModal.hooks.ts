import { UseQuestionStatusActionModalProps } from "./QuestionStatusActionModal.types";

const ACTION_CONFIG = {
  Publish: {
    title: "Publish Question",
    description: "Are you sure you want to publish this question? This will make it available for quizzes.",
    buttonText: "Publish",
    variant: "actionPublish" as const,
  },
  Archive: {
    title: "Archive Question",
    description: "Are you sure you want to archive this question? This will remove it from active use.",
    buttonText: "Archive",
    variant: "actionArchive" as const,
  },
  Clone: {
    title: "Clone Question",
    description: "Are you sure you want to clone this question? This will create a new draft copy.",
    buttonText: "Clone",
    variant: "actionClone" as const,
  },
} as const;

export const useQuestionStatusActionModal = (props: UseQuestionStatusActionModalProps) => {
  const { action, item } = props;

  const config = action ? ACTION_CONFIG[action] : null;

  return {
    item,
    config,
    isLoading: props.isLoading,
  };
};
