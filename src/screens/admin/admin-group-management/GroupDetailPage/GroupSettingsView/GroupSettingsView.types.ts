import { type AdminGroupDetail } from "@/resources/admin-group-management/admin-group-management.types";
import { type useUpdateAdminGroupSettingsForm } from "@/resources/admin-group-management";

import { type UseFormSetValue } from "react-hook-form";
import { type AdminGroupUpdateSettingsInput } from "@/resources/admin-group-management/admin-group-management.types";

export type UseGroupSettingsViewReturn = {
  group: AdminGroupDetail | undefined;
  isLoading: boolean;
  isSaving: boolean;
  form: ReturnType<typeof useUpdateAdminGroupSettingsForm>;
  iconPath: string | undefined;
  onSave: () => void;
  onCancel: () => void;
  setValue: UseFormSetValue<AdminGroupUpdateSettingsInput>;
};
