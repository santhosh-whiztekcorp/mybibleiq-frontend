"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useUserActivitySummary } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { Users, HelpCircle, Trophy, TrendingUp, TrendingDown, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { StarIcon } from "@/assets";

export function UserActivityStats() {
  const { data, isLoading } = useUserActivitySummary();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[120px] w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const { totalRegisteredUsers, growthRate, quizCompletions, questCompletions, feedback } = data;

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Registered Users */}
      <Card className="bg-[#EBF9FF] border-[#528CA7] border rounded-2xl shadow-none py-0">
        <CardContent className="p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-[#202020]" />
            <span className="text-xs font-semibold text-[#202020]">
              {totalRegisteredUsers === 1 ? "Total Registered User" : "Total Registered Users"}
            </span>
          </div>
          <div className="text-xl font-bold text-black">{totalRegisteredUsers.toLocaleString()}</div>
          {growthRate !== null && (
            <div className="flex items-center gap-1 flex-wrap">
              <div
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-[#528CA7] ${growthRate >= 0 ? "bg-[#BAF8CF] border-[#BAF8CF]" : "bg-[#EBF9FF]"}`}
              >
                {growthRate >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-[#15803D]" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-[#FF0000]" />
                )}
                <span className={`text-sm font-bold ${growthRate >= 0 ? "text-[#15803D]" : "text-[#FF0000]"}`}>
                  {growthRate >= 0 ? "+" : ""}
                  {growthRate.toFixed(1)}%
                </span>
              </div>
              <span className="text-[10px] font-medium text-[#202020]">vs Last month</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quiz Completions */}
      <Card className="bg-[#EBF9FF] border-[#528CA7] border rounded-2xl shadow-none py-0">
        <CardContent className="p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4 text-[#202020]" />
            <span className="text-xs font-semibold text-[#202020]">
              {quizCompletions.count === 1 ? "Quiz Completion" : "Quiz Completions"}
            </span>
          </div>
          <div className="text-xl font-bold text-black">{quizCompletions.count.toLocaleString()}</div>
          {quizCompletions.mostPopularQuiz && (
            <p className="text-[12px] text-[#202020] truncate">
              <span className="font-bold">Most Popular: </span>
              {quizCompletions.mostPopularQuiz.title}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quest Completions */}
      <Card className="bg-[#EBF9FF] border-[#528CA7] border rounded-2xl shadow-none py-0">
        <CardContent className="p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5">
            <Trophy className="h-4 w-4 text-[#202020]" />
            <span className="text-xs font-semibold text-[#202020]">
              {questCompletions.count === 1 ? "Quest Completion" : "Quest Completions"}
            </span>
          </div>
          <div className="text-xl font-bold text-black">{questCompletions.count.toLocaleString()}</div>
          {questCompletions.mostPopularQuest && (
            <p className="text-[12px] text-[#202020] truncate">
              <span className="font-bold">Most Popular: </span>
              {questCompletions.mostPopularQuest.title}
            </p>
          )}
        </CardContent>
      </Card>

      {/* User Feedback */}
      <Card className="bg-[#EBF9FF] border-[#528CA7] border rounded-2xl shadow-none py-0">
        <CardContent className="p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5">
            <StarIcon className="h-4 w-4 text-[#202020]" />
            <span className="text-xs font-semibold text-[#202020]">User Feedback</span>
          </div>
          <div className="text-xl font-bold text-black">{feedback.totalFeedback.toLocaleString()}</div>
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-1 justify-between">
            {feedback.averageRating !== null && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-[#F1B100] fill-[#F1B100]" />
                <span className="text-[12px] font-medium text-[#202020]">{feedback.averageRating.toFixed(1)}</span>
              </div>
            )}
            <p className="text-[12px] text-[#202020]">
              <span className="font-bold">Negative Feedback: </span>
              {feedback.negativeFeedbackInPeriod}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
