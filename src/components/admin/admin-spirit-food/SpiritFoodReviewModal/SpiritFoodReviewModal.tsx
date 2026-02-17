"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextareaController } from "@/components/form-controllers/TextareaController";
import { Loader2 } from "lucide-react";
import { formatDateString } from "@/utils/formatting";
import { SpiritFoodReviewModalProps } from "./SpiritFoodReviewModal.types";
import { useSpiritFoodReviewModal } from "./SpiritFoodReviewModal.hooks";

export function SpiritFoodReviewModal({
  open,
  onOpenChange,
  action,
  item,
  onConfirm,
  isLoading,
}: SpiritFoodReviewModalProps) {
  const { form, getTitle, getDescription, getButtonText, getButtonVariant, onFormSubmit } = useSpiritFoodReviewModal(
    open,
    action,
    item,
    onConfirm,
    onOpenChange
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        <div className="px-6 py-1">
          {item && (
            <div className="mb-4 rounded-lg bg-[#F3F3F5] p-3 border border-[#E9EAEC] space-y-1">
              <div className="flex justify-between items-start">
                <span className="text-sm font-bold text-black">{item.verseReference}</span>
                <span className="text-[10px] font-bold text-[#656A73]">{formatDateString(item.scheduledDate)}</span>
              </div>
              <p className="text-[11px] font-bold text-[#656A73] uppercase">{item.bibleVersion}</p>
              {item.concatenatedText && (
                <p className="text-xs text-[#4E4E4E] italic line-clamp-2 mt-1">&quot;{item.concatenatedText}&quot;</p>
              )}
            </div>
          )}
          <TextareaController
            variant="adminSecondary"
            control={control}
            name="comment"
            label="Comment / Note"
            placeholder="Add a comment for this action..."
            error={errors.comment?.message}
            className="px-4 py-3"
            rows={2}
          />
        </div>

        <DialogFooter className="p-6 pt-2 flex sm:justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" variant={getButtonVariant()} onClick={handleSubmit(onFormSubmit)} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {getButtonText()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
