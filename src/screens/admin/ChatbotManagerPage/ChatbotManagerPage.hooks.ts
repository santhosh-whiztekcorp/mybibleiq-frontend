"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChatbotTab } from "./ChatbotManagerPage.types";

export function useChatbotManagerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = (searchParams.get("tab") as ChatbotTab) || "configuration";

  const [activeTab, setActiveTab] = useState<ChatbotTab>(currentTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value as ChatbotTab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`?${params.toString()}`);
  };

  return {
    activeTab,
    handleTabChange,
  };
}
