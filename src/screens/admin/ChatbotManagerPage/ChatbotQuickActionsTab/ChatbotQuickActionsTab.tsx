"use client";

import React from "react";
import { DragDropProvider, DragOverlay, useDragOperation } from "@dnd-kit/react";
import { Button } from "@/components/ui/button";
import { useChatbotQuickActionsTab } from "./ChatbotQuickActionsTab.hooks";
import type { QuickActionItem } from "./ChatbotQuickActionsTab.types";
import { SortableQuickActionItem, QuickActionDragOverlayItem } from "@/components/admin/admin-chatbot";

function DragOverlayWrapper({ items }: { items: QuickActionItem[] }) {
  const { source } = useDragOperation();
  const item = items.find((i) => i.id === source?.id);

  if (!item) return null;

  return <QuickActionDragOverlayItem item={item} />;
}

export function ChatbotQuickActionsTab({ active }: { active?: boolean }) {
  const {
    items,
    isLoading,
    isSaving,
    hasChanges,
    handleDragEnd,
    handleToggleActive,
    handleLabelChange,
    handleSave,
    handleReset,
  } = useChatbotQuickActionsTab();

  if (!active) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pb-24 space-y-4">
      {/* Header Info Card */}
      <div className="p-4 bg-[#EEF7FE] border border-[#BBE4F7] rounded-[16px]">
        <h3 className="text-[14px] font-bold text-[#1F2937] mb-1">Manage Quick Actions</h3>
        <p className="text-[12px] text-[#4B5563] leading-snug">
          Drag and drop items using the handle to reorder how they appear in the chatbot. Use the switches to enable or
          disable actions, and edit the labels based on your requirements.
        </p>
      </div>

      {/* Header Actions - Moved to Top per Mobile Parity */}
      {hasChanges && (
        <div className="flex justify-end gap-3 pb-2 pt-2">
          <Button
            variant="actionCancel"
            onClick={handleReset}
            disabled={isSaving}
            className="px-8 h-[44px] rounded-[12px] flex-1 md:flex-none"
          >
            Reset
          </Button>
          <Button
            variant="actionSubmit"
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 h-[44px] rounded-[12px] flex-1 md:flex-none"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}

      {/* Main Sorting List */}
      <div className="space-y-3">
        <DragDropProvider onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 gap-3">
            {items.map((item, index) => (
              <SortableQuickActionItem
                key={item.id}
                item={item}
                index={index}
                onToggle={handleToggleActive}
                onLabelChange={handleLabelChange}
              />
            ))}
          </div>

          <DragOverlay>
            <DragOverlayWrapper items={items} />
          </DragOverlay>
        </DragDropProvider>
      </div>
    </div>
  );
}
