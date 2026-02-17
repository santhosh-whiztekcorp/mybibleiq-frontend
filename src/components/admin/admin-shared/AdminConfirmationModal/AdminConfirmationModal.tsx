"use client";

import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAdminConfirmationModal } from "./AdminConfirmationModal.hooks";
import type { AdminConfirmationModalProps } from "./AdminConfirmationModal.types";

export const AdminConfirmationModal = (props: AdminConfirmationModalProps) => {
  const { open, onOpenChange, entityName, cancelLabel = "Cancel", isLoading = false } = props;
  const { config, handleCancel, handleConfirm } = useAdminConfirmationModal(props);

  if (!config) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{config.title(entityName)}</DialogTitle>
          <DialogDescription>{config.message(entityName)}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="actionCancel" onClick={handleCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button variant={config.variant} onClick={handleConfirm} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {config.label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
