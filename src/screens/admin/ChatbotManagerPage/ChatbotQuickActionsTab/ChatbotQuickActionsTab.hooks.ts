"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useChatbotQuickActionList, useUpdateChatbotQuickActions } from "@/resources/admin-chatbot";
import type { ChatbotQuickActionDetail } from "@/resources/admin-chatbot";

export function useChatbotQuickActionsTab() {
  const { data: quickActions, isLoading, refetch } = useChatbotQuickActionList();
  const { mutate: updateQuickActions, isPending: isSaving } = useUpdateChatbotQuickActions();

  const [items, setItems] = useState<ChatbotQuickActionDetail[]>([]);

  // Initialize/Reset items when data is fetched or reset is called
  useEffect(() => {
    if (quickActions) {
      const sorted = [...quickActions].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      const timer = setTimeout(() => {
        setItems(sorted);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [quickActions]);

  const hasChanges = useMemo(() => {
    if (!quickActions || items.length === 0) return false;

    // Quick check: if lengths differ (shouldn't happen here)
    if (items.length !== quickActions.length) return true;

    // Deep check: enabled, label, or order changed
    return items.some((item, index) => {
      const original = quickActions.find((q) => q.id === item.id);
      if (!original) return true;

      // Check order: original should have the same index if we sort it by sortOrder
      const originalSorted = [...quickActions].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      const originalIndex = originalSorted.findIndex((q) => q.id === item.id);

      return item.enabled !== original.enabled || item.label !== original.label || index !== originalIndex;
    });
  }, [items, quickActions]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = useCallback((event: any) => {
    const { source, target } = event;

    if (source && target && source.id !== target.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === source.id);
        const newIndex = prev.findIndex((i) => i.id === target.id);

        if (oldIndex === -1 || newIndex === -1) return prev;

        const newItems = [...prev];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);

        // We update the local state. The sortOrder will be assigned on Save
        return newItems;
      });
    }
  }, []);

  const handleToggleActive = useCallback((id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)));
  }, []);

  const handleLabelChange = useCallback((id: string, label: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, label } : item)));
  }, []);

  const handleSave = useCallback(() => {
    // Map items to the format expected by the API, assigning new sortOrder based on current index
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
    if (quickActions) {
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
