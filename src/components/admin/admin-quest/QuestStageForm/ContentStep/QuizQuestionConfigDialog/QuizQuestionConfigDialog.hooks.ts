"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useAdminQuizDetail } from "@/resources/admin-quiz";
import type { QuestionDifficulty } from "@/resources/admin-quiz";
import type { QuizQuestionConfigDialogProps, QuizQuestionConfigForm } from "./QuizQuestionConfigDialog.types";

export const useQuizQuestionConfigDialog = (props: QuizQuestionConfigDialogProps) => {
  const { quizId, open, questionOverrides = [], onSave, onOpenChange } = props;
  const { data: quiz, isLoading } = useAdminQuizDetail(quizId, open && !!quizId);

  const form = useForm<QuizQuestionConfigForm>({
    defaultValues: {
      questionOverrides: [],
    },
  });

  const { reset, handleSubmit } = form;

  React.useEffect(() => {
    if (quiz && quiz.questions) {
      const initialOverrides = quiz.questions.map((q) => {
        const existing = questionOverrides.find((o) => o.questionId === q.questionId);
        return {
          questionId: q.questionId,
          questionText: q.questionText,
          pointsOverride: existing?.pointsOverride ?? q.points,
          difficultyOverride: (existing?.difficultyOverride ?? q.difficulty) as QuestionDifficulty,
          defaultPoints: q.points,
          defaultDifficulty: q.difficulty as QuestionDifficulty,
        };
      });
      reset({ questionOverrides: initialOverrides });
    }
  }, [quiz, questionOverrides, reset]);

  const onSubmit = (data: QuizQuestionConfigForm) => {
    const overrides = data.questionOverrides
      .filter((q) => q.pointsOverride !== q.defaultPoints || q.difficultyOverride !== q.defaultDifficulty)
      .map((q) => ({
        questionId: q.questionId,
        pointsOverride: q.pointsOverride,
        difficultyOverride: q.difficultyOverride,
      }));
    onSave(overrides);
    onOpenChange(false);
  };

  return {
    quiz,
    isLoading,
    form,
    onSubmit: handleSubmit(onSubmit),
  };
};
