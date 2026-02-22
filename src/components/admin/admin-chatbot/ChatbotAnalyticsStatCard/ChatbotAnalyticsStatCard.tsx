"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatbotAnalyticsStatCardProps } from "./ChatbotAnalyticsStatCard.types";

export function ChatbotAnalyticsStatCard({ title, value, trend, icon: Icon }: ChatbotAnalyticsStatCardProps) {
  const isPositive = trend !== null && trend >= 0;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-4 flex flex-col">
      <div className="flex justify-between items-start">
        <span className="text-[14px] font-medium text-[#6B7280]">{title}</span>
        <div className="size-8 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center">
          <Icon className="size-[18px] text-[#6B7280]" />
        </div>
      </div>
      <span className="text-[24px] font-bold text-[#111827] mt-1">{value}</span>
      {trend !== null && (
        <div className="flex items-center gap-1.5 mt-2">
          {isPositive ? (
            <ArrowUpRight className="size-4 text-[#10B981]" />
          ) : (
            <ArrowDownRight className="size-4 text-[#DC2626]" />
          )}
          <span className={cn("text-[12px] font-semibold", isPositive ? "text-[#10B981]" : "text-[#DC2626]")}>
            {isPositive ? "+" : ""}
            {trend}% from last week
          </span>
        </div>
      )}
    </div>
  );
}
