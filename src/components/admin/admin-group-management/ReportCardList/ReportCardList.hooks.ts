"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { UseReportCardListProps } from "./ReportCardList.types";

export const useReportCardList = ({ onLoadMore, hasNextPage, isFetchingNextPage }: UseReportCardListProps) => {
  const { ref: loadMoreRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  return { loadMoreRef };
};
