"use client";

import { Pencil, Trash2, Send, Archive, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDateString } from "@/utils/formatting/formatting";
import { FlashcardGroupCardProps } from "./FlashcardGroupCard.types";
import { useFlashcardGroupCard } from "./FlashcardGroupCard.hooks";

export function FlashcardGroupCard({ item, onEdit, onDelete, onPublish, onArchive, onClone }: FlashcardGroupCardProps) {
  const { displayTags, remainingTagsCount, cardBorderColor } = useFlashcardGroupCard(item);

  return (
    <div className={cn("rounded-lg border overflow-hidden", cardBorderColor)}>
      {/* Complete Gradient Background */}
      <div className="bg-linear-to-br from-[#F7EFD0] to-[#FF96C7] p-3 space-y-3">
        {/* Name and Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#393737] line-clamp-2">{item.name}</h3>
          {item.description && (
            <p className="text-[10px] font-semibold text-[#4E4E4E] line-clamp-2">{item.description}</p>
          )}
        </div>

        {/* Info Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={`status${item.status}`} size="sm">
            {item.status}
          </Badge>
          <span className="text-[10px] text-black">Flashcards: {item.flashcardCount}</span>
        </div>

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
            {remainingTagsCount > 0 && <span className="text-[10px] text-black">+{remainingTagsCount} more</span>}
          </div>
        )}

        {/* Dates */}
        <div className="flex flex-col gap-0.5 text-[10px] font-semibold text-black">
          {item.createdAt && <div>Created: {formatDateString(item.createdAt)}</div>}
          {item.updatedAt && <div>Updated: {formatDateString(item.updatedAt)}</div>}
          {item.publishedAt && <div>Published: {formatDateString(item.publishedAt)}</div>}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status-based actions */}
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
