import type { AdminBadgeSummary, CreateAdminBadgeInput } from "@/resources/admin-badge";
import type { UseFormReturn } from "react-hook-form";

export type BadgeFormProps = {
  mode: "create" | "edit";
  badge?: AdminBadgeSummary;
  onSuccess?: () => void;
  onClose: () => void;
};

export type UseBadgeFormProps = BadgeFormProps;

export type BadgeFormReturn = {
  form: UseFormReturn<CreateAdminBadgeInput>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isMutationLoading: boolean;
  isEditMode: boolean;
  mediaModalOpen: boolean;
  setMediaModalOpen: (open: boolean) => void;
  handleMediaSelect: (media: { id: string }) => void;
};
