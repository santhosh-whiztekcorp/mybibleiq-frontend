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
import { FlashcardGroupStatusActionModalProps } from "./FlashcardGroupStatusActionModal.types";

const ACTION_CONFIG = {
  Publish: {
    title: "Publish Flashcard Group",
    description: (name: string) =>
      `Are you sure you want to publish the flashcard group "${name}"? This will make it available to users.`,
    buttonText: "Publish",
    variant: "actionPublish" as const,
  },
  Archive: {
    title: "Archive Flashcard Group",
    description: (name: string) =>
      `Are you sure you want to archive the flashcard group "${name}"? This will remove it from active use.`,
    buttonText: "Archive",
    variant: "actionArchive" as const,
  },
  CloneFromPublished: {
    title: "Clone Flashcard Group",
    description: (name: string) =>
      `Are you sure you want to clone the flashcard group "${name}"? This will create a new draft copy.`,
    buttonText: "Clone",
    variant: "actionClone" as const,
  },
  Unarchive: {
    title: "Unarchive Flashcard Group",
    description: (name: string) => `Are you sure you want to unarchive the flashcard group "${name}"?`,
    buttonText: "Unarchive",
    variant: "default" as const,
  },
};

export function FlashcardGroupStatusActionModal({
  open,
  onOpenChange,
  item,
  action,
  onConfirm,
  isLoading,
}: FlashcardGroupStatusActionModalProps) {
  if (!action || !item) return null;

  const config = ACTION_CONFIG[action];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description(item.name)}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-6 pt-2 flex sm:justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" variant={config.variant} onClick={onConfirm} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {config.buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
