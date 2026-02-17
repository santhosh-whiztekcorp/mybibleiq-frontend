"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Points</label>
            <Input type="number" min={0} value={points} onChange={(e) => setPoints(Number(e.target.value) || 0)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
