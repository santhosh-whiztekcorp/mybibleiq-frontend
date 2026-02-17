import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { UseQuestionCardListProps } from "./QuestionCardList.types";

export const useQuestionCardList = ({ onLoadMore, hasNextPage, isFetchingNextPage }: UseQuestionCardListProps) => {
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
