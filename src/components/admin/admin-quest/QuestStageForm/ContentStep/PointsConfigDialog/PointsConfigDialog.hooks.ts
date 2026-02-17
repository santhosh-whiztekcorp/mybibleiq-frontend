"use client";

import * as React from "react";
import type { PointsConfigDialogProps } from "./PointsConfigDialog.types";

export const usePointsConfigDialog = ({ open, initialPoints, onSave, onOpenChange }: PointsConfigDialogProps) => {
  const [points, setPoints] = React.useState(initialPoints);

  React.useEffect(() => {
    if (open) {
      setPoints(initialPoints);
    }
  }, [open, initialPoints]);

  const handleSave = () => {
    const num = Number(points);
    if (!Number.isNaN(num) && num >= 0) {
      onSave(num);
      onOpenChange(false);
    }
  };

  return {
    points,
    setPoints,
    handleSave,
  };
};
