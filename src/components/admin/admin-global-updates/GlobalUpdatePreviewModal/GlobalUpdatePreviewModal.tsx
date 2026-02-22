"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GlobalUpdatePreview } from "../GlobalUpdatePreview/GlobalUpdatePreview";
import { GlobalUpdatePreviewModalProps } from "./GlobalUpdatePreviewModal.types";

export function GlobalUpdatePreviewModal({ isOpen, onClose, updateData }: GlobalUpdatePreviewModalProps) {
  if (!updateData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] p-0 bg-transparent border-none shadow-none gap-0 overflow-visible">
        <DialogHeader className="hidden">
          <DialogTitle>Update Preview</DialogTitle>
        </DialogHeader>
        <div className="relative group">
          <GlobalUpdatePreview
            title={updateData.title}
            message={updateData.message}
            deliveredAt={updateData.scheduledAt || updateData.createdAt}
            isRead={false}
            className="shadow-2xl translate-y-2 ring-1 ring-black/5"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
