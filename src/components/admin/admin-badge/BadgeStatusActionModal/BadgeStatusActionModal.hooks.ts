import { useUpdateAdminBadgeStatus, BadgeStatusAction } from "@/resources/admin-badge";
import { BadgeStatusActionModalProps } from "./BadgeStatusActionModal.types";

export const useBadgeStatusActionModal = ({
  onClose,
  onSuccess,
}: Pick<BadgeStatusActionModalProps, "onClose" | "onSuccess">) => {
  const mutation = useUpdateAdminBadgeStatus();

  const handleAction = async (id: string, action: BadgeStatusAction) => {
    try {
      await mutation.mutateAsync({ id, input: { action } });
      onSuccess?.();
      onClose();
    } catch {
      // Error handled by mutation
    }
  };

  return {
    handleAction,
    isPending: mutation.isPending,
  };
};
