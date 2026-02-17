import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export type UseTagCardListProps = {
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

export const useTagCardList = ({ onLoadMore, hasNextPage, isFetchingNextPage }: UseTagCardListProps) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && onLoadMore) {
      onLoadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  return {
    loadMoreRef: ref,
  };
};
