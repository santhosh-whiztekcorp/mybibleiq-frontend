"use client";

import { QuestionTypeStatsProps } from "./QuestionTypeStats.types";
import { useQuestionTypeStats } from "./QuestionTypeStats.hooks";
import { cn } from "@/lib/utils";
import { SafeIcon } from "@/components/shared/SafeIcon";

export function QuestionTypeStats({ stats, isLoading }: QuestionTypeStatsProps) {
  const { items } = useQuestionTypeStats(stats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-1 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl h-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[52px] bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl h-full overflow-y-auto">
      {items.map((item) => (
        <div
          key={item.label}
          className={cn("flex items-center justify-between px-2 py-2 border rounded-lg", item.className)}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center shrink-0 overflow-visible"
              style={{ width: 18, height: 18, minWidth: 18, minHeight: 18 }}
            >
              <SafeIcon
                icon={item.Icon}
                width={18}
                height={18}
                className={cn("shrink-0 block overflow-visible", item.iconColor)}
                style={{
                  display: "block",
                  flexShrink: 0,
                  width: 18,
                  height: 18,
                  minWidth: 18,
                  minHeight: 18,
                  overflow: "visible",
                }}
              />
            </div>
            <span className="text-xs font-bold text-[#656A73]">{item.label}</span>
          </div>
          <span className="text-xl font-bold text-black">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
