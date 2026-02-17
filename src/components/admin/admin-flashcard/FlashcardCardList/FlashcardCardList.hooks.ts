import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export type UseFlashcardCardListProps = {
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

export const useFlashcardCardList = ({ onLoadMore, hasNextPage, isFetchingNextPage }: UseFlashcardCardListProps) => {
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
