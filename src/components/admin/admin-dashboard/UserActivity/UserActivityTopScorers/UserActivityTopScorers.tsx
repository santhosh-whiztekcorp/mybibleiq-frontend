"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTopScorers } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { GoldCoinIcon, pngIcons } from "@/assets";

export function UserActivityTopScorers() {
  const { data, isLoading } = useTopScorers();

  if (isLoading) {
    return (
      <Card className="rounded-2xl border-[#E2E8F0] shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-[#0F172A]">Top Scorers – Leaderboard</CardTitle>
          <p className="text-xs font-medium text-[#64748B]">Highest Bible IQ scores</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const scorers = data?.topScorers || [];

  if (scorers.length === 0) {
    return (
      <Card className="rounded-2xl border-[#E2E8F0] shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-[#0F172A]">Top Scorers – Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center text-[#64748B] text-sm">No items found</div>
        </CardContent>
      </Card>
    );
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return pngIcons.leaderBoardFirst;
    if (rank === 2) return pngIcons.leaderBoardSecond;
    if (rank === 3) return pngIcons.leaderBoardThird;
    return null;
  };

  return (
    <Card className="rounded-2xl border-[#E2E8F0] shadow-none">
      <CardHeader className="gap-0">
        <CardTitle className="text-[17px] font-bold text-[#0F172A]">
          {scorers.length === 1 ? "Top Scorer – Leaderboard" : "Top Scorers – Leaderboard"}
        </CardTitle>
        <p className="text-[14px] font-medium text-[#64748B]">Highest BibleIQ</p>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="flex flex-col">
          {scorers.map((scorer) => {
            const rankIcon = getRankIcon(scorer.rank);
            return (
              <div
                key={scorer.userId}
                className="flex items-center justify-between p-3 border border-[#F1F5F9] rounded-xl"
              >
                <div className="flex items-center gap-2">
                  {/* Rank */}
                  <div className="w-8 flex justify-center shrink-0">
                    {rankIcon ? (
                      <Image
                        src={rankIcon}
                        alt={`Rank ${scorer.rank}`}
                        width={28}
                        height={28}
                        className="object-contain h-10 w-10"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F5F9] text-[13px] font-bold text-[#64748B]">
                        {scorer.rank}
                      </div>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="h-10 w-10 shrink-0">
                      {scorer.avatarUrl ? <AvatarImage src={scorer.avatarUrl} alt={scorer?.name || "U"} /> : null}
                      <AvatarFallback>{(scorer.name || "U").charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>

                  {/* User Info */}
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-[15px] text-[#0F172A] truncate leading-tight">
                      {scorer.name || "Unknown"}
                    </span>
                    {scorer.username && (
                      <span className="text-[12px] font-medium text-[#64748B] truncate mt-0.5">@{scorer.username}</span>
                    )}
                    {scorer.country && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Globe className="h-3 w-3 text-[#64748B]" />
                        <span className="text-[12px] font-medium text-[#64748B] truncate">{scorer.country}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Score Score Display — replicates mobile overlapping design */}
                <div className="relative flex items-center h-8 ml-4 mr-0.5">
                  <div className="absolute -left-3.5 z-10 flex items-center justify-center">
                    <GoldCoinIcon width={28} height={28} />
                  </div>
                  <div className="bg-[#E2E8F0] pl-[18px] pr-3 py-1 rounded-[8px] min-w-[60px] flex justify-center items-center h-7 mt-0.5">
                    <span className="font-bold text-[14px] text-[#1E293B] lining-nums">
                      {Math.floor(scorer.bibleIQScore).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
