"use client";

import { useMemo } from "react";
import {
  useChatbotTotalConversations,
  useChatbotAvgResponseTime,
  useChatbotMostAskedQuestions,
} from "@/resources/admin-chatbot";

export function useChatbotAnalyticsTab() {
  const {
    data: totalConversationsData,
    isLoading: isTotalLoading,
    refetch: refetchTotal,
  } = useChatbotTotalConversations();

  const { data: avgResponseTimeData, isLoading: isAvgLoading, refetch: refetchAvg } = useChatbotAvgResponseTime();

  const {
    data: mostAskedQuestionsData,
    isLoading: isQuestionsLoading,
    refetch: refetchQuestions,
  } = useChatbotMostAskedQuestions();

  const isLoading = isTotalLoading || isAvgLoading || isQuestionsLoading;

  const handleRefresh = async () => {
    await Promise.all([refetchTotal(), refetchAvg(), refetchQuestions()]);
  };

  const totalConversations = totalConversationsData?.total ?? 0;
  const totalConversationsTrend = totalConversationsData?.changePercent ?? null;

  const avgResponseTime = avgResponseTimeData?.avgResponseTimeSeconds ?? 0;
  const avgResponseTimeTrend = avgResponseTimeData?.changePercent ?? null;

  const mostAskedQuestions = useMemo(() => {
    const items = mostAskedQuestionsData?.items ?? [];
    if (items.length === 0) return [];

    const maxCount = Math.max(...items.map((item) => item.count));

    return items.map((item) => ({
      ...item,
      ratio: maxCount > 0 ? item.count / maxCount : 0,
    }));
  }, [mostAskedQuestionsData]);

  return {
    isLoading,
    totalConversations,
    totalConversationsTrend,
    avgResponseTime,
    avgResponseTimeTrend,
    mostAskedQuestions,
    handleRefresh,
  };
}
