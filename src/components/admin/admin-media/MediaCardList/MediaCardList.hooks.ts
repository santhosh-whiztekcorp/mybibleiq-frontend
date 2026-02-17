import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { UseMediaCardListProps } from "./MediaCardList.types";

export const useMediaCardList = ({ onLoadMore, hasNextPage, isFetchingNextPage }: UseMediaCardListProps) => {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && onLoadMore) {
      onLoadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  return { loadMoreRef };
};
