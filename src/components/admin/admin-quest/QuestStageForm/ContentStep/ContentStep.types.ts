import type {
  MediaContentItemRequest,
  FlashcardContentItemRequest,
  FlashcardGroupContentItemRequest,
} from "@/resources/admin-quest";

export type QuizContentItemRequest = {
  quizId: string;
  difficultyOverride: "EASY" | "MEDIUM" | "HARD";
  questionOverrides: { questionId: string; difficultyOverride: "EASY" | "MEDIUM" | "HARD"; pointsOverride: number }[];
  order: number;
};

export type ContentItemType = "quiz" | "media" | "flashcard" | "flashcardGroup";

export type UnifiedContentItem = {
  id: string;
  type: ContentItemType;
  originalIndex: number;
  data:
    | QuizContentItemRequest
    | MediaContentItemRequest
    | FlashcardContentItemRequest
    | FlashcardGroupContentItemRequest;
};
