import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { UseChatbotResponseCardListProps } from "./ChatbotResponseCardList.types";

export const useChatbotResponseCardList = ({
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: UseChatbotResponseCardListProps) => {
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
