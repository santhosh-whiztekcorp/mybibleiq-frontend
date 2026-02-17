import { useEffect, useState } from "react";
import { queryClient } from "@/config/queryClient";
import {
  useCreateAdminQuestStageForm,
  useCreateAdminQuestStage,
  useUpdateAdminQuestStage,
  useAdminQuestStageDetail,
  getAdminQuestStageList,
  adminQuestQueryKeys,
} from "@/resources/admin-quest";
import type { CreateAdminQuestStageInput } from "@/resources/admin-quest";
import { mapStageToForm } from "@/resources/admin-quest/admin-quest-stage.utils";
import { adminQuizQueryKeys } from "@/resources/admin-quiz";
import { adminMediaQueryKeys } from "@/resources/admin-media";
import { adminFlashcardQueryKeys } from "@/resources/admin-flashcard";
import { adminFlashcardGroupQueryKeys } from "@/resources/admin-flashcard-group";
import { adminBadgeQueryKeys } from "@/resources/admin-badge";
import { adminTagQueryKeys } from "@/resources/admin-tag";
import type { QuestStageFormProps } from "./QuestStageForm.types";

export const useQuestStageForm = (props: QuestStageFormProps) => {
  const { questId, mode, stageId, stages = [], onSuccess, onClose } = props;
  const isEditMode = mode === "edit";
  const [isOpen, setIsOpen] = useState(true);

  const { data: stage, isLoading: isStageLoading } = useAdminQuestStageDetail(
    questId,
    stageId || "",
    isEditMode && !!stageId
  );

  const form = useCreateAdminQuestStageForm();
  const createMutation = useCreateAdminQuestStage();
  const updateMutation = useUpdateAdminQuestStage();

  const isMutationLoading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!isEditMode && !stage) {
      const nextOrder = stages.length;
      form.setValue("order", nextOrder);
    }
  }, [isEditMode, stage, stages.length, form]);

  useEffect(() => {
    if (isEditMode && stage) {
      form.reset(mapStageToForm(stage));
    }
  }, [isEditMode, stage, form]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: adminQuizQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: adminFlashcardQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: adminFlashcardGroupQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.all });
  }, []);

  const validateCurrentStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof CreateAdminQuestStageInput | `${keyof CreateAdminQuestStageInput}.${string}`)[] = [];

    if (step === 0) {
      fieldsToValidate = ["title", "description"];
    } else if (step === 1) {
      fieldsToValidate = ["verse.verseReference", "verse.verseText", "verse.commentary", "verse.startButtonText"];
    } else if (step === 2) {
      fieldsToValidate = [];
    } else if (step === 3) {
      fieldsToValidate = [
        "successCompletion.passingPoints",
        "successCompletion.mascotMessage",
        "successCompletion.reflectionPrompt",
        "successCompletion.nextButtonText",
      ];
    } else if (step === 4) {
      fieldsToValidate = [
        "failureCompletion.failureMessage",
        "failureCompletion.mascotEncouragement",
        "failureCompletion.retryButtonText",
      ];
    }

    if (fieldsToValidate.length === 0) return true;
    const result = await form.trigger(fieldsToValidate as Parameters<typeof form.trigger>[0]);
    return result;
  };

  const onSubmit = async (step: number, isLast: boolean) => {
    const isValid = await validateCurrentStep(step);
    if (!isValid) return;

    const values = form.getValues();

    // Get fresh stage count at submit time to avoid stale stages prop (e.g. after creating first stage)
    let nextOrder = stages.length;
    if (!isEditMode && questId && isLast) {
      const stageListFilters = { page: 1, pageSize: 100, sort: "order" as const };
      const fresh = await queryClient.fetchQuery({
        queryKey: [...adminQuestQueryKeys.detail(questId), "stages", "list", stageListFilters],
        queryFn: () => getAdminQuestStageList(questId, stageListFilters),
      });
      nextOrder = fresh?.items?.length ?? stages.length;
    }

    const submitValues = {
      ...values,
      ...(!isEditMode && { order: nextOrder }),
      tags: values.tags?.length ? values.tags : undefined,
      verse: {
        ...values.verse,
        backgroundImageId: values.verse.backgroundImageId || undefined,
        backgroundMusicId: values.verse.backgroundMusicId || undefined,
      },
      successCompletion: {
        ...values.successCompletion,
        passingPoints: Number(values.successCompletion.passingPoints) || 0,
        stageBadgeId: values.successCompletion.stageBadgeId || undefined,
      },
    };

    if (!isLast) return true;

    if (isEditMode && stageId) {
      await updateMutation.mutateAsync({ questId, stageId, input: submitValues }, { onSuccess: () => onSuccess?.() });
    } else {
      await createMutation.mutateAsync({ questId, input: submitValues }, { onSuccess: () => onSuccess?.() });
    }
    return true;
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Delay onClose so Sheet can finish its close animation before parent unmounts
      setTimeout(() => onClose?.(), 350);
    }
  };

  return {
    form,
    onSubmit,
    isEditMode,
    isMutationLoading,
    isStageLoading,
    onSuccess,
    onClose,
    isOpen,
    handleOpenChange,
  };
};
