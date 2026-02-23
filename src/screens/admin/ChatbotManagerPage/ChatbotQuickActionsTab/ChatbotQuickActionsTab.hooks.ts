"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useChatbotQuickActionList, useUpdateChatbotQuickActions } from "@/resources/admin-chatbot";
import type { ChatbotQuickActionDetail } from "@/resources/admin-chatbot";

export function useChatbotQuickActionsTab() {
  const { data: quickActions, isLoading, refetch } = useChatbotQuickActionList();
  const { mutate: updateQuickActions, isPending: isSaving } = useUpdateChatbotQuickActions();

  const [items, setItems] = useState<ChatbotQuickActionDetail[]>([]);

  useEffect(() => {
    if (quickActions && Array.isArray(quickActions)) {
      const sorted = [...quickActions].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      const timer = setTimeout(() => {
        setItems(sorted);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [quickActions]);

  const hasChanges = useMemo(() => {
    if (!quickActions || !Array.isArray(quickActions) || items.length === 0) return false;

    const isContentSame = items.every((item) => {
      const original = quickActions.find((q) => String(q.id) === String(item.id));
      return original && item.enabled === original.enabled && item.label === original.label;
    });

    if (!isContentSame) return true;

    const originalSortedIds = [...quickActions]
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map((q) => String(q.id));
    const currentIds = items.map((item) => String(item.id));

    return JSON.stringify(originalSortedIds) !== JSON.stringify(currentIds);
  }, [items, quickActions]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = useCallback((event: any) => {
    if (event.canceled) return;

    const source = event.operation?.source || event.source || event.active;

    if (source && source.initialIndex !== undefined && source.index !== undefined) {
      const { initialIndex, index } = source;

      if (initialIndex !== index) {
        setItems((prev) => {
          const newItems = [...prev];
          const [movedItem] = newItems.splice(initialIndex, 1);
          newItems.splice(index, 0, movedItem);
          return newItems;
        });
      }
      return;
    }

    const target = event.operation?.target || event.target || event.over;
    const sourceId = source?.id;
    const targetId = target?.id;

    if (sourceId && targetId && sourceId !== targetId) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === sourceId);
        const newIndex = prev.findIndex((i) => i.id === targetId);

        if (oldIndex === -1 || newIndex === -1) return prev;

        const newItems = [...prev];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);

        return newItems;
      });
    }
  }, []);

  const handleToggleActive = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => (String(item.id) === String(id) ? { ...item, enabled: !item.enabled } : item))
    );
  }, []);

  const handleLabelChange = useCallback((id: string, label: string) => {
    setItems((prev) => prev.map((item) => (String(item.id) === String(id) ? { ...item, label } : item)));
  }, []);

  const handleSave = useCallback(() => {
    const payload = items.map((item, index) => ({
      section: item.section as string,
      label: item.label,
      enabled: item.enabled,
      sortOrder: index,
    }));

    updateQuickActions(payload, {
      onSuccess: () => {
        refetch();
      },
    });
  }, [items, updateQuickActions, refetch]);

  const handleReset = useCallback(() => {
    if (quickActions && Array.isArray(quickActions)) {
      const sorted = [...quickActions].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setItems(sorted);
    }
  }, [quickActions]);
  return {
    items,
    isLoading,
    isSaving,
    hasChanges,
    handleDragEnd,
    handleToggleActive,
    handleLabelChange,
    handleSave,
    handleReset,
  };
}
