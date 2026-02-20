import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { AssignmentCardListProps } from "./AssignmentCardList.types";

export const useAssignmentCardList = ({
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: Pick<AssignmentCardListProps, "onLoadMore" | "hasNextPage" | "isFetchingNextPage">) => {
  const { ref: loadMoreRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && onLoadMore) {
      onLoadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  return { loadMoreRef };
};
