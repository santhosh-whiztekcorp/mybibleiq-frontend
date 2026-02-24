"use client";

import { startOfToday } from "date-fns";
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
import { DatePicker } from "@/components/ui/date-picker";
import { useQuestScheduleModal } from "./QuestScheduleModal.hooks";
import type { QuestScheduleModalProps } from "./QuestScheduleModal.types";

export function QuestScheduleModal(props: QuestScheduleModalProps) {
  const { open, onOpenChange, item, isLoading } = props;
  const { date, setDate, handleConfirm, handleCancel } = useQuestScheduleModal(props);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md font-plus-jakarta-sans text-black">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">Schedule Quest</DialogTitle>
          <DialogDescription asChild>
            <div className="text-sm font-semibold text-[#656A73]">
              Choose a date and time to automatically publish this quest.
              <div className="mt-2 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl italic font-bold text-black">
                &quot;{item?.title}&quot;
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 py-0">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#656A73] uppercase tracking-wider">Publish Date</label>
            <DatePicker
              value={date}
              onChange={setDate}
              showTime={true}
              disablePast={true}
              minDate={startOfToday()}
              placeholder="Pick a date and time"
            />
          </div>
        </div>

        <DialogFooter className="p-6 flex sm:justify-end gap-3 mt-4 border-t border-[#F1F5F9]">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 h-11 text-sm font-bold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="actionSchedule"
            onClick={handleConfirm}
            disabled={isLoading || !date}
            className="flex-1 h-11 text-sm font-bold"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Schedule Quest
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
