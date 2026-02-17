"use client";

import React from "react";
import Image from "next/image";
import { Pencil, Trash2, Send, Archive, Copy, ImageIcon, Music, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDateString } from "@/utils/formatting/formatting";
import { MediaCardProps } from "./MediaCard.types";
import { useMediaCard } from "./MediaCard.hooks";

const MediaCardComponent = ({ item, onEdit, onDelete, onPublish, onArchive, onClone, onPreview }: MediaCardProps) => {
  const { displayTags, remainingTagsCount, cardBgColor, cardBorderColor } = useMediaCard(item);

  const TypeIcon =
    {
      IMAGE: ImageIcon,
      AUDIO: Music,
      VIDEO: Video,
    }[item.type] || ImageIcon;

  return (
    <div
      className={cn("rounded-xl border overflow-hidden transition-all hover:shadow-md", cardBgColor, cardBorderColor)}
    >
      {/* Media Preview / Icon */}
      <div
        onClick={() => onPreview?.(item)}
        className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden group cursor-pointer"
      >
        {item.type === "IMAGE" && item.url ? (
          <Image
            src={item.url}
            alt={item.title}
            fill
            className="object-contain transition-transform group-hover:scale-105"
            unoptimized
          />
        ) : (
          <TypeIcon className="h-10 w-10 text-muted-foreground/40" />
        )}
        <Badge variant={`type${item.type}`} size="sm">
          {item.type}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-[#1a1a1a] line-clamp-1">{item.title}</h3>
            <Badge variant={`status${item.status}`} size="sm">
              {item.status}
            </Badge>
          </div>
          {item.caption && <p className="text-[11px] text-[#656A73] line-clamp-1">{item.caption}</p>}
        </div>

        {/* Tags */}
        {displayTags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {displayTags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-[9px] px-1.5 py-0 bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]"
              >
                {tag}
              </Badge>
            ))}
            {remainingTagsCount > 0 && <span className="text-[9px] text-[#B4B4B4]">+{remainingTagsCount}</span>}
          </div>
        )}

        {/* Dates */}
        <div className="flex flex-col gap-0.5 text-[9px] font-medium text-[#B4B4B4]">
          <div>Created: {formatDateString(item.createdAt)}</div>
          {item.status === "Published" && item.publishedAt && (
            <div>Published: {formatDateString(item.publishedAt)}</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {item.status === "Draft" && (
            <>
              <Button
                size="sm"
                variant="actionEdit"
                className="flex-1 h-7 text-[10px] font-bold"
                onClick={() => onEdit?.(item)}
              >
                <Pencil className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="actionPublish"
                className="flex-1 h-7 text-[10px] font-bold"
                onClick={() => onPublish?.(item)}
              >
                <Send className="h-3 w-3 mr-1" />
                Publish
              </Button>
              <Button
                size="sm"
                variant="actionDelete"
                className="flex-1 h-7 text-[10px] font-bold"
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
                className="flex-1 h-7 text-[10px] font-bold"
                onClick={() => onArchive?.(item)}
              >
                <Archive className="h-3 w-3 mr-1" />
                Archive
              </Button>
              <Button
                size="sm"
                variant="actionClone"
                className="flex-1 h-7 text-[10px] font-bold"
                onClick={() => onClone?.(item)}
              >
                <Copy className="h-3 w-3 mr-1" />
                Clone
              </Button>
            </>
          )}
          {item.status === "Archived" && (
            <Button
              size="sm"
              variant="actionClone"
              className="w-full h-7 text-[10px] font-bold"
              onClick={() => onClone?.(item)}
            >
              <Copy className="h-3 w-3 mr-1" />
              Clone
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

MediaCardComponent.displayName = "MediaCard";

// Memoized version for performance optimization in large lists
export const MediaCard = React.memo(MediaCardComponent);
