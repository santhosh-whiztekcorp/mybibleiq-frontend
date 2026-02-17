import { useDeleteAdminBadge } from "@/resources/admin-badge";
import { BadgeDeleteModalProps } from "./BadgeDeleteModal.types";

export const useBadgeDeleteModal = ({ onClose, onSuccess }: Pick<BadgeDeleteModalProps, "onClose" | "onSuccess">) => {
  const deleteMutation = useDeleteAdminBadge();

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      onSuccess?.();
      onClose();
    } catch {
      // Error handled by mutation
    }
  };

  return {
    handleDelete,
    isDeleting: deleteMutation.isPending,
  };
};
