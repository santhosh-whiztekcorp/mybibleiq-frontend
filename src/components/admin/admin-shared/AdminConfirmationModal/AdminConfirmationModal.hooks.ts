import { useMemo } from "react";
import { getConfirmationConfig } from "./AdminConfirmationModal.utils";
import type { AdminConfirmationModalProps } from "./AdminConfirmationModal.types";

export const useAdminConfirmationModal = (props: AdminConfirmationModalProps) => {
  const { onOpenChange, onConfirm, action } = props;

  const config = useMemo(() => getConfirmationConfig(action), [action]);

  const handleCancel = () => onOpenChange(false);

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return {
    config,
    handleCancel,
    handleConfirm,
  };
};
