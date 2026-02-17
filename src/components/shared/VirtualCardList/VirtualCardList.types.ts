import React from "react";

export type VirtualCardListProps<T> = {
  items: T[];
  isLoading?: boolean;
  renderCard: (item: T, index: number) => React.ReactNode;
  estimateSize?: number;
  overscan?: number;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  emptyState?: React.ReactNode;
  loadingState?: React.ReactNode;
  className?: string;
  gap?: number;
};
