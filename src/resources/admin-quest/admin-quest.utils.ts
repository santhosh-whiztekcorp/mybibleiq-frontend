import type { CreateAdminQuestInput } from "./admin-quest.types";
import type { AdminQuestDetail } from "./admin-quest.types";

export const mapQuestToForm = (item: AdminQuestDetail): CreateAdminQuestInput => ({
  title: item.title,
  description: item.description,
  tags: item.tags ?? [],
  theme: item.theme,
  welcome: {
    title: item.welcome.title,
    description: item.welcome.description,
    backgroundImageId: item.welcome.backgroundImageId,
    startQuestButtonText: item.welcome.startQuestButtonText,
  },
  introduction: {
    title: item.introduction.title,
    dialogue: item.introduction.dialogue,
    backgroundImageId: item.introduction.backgroundImageId,
    backgroundMusicId: item.introduction.backgroundMusicId,
    startStageButtonText: item.introduction.startStageButtonText,
  },
  completion: {
    mascotMessage: item.completion.mascotMessage,
    completionBadgeId: item.completion.completionBadgeId,
  },
});
