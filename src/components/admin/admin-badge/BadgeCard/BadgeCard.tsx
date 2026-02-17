"use client";

import Image from "next/image";
import { Edit, Trash2, Send, Archive, Copy, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDateString } from "@/utils/formatting";
import { BadgeCardProps } from "./BadgeCard.types";

export function BadgeCard({ item, onEdit, onDelete, onPublish, onArchive, onClone }: BadgeCardProps) {
  const cardBgColor =
    { Published: "bg-green-50", Archived: "bg-red-50", Draft: "bg-gray-100" }[item.status] || "bg-white";
  const cardBorderColor =
    { Published: "border-green-200", Archived: "border-red-200", Draft: "border-gray-200" }[item.status] ||
    "border-[#E2E8F0]";

  return (
    <div
      className={cn(
        "rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full group",
        cardBgColor,
        cardBorderColor
      )}
    >
      <div className="p-4 flex gap-4 relative">
        <div className="relative h-20 w-20 rounded-lg shrink-0 overflow-hidden border border-gray-200">
          {item.iconUrl ? (
            <div className="relative w-full h-full">
              <Image src={item.iconUrl} alt={item.name} fill className="object-contain p-2" unoptimized />
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400">
              <Crown className="h-8 w-8" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-gray-900 line-clamp-1 text-base group-hover:text-primary transition-colors">
                {item.name}
              </h3>
              <Badge variant={`status${item.status}`} size="sm">
                {item.status}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Badge variant={`rarity${item.rarity}`} size="sm">
              {item.rarity}
            </Badge>
            <Badge variant="outline">{item.category}</Badge>
          </div>
        </div>
      </div>

      {/* Stats/Info Grid */}
      <div className="p-3 grid grid-cols-2 gap-px ">
        <div className="bg-white p-2 rounded-tl-lg rounded-bl-lg">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Created</p>
          <p className="text-xs font-semibold text-gray-700">{formatDateString(item.createdAt)}</p>
        </div>
        <div className="bg-white p-2 rounded-tr-lg rounded-br-lg">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Type</p>
          <p className="text-xs font-semibold text-gray-700 truncate">{item.assignmentType}</p>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-3 bg-white mt-auto">
        <div className="flex gap-2">
          {item.status === "Draft" && (
            <>
              <Button
                variant="actionEdit"
                size="sm"
                className="flex-1 h-8 text-[10px] px-2"
                onClick={() => onEdit?.(item)}
              >
                <Edit className="size-3" />
                Edit
              </Button>
              <Button
                variant="actionPublish"
                size="sm"
                className="flex-1 h-8 text-[10px] px-2"
                onClick={() => onPublish?.(item.id)}
              >
                <Send className="size-3" />
                Publish
              </Button>
              <Button
                variant="actionDelete"
                size="sm"
                className="flex-1 h-8 text-[10px] px-2"
                onClick={() => onDelete?.(item)}
              >
                <Trash2 className="size-3" />
                Delete
              </Button>
            </>
          )}
          {item.status === "Published" && (
            <>
              <Button
                variant="actionArchive"
                size="sm"
                className="flex-1 h-8 text-[10px]"
                onClick={() => onArchive?.(item.id)}
              >
                <Archive className="size-3" />
                Archive
              </Button>
              <Button
                variant="actionClone"
                size="sm"
                className="flex-1 h-8 text-[10px]"
                onClick={() => onClone?.(item)}
              >
                <Copy className="size-3" />
                Clone
              </Button>
            </>
          )}
          {item.status === "Archived" && (
            <Button variant="actionClone" size="sm" className="flex-1 h-8 text-[10px]" onClick={() => onClone?.(item)}>
              <Copy className="size-3" />
              Clone
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
