"use client";

import { useEffect } from "react";
import {
  useCreateGlobalUpdateForm,
  useUpdateGlobalUpdateForm,
  useCreateGlobalUpdate,
  useUpdateGlobalUpdate,
  useGlobalUpdateDetail,
} from "@/resources/admin-global-updates";
import {
  CreateGlobalUpdateInput,
  GlobalUpdateDetail,
} from "@/resources/admin-global-updates/admin-global-updates.types";
import { UseFormReturn } from "react-hook-form";
import { GlobalUpdateFormHookProps, GlobalUpdateFormHookReturn } from "./GlobalUpdateForm.types";

export const useGlobalUpdateForm = (props: GlobalUpdateFormHookProps): GlobalUpdateFormHookReturn => {
  const { isOpen, onOpenChange, isEdit, id } = props;

  const { data: initialData, isLoading: isDetailLoading } = useGlobalUpdateDetail(id || "", isEdit && !!id);

  const createForm = useCreateGlobalUpdateForm();
  const updateForm = useUpdateGlobalUpdateForm(initialData as GlobalUpdateDetail);

  const form = (isEdit ? updateForm : createForm) as UseFormReturn<CreateGlobalUpdateInput>;

  const { mutateAsync: createUpdate, isPending: isCreateLoading } = useCreateGlobalUpdate();
  const { mutateAsync: updateUpdate, isPending: isUpdateLoading } = useUpdateGlobalUpdate();

  const targetType = form.watch("targetType");

  useEffect(() => {
    if (targetType === "AllUsers") {
      form.setValue("targetUserIds", []);
      form.setValue("targetGroupIds", []);
    } else if (targetType === "SpecificUsers") {
      form.setValue("targetGroupIds", []);
    } else if (targetType === "UserGroup") {
      form.setValue("targetUserIds", []);
    }
  }, [targetType, form]);

  useEffect(() => {
    if (initialData && isEdit) {
      form.reset(initialData as GlobalUpdateDetail as unknown as CreateGlobalUpdateInput);
    }
  }, [initialData, isEdit, form]);

  const onSubmit = form.handleSubmit(async (data: CreateGlobalUpdateInput) => {
    try {
      if (isEdit && id) {
        await updateUpdate({ id, input: data });
      } else {
        await createUpdate(data);
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  });

  return {
    form,
    onSubmit,
    isMutationLoading: isCreateLoading || isUpdateLoading || isDetailLoading,
    isEditMode: !!isEdit,
    isOpen,
    handleOpenChange: onOpenChange,
  };
};
