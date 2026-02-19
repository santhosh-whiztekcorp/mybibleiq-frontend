"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePointsConfigDialog } from "./PointsConfigDialog.hooks";
import type { PointsConfigDialogProps } from "./PointsConfigDialog.types";

export function PointsConfigDialog(props: PointsConfigDialogProps) {
  const { open, onOpenChange, title } = props;
  const { points, setPoints, handleSave } = usePointsConfigDialog(props);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4 px-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#393737]">Points</label>
              <span className="text-sm font-bold bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1 rounded-md min-w-[3rem] text-center">
                {points}
              </span>
            </div>
            <Slider
              variant="adminPrimary"
              min={0}
              max={100}
              step={1}
              value={[points]}
              onValueChange={(vals) => setPoints(vals[0])}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="actionSubmit" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
