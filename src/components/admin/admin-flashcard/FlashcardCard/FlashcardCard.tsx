"use client";

import { Pencil, Trash2, Send, Archive, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDateString } from "@/utils/formatting/formatting";
import { FlashcardCardProps } from "./FlashcardCard.types";
import { useFlashcardCard } from "./FlashcardCard.hooks";

export function FlashcardCard({ item, onEdit, onDelete, onPublish, onArchive, onClone }: FlashcardCardProps) {
  const { displayTags, remainingTagsCount, cardBgColor, cardBorderColor } = useFlashcardCard(item);

  return (
    <div className={cn("rounded-xl border overflow-hidden flex flex-col h-full", cardBgColor, cardBorderColor)}>
      {/* Gradient Header with Word */}
      <div className="bg-linear-to-br from-[#F7EFD0] to-[#FF96C7] p-4 rounded-lg mx-3 mt-3 shrink-0">
        <h3 className="text-lg font-bold text-[#393737] text-center line-clamp-2">{item.word}</h3>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col gap-3">
        {/* Info Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={`status${item.status}`} size="sm">
            {item.status}
          </Badge>
          {item.reference && <span className="text-[10px] font-semibold text-[#83827E]">{item.reference}</span>}
        </div>

        {/* Definition */}
        <p className="text-sm text-[#202020] line-clamp-2">{item.definition}</p>

        {/* Tags */}
        {displayTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {displayTags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200"
              >
                {tag}
              </Badge>
            ))}
            {remainingTagsCount > 0 && <span className="text-[10px] text-[#B4B4B4]">+{remainingTagsCount} more</span>}
          </div>
        )}

        {/* Dates */}
        <div className="flex flex-col gap-0.5 text-[10px] font-semibold text-[#B4B4B4]">
          {item.createdAt && <div>Created: {formatDateString(item.createdAt)}</div>}
          {item.updatedAt && <div>Updated: {formatDateString(item.updatedAt)}</div>}
          {item.publishedAt && <div>Published: {formatDateString(item.publishedAt)}</div>}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          {item.status === "Draft" && (
            <>
              <Button
                size="sm"
                variant="actionEdit"
                className="flex-1 h-8 text-[10px] font-bold"
                onClick={() => onEdit?.(item)}
              >
                <Pencil className="h-3 w-3" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="actionPublish"
                className="flex-1 h-8 text-[10px] font-bold"
                onClick={() => onPublish?.(item.id)}
              >
                <Send className="h-3 w-3" />
                Publish
              </Button>
              <Button
                size="sm"
                variant="actionDelete"
                className="flex-1 h-8 text-[10px] font-bold"
                onClick={() => onDelete?.(item)}
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </Button>
            </>
          )}
          {item.status === "Published" && (
            <>
              <Button
                size="sm"
                variant="actionArchive"
                className="flex-1 h-8 text-[10px] font-bold"
                onClick={() => onArchive?.(item.id)}
              >
                <Archive className="h-3 w-3" />
                Archive
              </Button>
              <Button
                size="sm"
                variant="actionClone"
                className="flex-1 h-8 text-[10px] font-bold"
                onClick={() => onClone?.(item)}
              >
                <Copy className="h-3 w-3" />
                Clone
              </Button>
            </>
          )}
          {item.status === "Archived" && (
            <Button
              size="sm"
              variant="actionClone"
              className="w-full h-8 text-[10px] font-bold"
              onClick={() => onClone?.(item)}
            >
              <Copy className="h-3 w-3" />
              Clone
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
