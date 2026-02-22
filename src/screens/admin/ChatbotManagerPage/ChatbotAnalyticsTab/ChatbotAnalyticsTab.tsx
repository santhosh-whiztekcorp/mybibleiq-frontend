"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { useChatbotAnalyticsTab } from "./ChatbotAnalyticsTab.hooks";
import { ChatbotAnalyticsStatCard } from "@/components/admin/admin-chatbot";

export function ChatbotAnalyticsTab({ active }: { active?: boolean }) {
  const {
    isLoading,
    totalConversations,
    totalConversationsTrend,
    avgResponseTime,
    avgResponseTimeTrend,
    mostAskedQuestions,
  } = useChatbotAnalyticsTab();

  if (!active) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChatbotAnalyticsStatCard
          title="Total Conversations"
          value={totalConversations.toLocaleString()}
          trend={totalConversationsTrend}
          icon={MessageSquare}
        />
        <ChatbotAnalyticsStatCard
          title="Avg. Response Time"
          value={`${avgResponseTime}s`}
          trend={avgResponseTimeTrend}
          icon={MessageSquare}
        />
      </div>

      {/* Most Asked Questions Section */}
      <div className="space-y-4">
        <h3 className="text-[18px] font-bold text-[#111827]">Most Asked Questions</h3>

        <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-4">
          <div className="divide-y divide-[#F3F4F6]">
            {mostAskedQuestions.length > 0 ? (
              mostAskedQuestions.map((q, index) => (
                <div key={index} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[14px] text-[#374151] font-medium truncate flex-1 mr-4">{q.question}</p>
                    <span className="text-[14px] font-bold text-[#374151]">{q.count}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#989FE2] rounded-full transition-all duration-500"
                      style={{ width: `${q.ratio * 100}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-[#6B7280]">No data available for the selected period.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
