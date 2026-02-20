"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { UseLeaderboardCardListProps } from "./LeaderboardCardList.types";

export const useLeaderboardCardList = ({
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: UseLeaderboardCardListProps) => {
  const { ref: loadMoreRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  return { loadMoreRef };
};
