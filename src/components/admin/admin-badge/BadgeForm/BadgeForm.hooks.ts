import { useState, useEffect } from "react";
import {
  useCreateAdminBadge,
  useUpdateAdminBadge,
  useCreateAdminBadgeForm,
  useUpdateAdminBadgeForm,
  useAdminBadgeDetail,
  CreateAdminBadgeInput,
} from "@/resources/admin-badge";
import type { UseBadgeFormProps, BadgeFormReturn } from "./BadgeForm.types";

export const useBadgeForm = ({ mode, badge, onSuccess, onClose }: UseBadgeFormProps): BadgeFormReturn => {
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  // Fetch detail for editing to ensure we have all fields including iconMediaId
  const { data: badgeDetail } = useAdminBadgeDetail(badge?.id || "", mode === "edit" && !!badge?.id);

  const createForm = useCreateAdminBadgeForm();
  const updateForm = useUpdateAdminBadgeForm();

  const form = mode === "create" ? createForm : updateForm;

  // Populate form when detail loads
  useEffect(() => {
    if (mode === "edit" && badgeDetail) {
      form.reset({
        name: badgeDetail.name,
        description: badgeDetail.description,
        iconMediaId: badgeDetail.iconMediaId,
        rarity: badgeDetail.rarity,
        category: badgeDetail.category,
        assignmentType: badgeDetail.assignmentType,
        triggerConfig: badgeDetail.triggerConfig,
        tags: badgeDetail.tags,
      } as CreateAdminBadgeInput);
    }
  }, [mode, badgeDetail, form]);

  const createMutation = useCreateAdminBadge();
  const updateMutation = useUpdateAdminBadge();

  const isMutationLoading = createMutation.isPending || updateMutation.isPending;

  const handleMediaSelect = (media: { id: string }) => {
    form.setValue("iconMediaId", media.id, { shouldDirty: true, shouldValidate: true });
    setMediaModalOpen(false);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(values);
      } else if (badge) {
        await updateMutation.mutateAsync({ id: badge.id, input: values });
      }
      onSuccess?.();
      onClose();
    } catch {
      // Error handled by mutation
    }
  });

  return {
    form,
    onSubmit,
    isMutationLoading,
    isEditMode: mode === "edit",
    mediaModalOpen,
    setMediaModalOpen,
    handleMediaSelect,
  };
};
