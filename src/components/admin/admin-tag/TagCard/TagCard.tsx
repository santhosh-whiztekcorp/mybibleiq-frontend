"use client";

import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDateString } from "@/utils/formatting/formatting";
import { TagCardProps } from "./TagCard.types";
import { useTagCard } from "./TagCard.hooks";

export function TagCard({ item, onEdit, onDelete }: TagCardProps) {
  const { isExpanded, toggleExpanded } = useTagCard();

  return (
    <div className="bg-white rounded-xl border border-[#D8D8D8] overflow-hidden">
      {/* Main Row */}
      <div className="flex items-center p-3 gap-3">
        {/* Name */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-[#202020] truncate">{item.name}</h3>
        </div>
        {/* Info Row (Category & Usage) */}
        <div className="flex items-center gap-2 shrink-0">
          <Badge
            className="rounded-full px-2.5 py-1 text-[10px] font-bold text-black hover:opacity-80 border-none shadow-none"
            style={{ backgroundColor: item.categoryColor }}
          >
            {item.categoryName}
          </Badge>
          <span className="text-[10px] font-semibold text-[#83827E]">{item.usageCount} uses</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-gray-100 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(item);
            }}
          >
            <Pencil className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-gray-100 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(item);
            }}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>

        {/* Chevron */}
        <button onClick={toggleExpanded} className="p-1 shrink-0">
          <ChevronDown
            className={cn("h-4 w-4 text-[#83827E] transition-transform duration-200", isExpanded && "rotate-180")}
          />
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-3 border-t border-[#E8E8E8] space-y-2 pt-3">
          {item.description && (
            <div className="flex gap-2 text-[11px]">
              <span className="font-semibold text-[#83827E] shrink-0">Description:</span>
              <span className="text-[#202020]">{item.description}</span>
            </div>
          )}

          <div className="flex gap-2 text-[11px]">
            <span className="font-semibold text-[#83827E] shrink-0">Created:</span>
            <span className="text-[#202020]">{formatDateString(item.createdAt)}</span>
          </div>

          <div className="flex gap-2 text-[11px]">
            <span className="font-semibold text-[#83827E] shrink-0">Created By:</span>
            {/* Can't get creator name from type currently, using placeholder or ID if available */}
            <span className="text-[#202020]">-</span>
          </div>
        </div>
      )}
    </div>
  );
}
