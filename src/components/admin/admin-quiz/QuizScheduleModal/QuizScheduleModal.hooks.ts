"use client";

import { useState } from "react";
import type { QuizScheduleModalProps } from "./QuizScheduleModal.types";

export const useQuizScheduleModal = ({ item, onConfirm, onOpenChange }: QuizScheduleModalProps) => {
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
