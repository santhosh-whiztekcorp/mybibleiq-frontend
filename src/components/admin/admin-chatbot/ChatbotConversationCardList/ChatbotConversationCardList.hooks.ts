"use client";

import { useEffect, useRef, useCallback } from "react";

type UseChatbotConversationCardListProps = {
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

export const useChatbotConversationCardList = ({
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: UseChatbotConversationCardListProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage && onLoadMore) {
        onLoadMore();
      }
    },
    [onLoadMore, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "200px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return { loadMoreRef };
};
