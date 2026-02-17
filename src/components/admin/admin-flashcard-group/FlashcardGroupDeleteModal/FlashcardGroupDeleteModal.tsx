"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FlashcardGroupDeleteModalProps } from "./FlashcardGroupDeleteModal.types";

export function FlashcardGroupDeleteModal({
  open,
  onOpenChange,
  item,
  onConfirm,
  isLoading,
}: FlashcardGroupDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Delete Flashcard Group</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the flashcard group &quot;{item?.name}&quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-6 pt-2 flex sm:justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" variant="actionDelete" onClick={onConfirm} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
