import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { UseGroupCardListProps } from "./GroupCardList.types";

export const useGroupCardList = ({ onLoadMore, hasNextPage, isFetchingNextPage }: UseGroupCardListProps) => {
  const { ref: loadMoreRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  return { loadMoreRef };
};
