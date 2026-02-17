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
import { useQuestionStatusActionModal } from "./QuestionStatusActionModal.hooks";
import type { QuestionStatusActionModalProps } from "./QuestionStatusActionModal.types";

export function QuestionStatusActionModal(props: QuestionStatusActionModalProps) {
  const { open, onOpenChange, onConfirm } = props;
  const { item, config, isLoading } = useQuestionStatusActionModal(props);

  if (!config || !item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription asChild>
            <div>
              {config.description}
              <div className="mt-2 p-2 bg-muted rounded italic font-medium">&quot;{item.questionText}&quot;</div>
            </div>
          </DialogDescription>
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
