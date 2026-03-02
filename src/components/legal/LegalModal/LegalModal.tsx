"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLegalModal } from "./LegalModal.hooks";
import type { LegalModalProps } from "./LegalModal.types";

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { data, isLoading, error, isPrivacy } = useLegalModal({ type });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0 overflow-hidden font-plus-jakarta-sans">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-bold text-[#1f2937]">
            {isLoading ? "Loading..." : data?.title || (isPrivacy ? "Privacy Policy" : "Terms & Conditions")}
          </DialogTitle>
          {data?.lastUpdated && !isLoading && (
            <DialogDescription className="text-sm text-[#6b7280]">Last Updated: {data.lastUpdated}</DialogDescription>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-[#f9fafb]">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              <p>Failed to load content. Please try again later.</p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-[#4b5563] leading-relaxed whitespace-pre-wrap">
              {data?.content || "Content not available"}
            </div>
          )}
        </div>

        <div className="p-4 border-t flex justify-end bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:opacity-70 transition-opacity"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
