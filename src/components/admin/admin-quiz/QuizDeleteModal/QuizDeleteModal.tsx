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
import { useQuizDeleteModal } from "./QuizDeleteModal.hooks";
import type { QuizDeleteModalProps } from "./QuizDeleteModal.types";

export function QuizDeleteModal(props: QuizDeleteModalProps) {
  const { open, onOpenChange, onConfirm } = props;
  const { item, isLoading } = useQuizDeleteModal(props);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Delete Quiz</DialogTitle>
          <DialogDescription asChild>
            <div>
              Are you sure you want to delete this quiz? This action cannot be undone.
              <div className="mt-2 p-2 bg-muted rounded italic font-medium">&quot;{item?.title}&quot;</div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-6 pt-2 flex sm:justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
