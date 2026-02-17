"use client";

import * as React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useQueries } from "@tanstack/react-query";
import { getAdminQuizDetail } from "@/resources/admin-quiz";
import { adminQuizQueryKeys } from "@/resources/admin-quiz/admin-quiz.constants";
import type {
  MediaContentItemRequest,
  FlashcardContentItemRequest,
  FlashcardGroupContentItemRequest,
} from "@/resources/admin-quest";

export function useSuccessCompletionStep() {
  const { control } = useFormContext();
  const content = useWatch({ control, name: "content" });
  const passingPoints = useWatch({ control, name: "successCompletion.passingPoints" });

  const totalAvailablePoints = React.useMemo(() => {
    let total = 0;

    const media = (content?.media ?? []) as MediaContentItemRequest[];
    total += media.reduce((sum, item) => sum + (item.points ?? 0), 0);

    const flashcards = (content?.flashcards ?? []) as FlashcardContentItemRequest[];
    total += flashcards.reduce((sum, item) => sum + (item.points ?? 0), 0);

    const flashcardGroups = (content?.flashcardGroups ?? []) as FlashcardGroupContentItemRequest[];
    total += flashcardGroups.reduce((sum, item) => sum + (item.points ?? 0), 0);

    return total;
  }, [content]);

  // Fetch quiz details for points calculation
  const quizItems = React.useMemo(() => {
    return (content?.quiz ?? []) as Array<{
      quizId: string;
      questionOverrides?: Array<{ questionId: string; pointsOverride: number }>;
    }>;
  }, [content?.quiz]);

  const quizResults = useQueries({
    queries: quizItems.map((q) => ({
      queryKey: adminQuizQueryKeys.detail(q.quizId),
      queryFn: () => getAdminQuizDetail(q.quizId),
      enabled: !!q.quizId,
    })),
  });

  const totalPoints = React.useMemo(() => {
    let quizTotal = 0;

    quizResults.forEach((result, index) => {
      const quiz = result.data;
      const item = quizItems[index];
      if (!item) return;
      const overrides = item.questionOverrides;

      if (!quiz?.questions) return;

      if (!overrides || overrides.length === 0) {
        quizTotal += quiz.totalPoints;
        return;
      }

      const overrideMap = new Map(overrides.map((o) => [o.questionId, o.pointsOverride]));

      const calculatedPoints = quiz.questions.reduce((total, q) => {
        const overriddenPoints = overrideMap.get(q.questionId);
        const points = overriddenPoints !== undefined ? overriddenPoints : q.points;
        return total + points;
      }, 0);

      quizTotal += calculatedPoints;
    });

    return totalAvailablePoints + quizTotal;
  }, [totalAvailablePoints, quizResults, quizItems]);

  const passingPercentage = totalPoints > 0 ? Math.round(((passingPoints ?? 0) / totalPoints) * 100) : 0;
  const sliderMax = totalPoints > 0 ? totalPoints : 100;

  return {
    control,
    totalPoints,
    passingPoints,
    passingPercentage,
    sliderMax,
  };
}
