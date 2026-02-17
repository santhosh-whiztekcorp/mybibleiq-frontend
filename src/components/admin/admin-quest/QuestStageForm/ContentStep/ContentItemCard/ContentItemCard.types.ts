import type { UnifiedContentItem } from "../ContentStep.types";

export type ContentItemCardProps = {
  item: UnifiedContentItem;
  index: number;
  onConfigure: () => void;
  onRemove: () => void;
};
