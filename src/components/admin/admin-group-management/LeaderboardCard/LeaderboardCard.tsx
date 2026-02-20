"use client";

import Image from "next/image";
import { GoldCoinIcon, pngIcons } from "@/assets";
import type { LeaderboardCardProps } from "./LeaderboardCard.types";

export function LeaderboardCard({ entry }: LeaderboardCardProps) {
  const { rank, name, username, role, score, avatarUrl } = entry;
  const displayName = name || username;
  const firstLetter = (username?.charAt(0) || "U").toUpperCase();

  const getRankIcon = () => {
    if (rank === 1) return pngIcons.leaderBoardFirst;
    if (rank === 2) return pngIcons.leaderBoardSecond;
    if (rank === 3) return pngIcons.leaderBoardThird;
    return null;
  };

  const rankIcon = getRankIcon();

  return (
    <div className="flex items-center gap-1 rounded-2xl border border-[#E2E8F0] bg-white p-3 sm:p-4">
      {/* Rank Column */}
      <div className="flex w-10 shrink-0 items-center justify-center">
        {rankIcon ? (
          <div className="relative h-8 w-8">
            <Image src={rankIcon} alt={`Rank ${rank}`} fill className="object-contain" />
          </div>
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 border border-slate-200">
            <span className="text-xs font-bold text-slate-500">{rank}</span>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-100 bg-slate-50 sm:h-12 sm:w-12">
        {avatarUrl ? (
          <Image src={avatarUrl} alt={displayName} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#F3F3F3] text-[#8B8B8B]">
            <span className="text-lg font-bold">{firstLetter}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h4 className="truncate text-sm font-bold text-slate-900 sm:text-base">{displayName}</h4>
        <p className="text-[10px] font-medium text-slate-500 tracking-wide sm:text-xs">
          {role === "leader" ? "Leader" : role === "co_leader" ? "Co-Leader" : "Member"}
        </p>
      </div>

      {/* IQ Gained (XP Style) */}
      <div className="relative flex items-center h-8 ml-2">
        <div className="absolute -left-3.5 z-10 flex items-center justify-center">
          <GoldCoinIcon width={28} height={28} />
        </div>
        <div className="bg-[#E2E8F0] pl-[18px] pr-3 py-1 rounded-[8px] min-w-[60px] flex justify-center items-center h-7">
          <span className="font-bold text-[14px] text-[#1E293B] lining-nums">{Math.floor(score).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
