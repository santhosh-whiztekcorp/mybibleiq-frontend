import { useCreateCategoryForm, useCreateAdminTagCategory } from "@/resources/admin-tag";
import { TagCategoryFormModalProps } from "./TagCategoryFormModal.types";

export const useTagCategoryFormModal = ({
  onOpenChange,
  onSuccess,
}: Pick<TagCategoryFormModalProps, "onOpenChange" | "onSuccess">) => {
  const form = useCreateCategoryForm();
  const createCategoryMutation = useCreateAdminTagCategory();

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const result = await createCategoryMutation.mutateAsync(values);
      form.reset();
      onOpenChange(false);
      onSuccess?.(result.id);
    } catch {
      // Error handled by mutation
    }
  });

  return {
    form,
    onSubmit,
    isPending: createCategoryMutation.isPending,
  };
};
