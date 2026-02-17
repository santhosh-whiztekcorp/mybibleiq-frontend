import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateAdminFlashcardGroup,
  useUpdateAdminFlashcardGroup,
  useAdminFlashcardGroupDetail,
} from "@/resources/admin-flashcard-group";
import { CreateAdminFlashcardGroupRequestSchema } from "@/resources/admin-flashcard-group/admin-flashcard-group.schemas";
import type { CreateAdminFlashcardGroupInput } from "@/resources/admin-flashcard-group/admin-flashcard-group.types";
import type { FlashcardGroupFormProps } from "./FlashcardGroupForm.types";

type FlashcardGroupFormValues = CreateAdminFlashcardGroupInput & {
  selectedFlashcardIds?: string[];
};

export const useFlashcardGroupForm = ({ mode, group, onSuccess, onClose }: FlashcardGroupFormProps) => {
  const isEditMode = mode === "edit";

  const form = useForm<FlashcardGroupFormValues>({
    resolver: zodResolver(CreateAdminFlashcardGroupRequestSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: [],
      selectedFlashcardIds: [],
      flashcards: [],
    },
  });

  const { data: detail, isLoading: isDetailLoading } = useAdminFlashcardGroupDetail(group?.id ?? "", isEditMode);
  const loading = isDetailLoading;

  const createMutation = useCreateAdminFlashcardGroup();
  const updateMutation = useUpdateAdminFlashcardGroup();

  const isMutationLoading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isEditMode && detail) {
      form.reset({
        name: detail.name,
        description: detail.description || "",
        tags: detail.tags?.map((t: unknown) => (typeof t === "string" ? t : (t as { name: string }).name)) || [],
        selectedFlashcardIds: detail.flashcards?.map((f) => f.flashcardId) || [],
        flashcards:
          detail.flashcards?.map((f) => ({
            flashcardId: f.flashcardId,
            order: f.order,
          })) || [],
      });
    } else if (!isEditMode) {
      form.reset({
        name: "",
        description: "",
        tags: [],
        selectedFlashcardIds: [],
        flashcards: [],
      });
    }
  }, [isEditMode, detail, form]);

  // Sync selectedFlashcardIds with flashcards
  const selectedIds = useWatch({
    control: form.control,
    name: "selectedFlashcardIds",
  });

  useEffect(() => {
    if (!selectedIds) return;
    const currentFlashcards = form.getValues("flashcards") || [];
    const newFlashcards = selectedIds.map((id, index) => {
      const existing = currentFlashcards.find((f) => f.flashcardId === id);
      return {
        flashcardId: id,
        order: existing ? existing.order : index,
      };
    });
    form.setValue("flashcards", newFlashcards, { shouldValidate: true });
  }, [selectedIds, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const input = {
        name: values.name,
        description: values.description,
        tags: values.tags,
        flashcards: values.flashcards,
      } as CreateAdminFlashcardGroupInput;

      if (isEditMode && detail) {
        await updateMutation.mutateAsync({ id: detail.id, input });
      } else {
        await createMutation.mutateAsync(input);
      }
      onSuccess?.();
      onClose?.();
    } catch {
      // Error handled by mutation
    }
  });

  return {
    form,
    onSubmit,
    isMutationLoading: isMutationLoading || loading,
    isEditMode,
  };
};
