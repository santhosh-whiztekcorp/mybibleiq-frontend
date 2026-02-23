"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Edit, Trash2, Send, Archive, Copy, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDateString } from "@/utils/formatting";
import { BadgeCardProps } from "./BadgeCard.types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  BADGE_TRIGGER_TYPE_LABELS,
  BADGE_METRIC_OPTIONS_BY_TRIGGER,
  BADGE_CONDITION_OPERATOR_LABELS,
} from "@/resources/admin-badge/admin-badge.constants";

export function BadgeCard({ item, onEdit, onDelete, onPublish, onArchive, onClone }: BadgeCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
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
        <div
          className="relative h-20 w-20 rounded-lg shrink-0 overflow-hidden border bg-white cursor-pointer"
          onClick={() => item.iconUrl && setIsPreviewOpen(true)}
          role="button"
          tabIndex={0}
        >
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

        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="m-0 sm:max-w-[30vw] rounded-xl shadow-none p-5 pt-10 bg-muted flex items-center justify-center">
            <DialogTitle className="sr-only">{item.name} preview</DialogTitle>
            <div className="relative w-full max-w-[90vw] aspect-square">
              {item.iconUrl && <Image src={item.iconUrl} alt={item.name} fill className="object-contain" unoptimized />}
            </div>
          </DialogContent>
        </Dialog>

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
        </div>
      </div>

      {/* Badge Metadata */}
      <div className="px-3 pb-2 mt-auto">
        <div className="bg-white rounded-lg overflow-hidden divide-y divide-gray-100">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Type</p>
            <Badge variant={`assignment${item.assignmentType}`} size="xs">
              {item.assignmentType}
            </Badge>
          </div>
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Rarity</p>
            <Badge variant={`rarity${item.rarity}`} size="xs">
              {item.rarity}
            </Badge>
          </div>
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Category</p>
            <Badge variant={`category${item.category}`} size="xs">
              {item.category}
            </Badge>
          </div>
          {item.triggerConfig && (
            <>
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Trigger</p>
                <Badge variant={`trigger${item.triggerConfig.triggerType}`} size="xs">
                  {BADGE_TRIGGER_TYPE_LABELS[item.triggerConfig.triggerType]}
                </Badge>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Metric</p>
                <Badge variant={`trigger${item.triggerConfig.triggerType}`} size="xs">
                  {(BADGE_METRIC_OPTIONS_BY_TRIGGER[item.triggerConfig.triggerType] || []).find(
                    (opt) => opt.value === item.triggerConfig?.metric?.type
                  )?.label || item.triggerConfig.metric?.type}
                </Badge>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Condition</p>
                <Badge variant="conditionOperator" size="xs">
                  {BADGE_CONDITION_OPERATOR_LABELS[item.triggerConfig.operator]}
                </Badge>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Threshold</p>
                <Badge variant="tag" size="xs">
                  {item.triggerConfig.threshold}
                </Badge>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="px-3 pb-3">
        <div className="bg-white rounded-lg overflow-hidden divide-y divide-gray-100">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Created</p>
            <p className="text-xs font-semibold text-gray-700">{formatDateString(item.createdAt)}</p>
          </div>
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Updated</p>
            <p className="text-xs font-semibold text-gray-700">{formatDateString(item.updatedAt)}</p>
          </div>
          {item.publishedAt && (
            <div className="flex items-center justify-between px-3 py-2">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Published</p>
              <p className="text-xs font-semibold text-gray-700">{formatDateString(item.publishedAt)}</p>
            </div>
          )}
          {item.archivedAt && (
            <div className="flex items-center justify-between px-3 py-2">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Archived</p>
              <p className="text-xs font-semibold text-gray-700">{formatDateString(item.archivedAt)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-3 mt-auto">
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
                onClick={() => onPublish?.(item)}
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
                onClick={() => onArchive?.(item)}
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
