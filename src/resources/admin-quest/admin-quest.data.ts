import type {
  CreateAdminQuestInput,
  CreateAdminQuestStageInput,
  AdminQuestFilterStore,
  AdminQuestListInput,
} from "./admin-quest.types";

/* ---- Default Form Values ---- */
export const defaultCreateQuestFormValues: CreateAdminQuestInput = {
  title: "",
  description: "",
  tags: [],
  theme: undefined,
  welcome: {
    title: "",
    description: "",
    backgroundImageId: undefined,
    startQuestButtonText: "Start Quest",
  },
  introduction: {
    title: "",
    dialogue: "",
    backgroundImageId: undefined,
    backgroundMusicId: undefined,
    startStageButtonText: "Let's Begin!",
  },
  completion: {
    mascotMessage: "",
    completionBadgeId: undefined,
  },
};

export const defaultCreateStageFormValues: CreateAdminQuestStageInput = {
  title: "",
  description: "",
  tags: [],
  order: 0,
  verse: {
    verseText: "",
    verseReference: "",
    commentary: "",
    backgroundImageId: undefined,
    backgroundMusicId: undefined,
    startButtonText: "Start Stage",
  },
  content: {
    quiz: [],
    media: [],
    flashcards: [],
    flashcardGroups: [],
  },
  successCompletion: {
    passingPoints: 0,
    mascotMessage: "",
    stageBadgeId: undefined,
    reflectionPrompt: "",
    nextButtonText: "Next",
  },
  failureCompletion: {
    failureMessage: "",
    mascotEncouragement: "",
    retryButtonText: "Retry",
  },
};

/* ---- Default Filter Values ---- */
export const defaultAdminQuestFilters: Pick<AdminQuestFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminQuestListInput, "page" | "pageSize" | "sort"> = {
  status: undefined,
  tag: undefined,
  q: undefined,
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};
