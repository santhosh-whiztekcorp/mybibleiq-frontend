"use client";

import { useRef, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { VirtualCardListProps } from "./VirtualCardList.types";

export function useVirtualCardList<T extends { id: string }>(props: VirtualCardListProps<T>) {
  const { items, estimateSize = 200, overscan = 5, gap = 16, hasNextPage, isFetchingNextPage, onLoadMore } = props;
  const parentRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
    gap,
  });

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasNextPage || isFetchingNextPage || !onLoadMore) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onLoadMore();
          }
        },
        { threshold: 0, rootMargin: "200px" }
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [hasNextPage, isFetchingNextPage, onLoadMore]
  );

  return {
    parentRef,
    rowVirtualizer,
    lastItemRef,
    virtualItems: rowVirtualizer.getVirtualItems(),
    totalSize: rowVirtualizer.getTotalSize(),
  };
}
