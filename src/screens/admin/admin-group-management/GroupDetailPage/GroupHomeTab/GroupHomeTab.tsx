import React from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { useGroupHomeTab } from "./GroupHomeTab.hooks";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export function GroupHomeTab() {
  const { group, isLoading, isError, stats, quickActions, navigateToView } = useGroupHomeTab();
  const { open } = useSidebar();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError || !group) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 text-red-500">
        <AlertCircle className="h-8 w-8" />
        <p>Error loading group details. Please try again.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "animate-in fade-in duration-500 grid grid-cols-1 gap-3",
        open ? "md:grid-cols-1 lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-2"
      )}
    >
      <div className="space-y-3">
        {/* 1. Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-4 py-5 rounded-xl border border-[#E5E7EB] flex flex-col items-center text-center"
            >
              <stat.icon className="h-6 w-6 text-[#6B7280] mb-2" />
              <p
                className={cn(
                  "text-lg font-bold text-[#222222] mb-1 leading-tight",
                  stat.label === "Created" ? "text-sm" : "text-sm"
                )}
              >
                {stat.value}
              </p>
              <p className="text-xs font-medium text-[#6B7280]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 2. Group Information */}
        <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] space-y-4">
          <h3 className="text-base font-bold text-[#222222]">Group Information</h3>

          <div className="space-y-4">
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-[#6B7280] mb-1">Type:</p>
                <p className="text-sm font-bold text-[#222222] capitalize">{group.type.replace(/_/g, " ")}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#6B7280] mb-1">Privacy:</p>
                <p className="text-sm font-bold text-[#222222] capitalize">{group.privacy}</p>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-[#6B7280] mb-1">Total Quizzes</p>
                <p className="text-sm font-bold text-[#222222]">{group.totalQuizzes || 0}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#6B7280] mb-1">Total Quests</p>
                <p className="text-sm font-bold text-[#222222]">{group.totalQuests || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => navigateToView(action.id)}
            className="flex cursor-pointer flex-col items-center justify-center p-5 bg-white rounded-xl border border-[#E5E7EB] hover:bg-gray-50 transition-colors"
          >
            <div className={`w-12 h-12 rounded-lg mb-3 flex items-center justify-center ${action.bg}`}>
              <action.icon className={`h-6 w-6 ${action.color}`} />
            </div>
            <span className="text-sm font-bold text-[#222222] text-center whitespace-pre-line leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
