import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAdminFlashcard, useUpdateAdminFlashcard } from "@/resources/admin-flashcard";
import { CreateAdminFlashcardRequestSchema } from "@/resources/admin-flashcard/admin-flashcard.schemas";
import type { CreateAdminFlashcardInput } from "@/resources/admin-flashcard/admin-flashcard.types";
import type { FlashcardFormProps } from "./FlashcardForm.types";

export const useFlashcardForm = ({ mode, flashcard, onSuccess, onClose }: FlashcardFormProps) => {
  const isEditMode = mode === "edit";

  const form = useForm<CreateAdminFlashcardInput>({
    resolver: zodResolver(CreateAdminFlashcardRequestSchema),
    defaultValues: {
      word: "",
      definition: "",
      reference: "",
      tags: [],
    },
  });

  const createMutation = useCreateAdminFlashcard();
  const updateMutation = useUpdateAdminFlashcard();

  const isMutationLoading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isEditMode && flashcard) {
      form.reset({
        word: flashcard.word,
        definition: flashcard.definition,
        reference: flashcard.reference || "",
        tags: flashcard.tags?.map((t: unknown) => (typeof t === "string" ? t : (t as { name: string }).name)) || [],
      });
    } else {
      form.reset({
        word: "",
        definition: "",
        reference: "",
        tags: [],
      });
    }
  }, [isEditMode, flashcard, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (isEditMode && flashcard) {
        await updateMutation.mutateAsync({ id: flashcard.id, input: values });
      } else {
        await createMutation.mutateAsync(values);
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
    isMutationLoading,
    isEditMode,
  };
};
