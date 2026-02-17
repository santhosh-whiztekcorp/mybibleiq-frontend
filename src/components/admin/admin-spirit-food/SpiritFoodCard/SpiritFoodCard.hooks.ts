import { useMemo } from "react";
import type { AdminSpiritFoodSummary } from "@/resources/admin-spirit-food";

export const useSpiritFoodCard = (item: AdminSpiritFoodSummary, currentUserId?: string | null) => {
  const isMaker = useMemo(
    () => Boolean(currentUserId && item.makerUserId && currentUserId === item.makerUserId),
    [currentUserId, item.makerUserId]
  );

  const isChecker = useMemo(() => {
    if (!currentUserId || !item.makerUserId) return false;
    // If a checker is already assigned, only they can be the checker
    if (item.checkerUserId) {
      return currentUserId === item.checkerUserId;
    }
    // If no checker is assigned, anyone but the maker can be the checker
    return currentUserId !== item.makerUserId;
  }, [currentUserId, item.makerUserId, item.checkerUserId]);

  const cardVariant = useMemo(() => `status${item.status}` as const, [item.status]);

  const badgeVariant = useMemo(() => `status${item.status}` as const, [item.status]);

  return {
    isMaker,
    isChecker,
    cardVariant,
    badgeVariant,
  };
};
