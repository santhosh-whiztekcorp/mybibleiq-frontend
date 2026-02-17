import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export type UseSpiritFoodCardListProps = {
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

export const useSpiritFoodCardList = ({ onLoadMore, hasNextPage, isFetchingNextPage }: UseSpiritFoodCardListProps) => {
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
