import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAdminTag, useUpdateAdminTag, useAdminTagCategories } from "@/resources/admin-tag";
import { CreateAdminTagRequestSchema } from "@/resources/admin-tag/admin-tag.schemas";
import type { CreateAdminTagInput } from "@/resources/admin-tag";

import { UseTagFormProps } from "./TagForm.types";

export const useTagForm = ({ mode, tag, onSuccess, onClose }: UseTagFormProps) => {
  const isEditMode = mode === "edit";

  const form = useForm<CreateAdminTagInput>({
    resolver: zodResolver(CreateAdminTagRequestSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
    },
  });

  const { data: categories, isLoading: isCategoriesLoading } = useAdminTagCategories();

  const createMutation = useCreateAdminTag();
  const updateMutation = useUpdateAdminTag();

  const isMutationLoading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isEditMode && tag) {
      form.reset({
        name: tag.name,
        categoryId: tag.categoryId,
        description: tag.description || "",
      });
    } else {
      form.reset({
        name: "",
        categoryId: "",
        description: "",
      });
    }
  }, [isEditMode, tag, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (isEditMode && tag) {
        await updateMutation.mutateAsync({ id: tag.id, input: values });
      } else {
        await createMutation.mutateAsync(values);
      }
      onSuccess?.();
      onClose?.();
    } catch {
      // Error handled by mutation
    }
  });

  const categoryOptions = (categories || []).map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  const [isCategoryModalOpen, setIsCategoryModalOpen] = React.useState(false);

  const handleCategoryCreated = (categoryId: string) => {
    form.setValue("categoryId", categoryId);
  };

  const selectedCategoryId = useWatch({
    control: form.control,
    name: "categoryId",
  });
  const selectedCategory = categories?.find((c) => c.id === selectedCategoryId);

  return {
    form,
    onSubmit,
    categoryOptions,
    isCategoriesLoading,
    isMutationLoading,
    isEditMode,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    handleCategoryCreated,
    selectedCategory,
  };
};
