import { useEffect, useState } from "react";
import { useCreateAdminQuestForm, useCreateAdminQuest, useUpdateAdminQuest } from "@/resources/admin-quest";
import type { CreateAdminQuestInput } from "@/resources/admin-quest";
import { mapQuestToForm } from "@/resources/admin-quest/admin-quest.utils";
import type { QuestFormProps } from "./QuestForm.types";
import { queryClient } from "@/config/queryClient";
import { adminMediaQueryKeys } from "@/resources/admin-media";
import { adminBadgeQueryKeys } from "@/resources/admin-badge";
import { adminTagQueryKeys } from "@/resources/admin-tag";

export const useQuestForm = (props: QuestFormProps) => {
  const { item, onSuccess, onClose } = props;
  const isEditMode = !!item?.id;
  const [isOpen, setIsOpen] = useState(true);

  const form = useCreateAdminQuestForm();
  const createMutation = useCreateAdminQuest();
  const updateMutation = useUpdateAdminQuest();

  const isMutationLoading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isEditMode && item) {
      form.reset(mapQuestToForm(item));
    }
  }, [isEditMode, item, form]);

  const validateCurrentStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof CreateAdminQuestInput | `${keyof CreateAdminQuestInput}.${string}`)[] = [];

    if (step === 0) {
      fieldsToValidate = ["title", "description"];
    } else if (step === 1) {
      fieldsToValidate = ["welcome.title", "welcome.description", "welcome.startQuestButtonText"];
    } else if (step === 2) {
      fieldsToValidate = ["introduction.title", "introduction.dialogue", "introduction.startStageButtonText"];
    } else if (step === 3) {
      fieldsToValidate = ["completion.mascotMessage"];
    }

    const result = await form.trigger(fieldsToValidate as Parameters<typeof form.trigger>[0]);
    return result;
  };

  const onSubmit = async (step: number, isLast: boolean) => {
    const isValid = await validateCurrentStep(step);
    if (!isValid) return;

    const values = form.getValues();
    const submitValues = {
      ...values,
      tags: values.tags?.length ? values.tags : undefined,
      theme: values.theme || undefined,
      welcome: {
        ...values.welcome,
        backgroundImageId: values.welcome.backgroundImageId || undefined,
      },
      introduction: {
        ...values.introduction,
        backgroundImageId: values.introduction.backgroundImageId || undefined,
        backgroundMusicId: values.introduction.backgroundMusicId || undefined,
      },
      completion: {
        ...values.completion,
        completionBadgeId: values.completion.completionBadgeId || undefined,
      },
    };

    if (!isLast) return true;

    if (isEditMode && item) {
      await updateMutation.mutateAsync({ id: item.id, input: submitValues }, { onSuccess: () => onSuccess?.() });
    } else {
      await createMutation.mutateAsync(submitValues, { onSuccess: () => onSuccess?.() });
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
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.all });
  }, []);

  return {
    form,
    onSubmit,
    isEditMode,
    isMutationLoading,
    isOpen,
    handleOpenChange,
  };
};
