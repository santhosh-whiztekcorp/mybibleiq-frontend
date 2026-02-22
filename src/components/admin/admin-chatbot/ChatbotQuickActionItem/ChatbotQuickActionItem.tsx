"use client";

import React from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CHATBOT_QUICK_ACTION_SECTION_DESCRIPTIONS } from "@/resources/admin-chatbot";
import type { ChatbotQuickActionSection } from "@/resources/admin-chatbot";
import type { SortableQuickActionItemProps, QuickActionDragOverlayItemProps } from "./ChatbotQuickActionItem.types";

export function SortableQuickActionItem({ item, index, onToggle, onLabelChange }: SortableQuickActionItemProps) {
  const { ref, handleRef, isDragging } = useSortable({
    id: item.id,
    index,
    type: "item",
  });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-2 p-3 bg-white border border-[#E5E7EB] rounded-[16px] transition-all",
        isDragging ? "opacity-30 border-dashed border-primary" : ""
      )}
    >
      <div className="flex items-center gap-2 w-full">
        {/* Drag Handle */}
        <div
          ref={handleRef}
          className="cursor-grab active:cursor-grabbing p-1.5 rounded-md hover:bg-gray-100 text-[#9CA3AF] transition-colors shrink-0"
        >
          <GripVertical className="size-[22px]" />
        </div>

        {/* Input Container */}
        <div className="flex-1">
          <Input
            variant="adminPrimary"
            value={item.label}
            onChange={(e) => onLabelChange(item.id, e.target.value)}
            className="h-auto font-semibold text-[14px]"
            placeholder="Label"
          />
        </div>

        {/* Switch Container */}
        <div className="pl-1 shrink-0">
          <Switch
            checked={item.enabled}
            onCheckedChange={() => onToggle(item.id)}
            className="data-[state=checked]:bg-[#7EF435] data-[state=checked]:border-[#7EF435]"
          />
        </div>
      </div>

      {/* Description */}
      <div className="pl-[2px]">
        <p className="text-[12px] font-medium text-[#6B7280]">
          {CHATBOT_QUICK_ACTION_SECTION_DESCRIPTIONS[item.section as ChatbotQuickActionSection]}
        </p>
      </div>
    </div>
  );
}

export function QuickActionDragOverlayItem({ item }: QuickActionDragOverlayItemProps) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-[#F3F4F6] border border-[#E5E7EB] rounded-[16px] shadow-xl w-[calc(100%-2rem)] max-w-4xl pointer-events-none z-50">
      <div className="flex items-center gap-2 w-full">
        <GripVertical className="size-[22px] text-[#9CA3AF]" />
        <div className="flex-1">
          <Input
            variant="adminPrimary"
            value={item.label}
            readOnly
            className="h-auto font-semibold text-[14px]"
            placeholder="Label"
          />
        </div>
        <Switch checked={item.enabled} disabled />
      </div>
      <div className="pl-[2px]">
        <p className="text-[12px] font-medium text-[#6B7280]">
          {CHATBOT_QUICK_ACTION_SECTION_DESCRIPTIONS[item.section as ChatbotQuickActionSection]}
        </p>
      </div>
    </div>
  );
}
