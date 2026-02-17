import { UseQuizStatusActionModalProps } from "./QuizStatusActionModal.types";

const ACTION_CONFIG = {
  Publish: {
    title: "Publish Quiz",
    description: "Are you sure you want to publish this quiz? This will make it available to users.",
    buttonText: "Publish",
    variant: "actionPublish" as const,
  },
  Archive: {
    title: "Archive Quiz",
    description: "Are you sure you want to archive this quiz? This will remove it from active use.",
    buttonText: "Archive",
    variant: "actionArchive" as const,
  },
  Clone: {
    title: "Clone Quiz",
    description: "Are you sure you want to clone this quiz? This will create a new draft copy.",
    buttonText: "Clone",
    variant: "actionClone" as const,
  },
} as const;

export const useQuizStatusActionModal = (props: UseQuizStatusActionModalProps) => {
  const { action, item } = props;

  const config = action && action in ACTION_CONFIG ? ACTION_CONFIG[action as keyof typeof ACTION_CONFIG] : null;

  return {
    item,
    config,
    isLoading: props.isLoading,
  };
};
