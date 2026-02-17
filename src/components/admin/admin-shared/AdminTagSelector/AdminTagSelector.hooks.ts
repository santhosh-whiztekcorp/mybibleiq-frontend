import * as React from "react";
import { useAdminTagList } from "@/resources/admin-tag";
import { useDebounce } from "@/hooks/useDebounce";
import { AdminTagSummary } from "@/resources/admin-tag";

export const useAdminTagSelector = (value: string[], onChange: (value: string[]) => void) => {
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  // Fetch tags with infinite scroll support
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useAdminTagList({
    q: debouncedSearch || undefined,
    pageSize: 20,
  });

  const allTags = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.items) || [];
  }, [data]);

  // Maintain a map of selected tags by name to ensure all details are preserved even if not in current search results
  const [tagMap, setTagMap] = React.useState<Record<string, AdminTagSummary>>({});

  React.useEffect(() => {
    setTagMap((prevMap) => {
      const newMap = { ...prevMap };
      let changed = false;
      allTags.forEach((tag) => {
        if (!newMap[tag.name] || JSON.stringify(newMap[tag.name]) !== JSON.stringify(tag)) {
          newMap[tag.name] = tag;
          changed = true;
        }
      });
      return changed ? newMap : prevMap;
    });
  }, [allTags]);

  const selectedTags = React.useMemo(() => {
    return value.map((name) => {
      const tag = tagMap[name];
      return {
        id: tag?.id || name,
        name: name,
        categoryColor: tag?.categoryColor,
        categoryName: tag?.categoryName,
      };
    });
  }, [value, tagMap]);

  const handleToggleTag = (tagName: string) => {
    const isSelected = value.includes(tagName);
    if (isSelected) {
      onChange(value.filter((name) => name !== tagName));
    } else {
      onChange([...value, tagName]);
    }
  };

  const handleRemoveTag = (tagName: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange(value.filter((name) => name !== tagName));
  };

  return {
    searchValue,
    setSearchValue,
    allTags,
    selectedTags,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleToggleTag,
    handleRemoveTag,
  };
};
