"use client";

import { useMemo, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAdminQuestionRequestSchema,
  stripInactiveTypeConfigs,
} from "@/resources/admin-question/admin-question.schemas";
import { useCreateAdminQuestion, useUpdateAdminQuestion } from "@/resources/admin-question/admin-question.hooks";
import { defaultCreateQuestionFormValues } from "@/resources/admin-question/admin-question.data";
import type {
  CreateAdminQuestionInput,
  UpdateAdminQuestionInput,
} from "@/resources/admin-question/admin-question.types";
import type { QuestionFormProps } from "./QuestionForm.types";

export const useQuestionForm = ({ item, onSuccess }: QuestionFormProps) => {
  const isEditMode = !!item;

  const createMutation = useCreateAdminQuestion();
  const updateMutation = useUpdateAdminQuestion();

  const defaultValues = useMemo(() => {
    if (item) {
      return {
        questionText: item.questionText,
        type: item.type,
        tags: item.tags || [],
        shuffle: item.shuffle ?? true,
        mcq: item.mcq || undefined,
        trueFalse: item.trueFalse || undefined,
        matching: item.matching || undefined,
        fillBlank: item.fillBlank || undefined,
        oneWord: item.oneWord || undefined,
        order: item.order || undefined,
      } as CreateAdminQuestionInput;
    }
    return defaultCreateQuestionFormValues;
  }, [item]);

  const form = useForm<CreateAdminQuestionInput>({
    resolver: zodResolver(CreateAdminQuestionRequestSchema),
    defaultValues,
    mode: "onChange",
  });

  const questionType = useWatch({
    control: form.control,
    name: "type",
  });

  // When type changes, clear all inactive type-specific fields so stale
  // data doesn't trigger field-level Zod validation for the wrong type
  useEffect(() => {
    if (questionType !== "MCQ") form.setValue("mcq", undefined, { shouldValidate: false });
    if (questionType !== "TRUE_FALSE") form.setValue("trueFalse", undefined, { shouldValidate: false });
    if (questionType !== "MATCH") form.setValue("matching", undefined, { shouldValidate: false });
    if (questionType !== "FILL_BLANK") form.setValue("fillBlank", undefined, { shouldValidate: false });
    if (questionType !== "ONE_WORD") form.setValue("oneWord", undefined, { shouldValidate: false });
    if (questionType !== "ORDER") form.setValue("order", undefined, { shouldValidate: false });
  }, [questionType]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = form.handleSubmit(async (values) => {
    // Preprocess to strip inactive type configs
    const data = stripInactiveTypeConfigs(values) as CreateAdminQuestionInput;

    try {
      if (isEditMode && item) {
        await updateMutation.mutateAsync({
          id: item.id,
          input: data as UpdateAdminQuestionInput,
        });
      } else {
        await createMutation.mutateAsync(data);
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
    questionType,
    createMutation,
    updateMutation,
  };
};
