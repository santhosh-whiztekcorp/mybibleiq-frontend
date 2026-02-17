import { UseQuestStatusActionModalProps } from "./QuestStatusActionModal.types";

const ACTION_CONFIG = {
  Publish: {
    title: "Publish Quest",
    description: "Are you sure you want to publish this quest? This will make it available to users.",
    buttonText: "Publish",
    variant: "actionPublish" as const,
  },
  Archive: {
    title: "Archive Quest",
    description: "Are you sure you want to archive this quest? This will remove it from active use.",
    buttonText: "Archive",
    variant: "actionArchive" as const,
  },
  Clone: {
    title: "Clone Quest",
    description: "Are you sure you want to clone this quest? This will create a new draft copy.",
    buttonText: "Clone",
    variant: "actionClone" as const,
  },
} as const;

export const useQuestStatusActionModal = (props: UseQuestStatusActionModalProps) => {
  const { action, item } = props;

  const config = action && action in ACTION_CONFIG ? ACTION_CONFIG[action as keyof typeof ACTION_CONFIG] : null;

  return {
    item,
    config,
    isLoading: props.isLoading,
  };
};
