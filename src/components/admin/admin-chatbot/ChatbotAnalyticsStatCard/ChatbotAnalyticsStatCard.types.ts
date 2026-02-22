import React from "react";

export type ChatbotAnalyticsStatCardProps = {
  title: string;
  value: string | number;
  trend: number | null;
  icon: React.ElementType;
};
