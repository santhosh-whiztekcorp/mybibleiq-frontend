"use client";

import { useState } from "react";
import type { QuestScheduleModalProps } from "./QuestScheduleModal.types";

export const useQuestScheduleModal = ({ item, onConfirm, onOpenChange }: QuestScheduleModalProps) => {
  const [date, setDate] = useState<Date | undefined>(item?.publishAt ? new Date(item.publishAt) : new Date());

  const handleConfirm = () => {
    if (date) {
      onConfirm(date.toISOString());
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return {
    date,
    setDate,
    handleConfirm,
    handleCancel,
  };
};
