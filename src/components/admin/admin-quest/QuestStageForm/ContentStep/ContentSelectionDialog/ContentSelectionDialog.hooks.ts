"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";
import { useAdminQuizList } from "@/resources/admin-quiz";
import { useAdminMediaList } from "@/resources/admin-media";
import { useAdminFlashcardList } from "@/resources/admin-flashcard";
import { useAdminFlashcardGroupList } from "@/resources/admin-flashcard-group";
import { useDebounce } from "@/hooks/useDebounce";
import type { ContentType, SelectableContentItem } from "./ContentSelectionDialog.types";

export function useContentSelectionDialog(type: ContentType) {
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const quizQuery = useAdminQuizList({
    status: "Published",
    q: debouncedSearch || undefined,
    pageSize: 20,
  });
  const mediaQuery = useAdminMediaList({
    status: "Published",
    q: debouncedSearch || undefined,
    pageSize: 20,
  });
  const flashcardQuery = useAdminFlashcardList({
    status: "Published",
    q: debouncedSearch || undefined,
    pageSize: 20,
  });
  const flashcardGroupQuery = useAdminFlashcardGroupList({
    status: "Published",
    q: debouncedSearch || undefined,
    pageSize: 20,
  });

  const getQuery = () => {
    switch (type) {
      case "quiz":
        return quizQuery;
      case "media":
        return mediaQuery;
      case "flashcard":
        return flashcardQuery;
      case "flashcardGroup":
        return flashcardGroupQuery;
    }
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = getQuery();

  const items = React.useMemo<SelectableContentItem[]>(() => {
    const pages = (data?.pages ?? []) as Array<{ items?: SelectableContentItem[] }>;
    return pages.flatMap((page) => page.items ?? []);
  }, [data]);

  const { ref: loadMoreRef, inView } = useInView({ threshold: 0 });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    searchValue,
    setSearchValue,
    items,
    isLoading,
    isFetchingNextPage,
    loadMoreRef,
  };
}
