"use client";

import { UserManagementStatsProps } from "./UserManagementStats.types";
import { useUserManagementStats } from "./UserManagementStats.hooks";
import { cn } from "@/lib/utils";

export function UserManagementStats({ stats, isLoading }: UserManagementStatsProps) {
  const { items } = useUserManagementStats(stats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-1 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl h-full">
        <div className="bg-muted rounded-lg animate-pulse h-16 md:h-20" />
        <div className="bg-muted rounded-lg animate-pulse h-16 md:h-20" />
        <div className="bg-muted rounded-lg animate-pulse h-16 md:h-20" />
      </div>
    );
  }

  if (!stats) return null;

  const [activeUsers, suspendedUsers, totalUsers] = items;

  return (
    <div className="grid grid-cols-3 md:grid-cols-1 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl h-full">
      {/* Total Users - spans both columns */}
      <div
        key={totalUsers.label}
        className={cn("flex items-center justify-between px-4 py-2.5 border rounded-lg", totalUsers.className)}
      >
        <span className="text-xs font-bold text-[#656A73]">{totalUsers.label}</span>
        <span className="text-xl font-bold text-black">{totalUsers.value}</span>
      </div>
      {/* Active Users */}
      <div
        key={activeUsers.label}
        className={cn("flex items-center justify-between px-4 py-2.5 border rounded-lg", activeUsers.className)}
      >
        <span className="text-xs font-bold text-[#656A73]">{activeUsers.label}</span>
        <span className="text-xl font-bold text-black">{activeUsers.value}</span>
      </div>
      {/* Suspended Users */}
      <div
        key={suspendedUsers.label}
        className={cn("flex items-center justify-between px-4 py-2.5 border rounded-lg", suspendedUsers.className)}
      >
        <span className="text-xs font-bold text-[#656A73]">{suspendedUsers.label}</span>
        <span className="text-xl font-bold text-black">{suspendedUsers.value}</span>
      </div>
    </div>
  );
}
