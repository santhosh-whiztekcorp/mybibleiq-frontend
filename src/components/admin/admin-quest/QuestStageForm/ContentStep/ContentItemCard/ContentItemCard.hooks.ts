"use client";

import { useAdminQuizDetail } from "@/resources/admin-quiz";
import { useAdminMediaDetail } from "@/resources/admin-media";
import { useAdminFlashcardDetail } from "@/resources/admin-flashcard";
import { useAdminFlashcardGroupDetail } from "@/resources/admin-flashcard-group";
import type { ContentItemCardProps } from "./ContentItemCard.types";

export const useContentItemCard = ({ item }: ContentItemCardProps) => {
  const { type, data } = item;

  const { data: quiz } = useAdminQuizDetail(
    type === "quiz" ? (data as { quizId: string }).quizId : "",
    type === "quiz"
  );
  const { data: media } = useAdminMediaDetail(
    type === "media" ? (data as { mediaId: string }).mediaId : "",
    type === "media"
  );
  const { data: flashcard } = useAdminFlashcardDetail(
    type === "flashcard" ? (data as { flashcardId: string }).flashcardId : "",
    type === "flashcard"
  );
  const { data: flashcardGroup } = useAdminFlashcardGroupDetail(
    type === "flashcardGroup" ? (data as { flashcardGroupId: string }).flashcardGroupId : "",
    type === "flashcardGroup"
  );

  const displayTitle =
    type === "quiz"
      ? quiz?.title
      : type === "media"
        ? media?.title
        : type === "flashcard"
          ? flashcard?.word
          : flashcardGroup?.name;

  const points =
    type === "media" || type === "flashcard" || type === "flashcardGroup"
      ? (data as { points: number }).points
      : undefined;

  const difficultyOverride = type === "quiz" ? (data as { difficultyOverride: string }).difficultyOverride : undefined;

  const isLoading =
    (type === "quiz" && !quiz) ||
    (type === "media" && !media) ||
    (type === "flashcard" && !flashcard) ||
    (type === "flashcardGroup" && !flashcardGroup);

  return {
    quiz,
    media,
    flashcard,
    flashcardGroup,
    displayTitle,
    points,
    difficultyOverride,
    isLoading,
  };
};
