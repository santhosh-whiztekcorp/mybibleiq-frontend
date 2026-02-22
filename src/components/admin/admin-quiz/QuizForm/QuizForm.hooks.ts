"use client";

import { useMemo, useState, useEffect } from "react";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAdminQuizRequestSchema } from "@/resources/admin-quiz/admin-quiz.schemas";
import { useCreateAdminQuiz, useUpdateAdminQuiz } from "@/resources/admin-quiz/admin-quiz.hooks";
import { defaultCreateQuizFormValues } from "@/resources/admin-quiz/admin-quiz.data";
import type { CreateAdminQuizInput, UpdateAdminQuizInput } from "@/resources/admin-quiz/admin-quiz.types";
import type { QuizFormProps } from "./QuizForm.types";

export const useQuizForm = ({ item, onSuccess, onClose }: QuizFormProps) => {
  const isEditMode = !!item;
  const [isOpen, setIsOpen] = useState(true);

  const createMutation = useCreateAdminQuiz();
  const updateMutation = useUpdateAdminQuiz();

  const defaultValues = useMemo(() => {
    if (item) {
      return {
        title: item.title,
        description: item.description,
        difficulty: item.difficulty,
        tags: item.tags || [],
        timeLimitType: item.timeLimitType,
        timeLimitValue: item.timeLimitValue,
        randomization: item.randomization,
        subsetCount: item.subsetCount,
        isSwordDrillEnabled: item.isSwordDrillEnabled,
        swordDrillConfig: item.swordDrillConfig,
        completionBadgeId: item.completionBadgeId,
        questions: item.questions.map((q) => ({
          questionId: q.questionId,
          order: q.order,
          points: q.points,
          difficulty: q.difficulty,
        })),
      } as CreateAdminQuizInput;
    }
    return defaultCreateQuizFormValues;
  }, [item]);

  const form = useForm<CreateAdminQuizInput>({
    resolver: zodResolver(CreateAdminQuizRequestSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const isSwordDrillEnabled = useWatch({
    control: form.control,
    name: "isSwordDrillEnabled",
  });

  const timeLimitType = useWatch({
    control: form.control,
    name: "timeLimitType",
  });

  const randomization = useWatch({
    control: form.control,
    name: "randomization",
  });

  // Initialize swordDrillConfig when enabled
  useEffect(() => {
    if (isSwordDrillEnabled && !form.getValues("swordDrillConfig")) {
      form.setValue("swordDrillConfig", {
        timeLimitType: "TotalQuizTime",
        timeLimitValue: 60,
        randomization: "ShuffleAll",
        allowSolo: true,
        allowMultiplayer: false,
        allowQuick: false,
        firstRankPoints: 50,
        secondRankPoints: 30,
        thirdRankPoints: 10,
        pointsForWinner: 20,
        pointsForLoser: 5,
      });
    }
  }, [isSwordDrillEnabled, form]);

  // Watch nested sword drill config
  const allowMultiplayer = useWatch({ control: form.control, name: "swordDrillConfig.allowMultiplayer" });
  const allowQuick = useWatch({ control: form.control, name: "swordDrillConfig.allowQuick" });
  const swordDrillTimeLimitType = useWatch({ control: form.control, name: "swordDrillConfig.timeLimitType" });
  const swordDrillRandomization = useWatch({ control: form.control, name: "swordDrillConfig.randomization" });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      onClose?.();
    }
  };

  const handleAddQuestions = (questionIds: string[]) => {
    const currentIds = fields.map((f) => f.questionId);

    // Deselect
    const indexesToRemove = fields
      .map((field, index) => (!questionIds.includes(field.questionId) ? index : -1))
      .filter((index) => index !== -1)
      .sort((a, b) => b - a);

    indexesToRemove.forEach((index) => remove(index));

    // Add new
    questionIds.forEach((id) => {
      if (!currentIds.includes(id)) {
        append({
          questionId: id,
          order: fields.length,
          points: 10,
          difficulty: "MEDIUM",
        });
      }
    });
  };

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (isEditMode && item) {
        await updateMutation.mutateAsync({
          id: item.id,
          input: values as UpdateAdminQuizInput,
        });
      } else {
        await createMutation.mutateAsync(values);
      }
      onSuccess?.();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  });

  const isMutationLoading = createMutation.isPending || updateMutation.isPending;

  return {
    form,
    onSubmit,
    isMutationLoading,
    isEditMode,
    isSwordDrillEnabled,
    timeLimitType,
    randomization,
    fields,
    remove,
    isOpen,
    handleOpenChange,
    handleAddQuestions,
    allowMultiplayer,
    allowQuick,
    swordDrillTimeLimitType,
    swordDrillRandomization,
  };
};
