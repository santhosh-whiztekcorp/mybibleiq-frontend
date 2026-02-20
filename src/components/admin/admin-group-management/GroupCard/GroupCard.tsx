"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Lock, Eye } from "lucide-react";
import { useGroupCard } from "./GroupCard.hooks";
import type { GroupCardProps } from "./GroupCard.types";
import { cn } from "@/lib/utils";

export function GroupCard(props: GroupCardProps) {
  const { item, onView } = props;
  const { formattedData } = useGroupCard(props);

  return (
    <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 overflow-hidden relative">
          {formattedData.icon ? (
            typeof formattedData.icon === "string" ? (
              <Image src={formattedData.icon} alt={item.name} fill className="object-cover" />
            ) : (
              <Image src={formattedData.icon} alt={item.name} fill className="object-cover" />
            )
          ) : (
            /* Placeholder Letter fallback matching mobile */
            <div className="flex items-center justify-center w-full h-full bg-[#F3F3F3] border border-[#E5E7EB] text-[#8B8B8B] rounded-full">
              <span className="text-xl font-bold uppercase">{formattedData.firstLetter}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{item.name}</h3>
          <p className="text-sm text-slate-500 line-clamp-1">{item.description || "No description provided"}</p>
          <p className="text-xs text-slate-400 mt-0.5">{formattedData.lastActivity}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-b border-gray-100 pb-5">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">{item.memberCount === 1 ? "Member" : "Members"}</span>
          <span className="text-xl font-bold text-slate-900">{item.memberCount}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">Activity Score</span>
          <span
            className={cn(
              "text-xl font-bold",
              item.activityScore > 50 ? "text-[#16A34A]" : "text-[#DC2626]" // Green if > 50, Red otherwise (example logic)
            )}
          >
            {item.activityScore}%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">Total Quizzes</span>
          <span className="text-xl font-bold text-slate-900">{item.totalQuizzes}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">Activity Quests</span>
          <span className="text-xl font-bold text-slate-900">{item.totalQuests}</span>
        </div>
      </div>

      {/* Leader */}
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-slate-500 font-medium">Group Leader</span>
        <span className="font-bold text-slate-900">{item.leader.name}</span>
        <span className="text-xs text-slate-500">@{item.leader.username}</span>
      </div>

      {/* Meta Badges */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Type:</span>
            <Badge
              variant="secondary"
              className="font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 rounded-md px-2.5"
            >
              {formattedData.typeLabel}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Privacy:</span>
            <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium">
              {item.privacy === "public" ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{formattedData.privacyLabel}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Status:</span>
            <Badge
              variant={formattedData.statusVariant}
              className="font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 rounded-md px-2.5 capitalize"
            >
              {formattedData.statusLabel}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Created:</span>
            <span className="text-slate-700 font-medium">{formattedData.createdDate}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        className="w-full bg-[#989FE2] hover:bg-[#7A7CE0] text-white font-bold h-12 rounded-xl gap-2 text-base"
        onClick={() => onView(item.id)}
      >
        <Eye className="w-4 h-4" />
        View Group Details
      </Button>
    </div>
  );
}
