"use client";

import { useState } from "react";
import type { QuestStageListingProps } from "./QuestStageListing.types";

export const useQuestStageListing = ({ questStatus, onClose }: QuestStageListingProps) => {
  const isDraft = questStatus === "Draft";
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Delay onClose so Sheet can finish its close animation before parent unmounts
      setTimeout(() => onClose(), 350);
    }
  };

  return {
    isDraft,
    isOpen,
    handleOpenChange,
  };
};
