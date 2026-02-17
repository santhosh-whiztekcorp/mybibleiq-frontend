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
import { useQuestionDeleteModal } from "./QuestionDeleteModal.hooks";
import type { QuestionDeleteModalProps } from "./QuestionDeleteModal.types";

export function QuestionDeleteModal(props: QuestionDeleteModalProps) {
  const { open, onOpenChange, onConfirm } = props;
  const { item, isLoading } = useQuestionDeleteModal(props);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Delete Question</DialogTitle>
          <DialogDescription asChild>
            <div>
              Are you sure you want to delete this question? This action cannot be undone.
              <div className="mt-2 p-2 bg-muted rounded italic font-medium">&quot;{item?.questionText}&quot;</div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-6 pt-2 flex sm:justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" variant="actionDelete" onClick={onConfirm} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
