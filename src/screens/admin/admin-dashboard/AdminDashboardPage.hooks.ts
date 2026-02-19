"use client";

import { useSearchParams, useRouter } from "next/navigation";

const TAB_PARAM = "tab";
const DEFAULT_TAB = "user-activity";

export const useAdminDashboardPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = (searchParams && searchParams.get(TAB_PARAM)) || DEFAULT_TAB;

  const handleTabChange = (value: string) => {
    const currentParams = searchParams ? searchParams.toString() : "";
    const params = new URLSearchParams(currentParams);
    if (value === DEFAULT_TAB) {
      params.delete(TAB_PARAM);
    } else {
      params.set(TAB_PARAM, value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return {
    activeTab,
    handleTabChange,
  };
};
