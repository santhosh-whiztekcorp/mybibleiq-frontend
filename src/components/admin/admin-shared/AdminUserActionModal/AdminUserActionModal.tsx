"use client";

import React from "react";
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
import { TextareaController, DatePickerController } from "@/components/form-controllers";
import { useAdminUserActionModal } from "./AdminUserActionModal.hooks";
import type { AdminUserActionModalProps } from "./AdminUserActionModal.types";

export const AdminUserActionModal = (props: AdminUserActionModalProps) => {
  const { open, onOpenChange, action, userName, isLoading = false } = props;
  const { form, config, handleSubmit, handleCancel, minSuspendDate } = useAdminUserActionModal(props);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={handleCancel}>
        <DialogHeader>
          <DialogTitle className="text-left">{config.title}</DialogTitle>
          <DialogDescription className="text-left">{config.message(userName)}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 px-6">
          <TextareaController
            control={form.control}
            name="reason"
            label="Reason"
            variant="adminPrimary"
            placeholder="Enter the reason for this action..."
            rows={4}
            error={form.formState.errors.reason?.message}
            className="resize-none"
          />

          {action === "suspend" && (
            <DatePickerController
              control={form.control}
              name="suspendUntil"
              label="Suspend Until (Optional)"
              variant="adminPrimary"
              placeholder="Select end date for suspension..."
              disablePast={false}
              minDate={minSuspendDate}
              error={form.formState.errors.suspendUntil?.message}
            />
          )}

          <DialogFooter className="px-0">
            <Button type="button" variant="actionCancel" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant={config.variant} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {config.label}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
