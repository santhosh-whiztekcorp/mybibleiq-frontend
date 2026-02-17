import type { StageDetail, UpdateAdminQuestStageInput } from "./admin-quest.types";

export const mapStageToForm = (stage: StageDetail): UpdateAdminQuestStageInput => ({
  title: stage.title,
  description: stage.description,
  tags: stage.tags ?? [],
  order: stage.order,
  verse: {
    verseText: stage.verse.verseText,
    verseReference: stage.verse.verseReference,
    commentary: stage.verse.commentary,
    backgroundImageId: stage.verse.backgroundImageId,
    backgroundMusicId: stage.verse.backgroundMusicId,
    startButtonText: stage.verse.startButtonText,
  },
  content: {
    quiz: stage.content.quiz?.map((q) => ({
      quizId: q.quizId,
      difficultyOverride: q.difficultyOverride,
      questionOverrides: q.questionOverrides,
      order: q.order,
    })),
    media: stage.content.media?.map((m) => ({
      mediaId: m.mediaId,
      order: m.order,
      points: m.points ?? 0,
    })),
    flashcards: stage.content.flashcards?.map((f) => ({
      flashcardId: f.flashcardId,
      order: f.order,
      points: f.points ?? 0,
    })),
    flashcardGroups: stage.content.flashcardGroups?.map((fg) => ({
      flashcardGroupId: fg.flashcardGroupId,
      order: fg.order,
      points: fg.points ?? 0,
    })),
  },
  successCompletion: {
    passingPoints: stage.successCompletion.passingPoints,
    mascotMessage: stage.successCompletion.mascotMessage,
    stageBadgeId: stage.successCompletion.stageBadgeId,
    reflectionPrompt: stage.successCompletion.reflectionPrompt,
    nextButtonText: stage.successCompletion.nextButtonText,
  },
  failureCompletion: {
    failureMessage: stage.failureCompletion.failureMessage,
    mascotEncouragement: stage.failureCompletion.mascotEncouragement,
    retryButtonText: stage.failureCompletion.retryButtonText,
  },
});
