"use client";

import { useMemo, useState, useCallback } from "react";
import { useAdminQuestionList } from "@/resources/admin-question";
import { useDebounce } from "@/hooks/useDebounce";

export const useAdminQuestionSelector = (value: string[], onChange: (value: string[]) => void) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const {
    data: listData,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useAdminQuestionList({
    q: debouncedSearch || undefined,
    pageSize: 20,
    status: "Published",
  });

  const allQuestions = useMemo(() => listData?.pages.flatMap((page) => page?.items ?? []) ?? [], [listData]);

  const handleToggleQuestion = useCallback(
    (questionId: string) => {
      const newValue = value.includes(questionId) ? value.filter((id) => id !== questionId) : [...value, questionId];
      onChange(newValue);
    },
    [value, onChange]
  );

  return {
    searchValue,
    setSearchValue,
    allQuestions,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleToggleQuestion,
  };
};
