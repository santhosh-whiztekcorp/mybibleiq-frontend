import { useMemo } from "react";

export const useUserDetailPage = (userId: string) => {
  const tabValues = useMemo(() => ["profile", "activity", "spirit-food", "settings", "feedback"] as const, []);

  return {
    userId,
    tabValues,
  };
};
