"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { pngIcons, GoldCoinIcon } from "@/assets";
import type { AdminGroupLeaderboardEntry } from "@/resources/admin-group-management/admin-group-management.types";

export const useLeaderboardDataTableColumns = (): ColumnDef<AdminGroupLeaderboardEntry>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "rank",
        header: "Rank",
        cell: ({ row }) => {
          const rank = row.original.rank;
          const getRankIcon = () => {
            if (rank === 1) return pngIcons.leaderBoardFirst;
            if (rank === 2) return pngIcons.leaderBoardSecond;
            if (rank === 3) return pngIcons.leaderBoardThird;
            return null;
          };
          const rankIcon = getRankIcon();

          return (
            <div className="flex w-10 items-center justify-center">
              {rankIcon ? (
                <div className="relative h-6 w-6">
                  <Image src={rankIcon} alt={`Rank ${rank}`} fill className="object-contain" />
                </div>
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500">{rank}</span>
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "user",
        header: "Member",
        cell: ({ row }) => {
          const { name, username, avatarUrl } = row.original;
          const displayName = name || username;
          const firstLetter = (username?.charAt(0) || "U").toUpperCase();

          return (
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-slate-100 bg-slate-50">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt={displayName} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#F3F3F3] text-[#8B8B8B]">
                    <span className="text-xs font-bold">{firstLetter}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">{displayName}</span>
                <span className="text-xs text-slate-500">@{username}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.original.role;
          return (
            <span className="text-xs font-medium text-slate-500 tracking-wide">
              {role === "leader" ? "Leader" : role === "co_leader" ? "Co-Leader" : "Member"}
            </span>
          );
        },
      },
      {
        accessorKey: "score",
        header: "IQ",
        cell: ({ row }) => {
          const score = row.original.score;
          return (
            <div className="relative flex items-center h-8 ml-2">
              <div className="absolute -left-3.5 z-10 flex items-center justify-center">
                <GoldCoinIcon width={28} height={28} />
              </div>
              <div className="bg-[#E2E8F0] pl-[18px] pr-3 py-1 rounded-[8px] min-w-[60px] flex justify-center items-center h-7">
                <span className="font-bold text-[14px] text-[#1E293B] lining-nums">
                  {Math.floor(score).toLocaleString()}
                </span>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );
};
