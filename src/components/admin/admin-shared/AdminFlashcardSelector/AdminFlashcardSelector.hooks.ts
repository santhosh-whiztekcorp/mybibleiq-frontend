import * as React from "react";
import { AdminFlashcardListInput, useAdminFlashcardList } from "@/resources/admin-flashcard";
import { useDebounce } from "@/hooks/useDebounce";
import { AdminFlashcardSummary } from "@/resources/admin-flashcard";

export const useAdminFlashcardSelector = (
  value: string[],
  onChange: (value: string[]) => void,
  filters: Omit<AdminFlashcardListInput, "page" | "pageSize" | "sort"> = {}
) => {
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useAdminFlashcardList({
    ...filters,
    q: debouncedSearch || undefined,
    pageSize: 20,
  });

  const allFlashcards = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.items) || [];
  }, [data]);

  const [flashcardMap, setFlashcardMap] = React.useState<Record<string, AdminFlashcardSummary>>({});

  React.useEffect(() => {
    setFlashcardMap((prevMap) => {
      const newMap = { ...prevMap };
      let changed = false;
      allFlashcards.forEach((card) => {
        if (!newMap[card.id] || JSON.stringify(newMap[card.id]) !== JSON.stringify(card)) {
          newMap[card.id] = card;
          changed = true;
        }
      });
      return changed ? newMap : prevMap;
    });
  }, [allFlashcards]);

  const selectedFlashcards = React.useMemo(() => {
    return value.map((id) => {
      const card = flashcardMap[id];
      return {
        id,
        word: card?.word || id,
        definition: card?.definition || "",
      };
    });
  }, [value, flashcardMap]);

  const handleToggleFlashcard = (cardId: string) => {
    const isSelected = value.includes(cardId);
    if (isSelected) {
      onChange(value.filter((id) => id !== cardId));
    } else {
      onChange([...value, cardId]);
    }
  };

  const handleRemoveFlashcard = (cardId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange(value.filter((id) => id !== cardId));
  };

  return {
    searchValue,
    setSearchValue,
    allFlashcards,
    selectedFlashcards,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleToggleFlashcard,
    handleRemoveFlashcard,
  };
};
