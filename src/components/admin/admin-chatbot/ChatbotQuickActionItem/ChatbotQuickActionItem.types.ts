import type { QuickActionItem } from "@/screens/admin/ChatbotManagerPage/ChatbotQuickActionsTab/ChatbotQuickActionsTab.types";

export type SortableQuickActionItemProps = {
  item: QuickActionItem;
  index: number;
  onToggle: (id: string) => void;
  onLabelChange: (id: string, label: string) => void;
};

export type QuickActionDragOverlayItemProps = {
  item: QuickActionItem;
};
