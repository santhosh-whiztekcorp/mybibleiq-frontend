import { useEffect } from "react";
import {
  useGetAdminGroupManagementDetail,
  useUpdateAdminGroupSettings,
  useUpdateAdminGroupSettingsForm,
} from "@/resources/admin-group-management";
import { useGroupDetailPage } from "../GroupDetailPage.hooks";
import { AdminGroupUpdateSettingsInput } from "@/resources/admin-group-management/admin-group-management.types";
import { type UseGroupSettingsViewReturn } from "./GroupSettingsView.types";

export const useGroupSettingsView = (): UseGroupSettingsViewReturn => {
  const { groupId } = useGroupDetailPage();
  const { data: group, isLoading } = useGetAdminGroupManagementDetail(groupId);
  const { mutate: updateSettings, isPending: isSaving } = useUpdateAdminGroupSettings();

  const form = useUpdateAdminGroupSettingsForm();
  const { reset, handleSubmit, watch, setValue } = form;

  // Watch fields for unsaved changes or UI updates
  const iconPath = watch("iconPath");

  useEffect(() => {
    if (group) {
      reset({
        name: group.name || "",
        description: group.description || "",
        type: group.type,
        privacy: group.privacy,
        iconPath: group.iconPath || "group-prayer",
      });
      // Ensure the form state is valid after data is loaded so changes trigger enable correctly
      form.trigger();
    }
  }, [group, reset, form]);

  const onSave = handleSubmit((data: AdminGroupUpdateSettingsInput) => {
    updateSettings({
      groupId,
      input: data,
    });
  });

  const onCancel = () => {
    if (group) {
      reset({
        name: group.name || "",
        description: group.description || "",
        type: group.type,
        privacy: group.privacy,
        iconPath: group.iconPath || "group-prayer",
      });
      form.trigger();
    }
  };

  return {
    group,
    isLoading,
    isSaving,
    form,
    iconPath,
    onSave,
    onCancel,
    setValue,
  };
};
