"use client";

import * as React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { ContentItemType, UnifiedContentItem, QuizContentItemRequest } from "./ContentStep.types";
import type {
  MediaContentItemRequest,
  FlashcardContentItemRequest,
  FlashcardGroupContentItemRequest,
} from "@/resources/admin-quest";

export const useContentStep = () => {
  const { control, setValue } = useFormContext();
  const content = useWatch({ control, name: "content" });

  const [dialogType, setDialogType] = React.useState<ContentItemType | null>(null);
  const [pointsConfigVisible, setPointsConfigVisible] = React.useState(false);
  const [quizConfigVisible, setQuizConfigVisible] = React.useState(false);
  const [configuringItem, setConfiguringItem] = React.useState<{
    type: ContentItemType;
    index: number;
  } | null>(null);

  const quizzes = React.useMemo(
    () => ((content?.quiz ?? []) as QuizContentItemRequest[]).sort((a, b) => a.order - b.order),
    [content?.quiz]
  );
  const media = React.useMemo(
    () => ((content?.media ?? []) as MediaContentItemRequest[]).sort((a, b) => a.order - b.order),
    [content?.media]
  );
  const flashcards = React.useMemo(
    () => ((content?.flashcards ?? []) as FlashcardContentItemRequest[]).sort((a, b) => a.order - b.order),
    [content?.flashcards]
  );
  const flashcardGroups = React.useMemo(
    () => ((content?.flashcardGroups ?? []) as FlashcardGroupContentItemRequest[]).sort((a, b) => a.order - b.order),
    [content?.flashcardGroups]
  );

  const unifiedItems = React.useMemo<UnifiedContentItem[]>(() => {
    const items: UnifiedContentItem[] = [];

    quizzes.forEach((item, index) => {
      items.push({
        id: `quiz-${item.quizId}`,
        type: "quiz",
        originalIndex: index,
        data: item,
      });
    });
    media.forEach((item, index) => {
      items.push({
        id: `media-${item.mediaId}`,
        type: "media",
        originalIndex: index,
        data: item,
      });
    });
    flashcards.forEach((item, index) => {
      items.push({
        id: `flashcard-${item.flashcardId}`,
        type: "flashcard",
        originalIndex: index,
        data: item,
      });
    });
    flashcardGroups.forEach((item, index) => {
      items.push({
        id: `flashcardGroup-${item.flashcardGroupId}`,
        type: "flashcardGroup",
        originalIndex: index,
        data: item,
      });
    });

    return items.sort((a, b) => a.data.order - b.data.order);
  }, [quizzes, media, flashcards, flashcardGroups]);

  const getNextOrder = React.useCallback((): number => {
    const allOrders: number[] = [
      ...quizzes.map((q) => q.order),
      ...media.map((m) => m.order),
      ...flashcards.map((f) => f.order),
      ...flashcardGroups.map((fg) => fg.order),
    ];
    if (allOrders.length === 0) return 0;
    return Math.max(...allOrders) + 1;
  }, [quizzes, media, flashcards, flashcardGroups]);

  const handleAddQuiz = (quizId: string) => {
    const existing = quizzes.find((q) => q.quizId === quizId);
    if (existing) {
      setValue(
        "content.quiz",
        quizzes.filter((q) => q.quizId !== quizId),
        { shouldValidate: true }
      );
    } else {
      const newOrder = getNextOrder();
      const newQuiz: QuizContentItemRequest = {
        quizId,
        difficultyOverride: "EASY",
        questionOverrides: [],
        order: newOrder,
      };
      setValue("content.quiz", [...quizzes, newQuiz], { shouldValidate: true });
    }
  };

  const handleAddMedia = (mediaId: string) => {
    const existing = media.find((m) => m.mediaId === mediaId);
    if (existing) {
      setValue(
        "content.media",
        media.filter((m) => m.mediaId !== mediaId),
        { shouldValidate: true }
      );
    } else {
      const newOrder = getNextOrder();
      setValue("content.media", [...media, { mediaId, order: newOrder, points: 0 }], { shouldValidate: true });
    }
  };

  const handleAddFlashcard = (flashcardId: string) => {
    const existing = flashcards.find((f) => f.flashcardId === flashcardId);
    if (existing) {
      setValue(
        "content.flashcards",
        flashcards.filter((f) => f.flashcardId !== flashcardId),
        { shouldValidate: true }
      );
    } else {
      const newOrder = getNextOrder();
      setValue("content.flashcards", [...flashcards, { flashcardId, order: newOrder, points: 0 }], {
        shouldValidate: true,
      });
    }
  };

  const handleAddFlashcardGroup = (flashcardGroupId: string) => {
    const existing = flashcardGroups.find((fg) => fg.flashcardGroupId === flashcardGroupId);
    if (existing) {
      setValue(
        "content.flashcardGroups",
        flashcardGroups.filter((fg) => fg.flashcardGroupId !== flashcardGroupId),
        { shouldValidate: true }
      );
    } else {
      const newOrder = getNextOrder();
      setValue("content.flashcardGroups", [...flashcardGroups, { flashcardGroupId, order: newOrder, points: 0 }], {
        shouldValidate: true,
      });
    }
  };

  const handleSelect = (id: string) => {
    if (dialogType === "quiz") handleAddQuiz(id);
    else if (dialogType === "media") handleAddMedia(id);
    else if (dialogType === "flashcard") handleAddFlashcard(id);
    else if (dialogType === "flashcardGroup") handleAddFlashcardGroup(id);
  };

  const getSelectedIds = (): string[] => {
    if (dialogType === "quiz") return quizzes.map((q) => q.quizId);
    if (dialogType === "media") return media.map((m) => m.mediaId);
    if (dialogType === "flashcard") return flashcards.map((f) => f.flashcardId);
    if (dialogType === "flashcardGroup") return flashcardGroups.map((fg) => fg.flashcardGroupId);
    return [];
  };

  const handleConfigure = (type: ContentItemType, index: number) => {
    setConfiguringItem({ type, index });
    if (type === "quiz") setQuizConfigVisible(true);
    else setPointsConfigVisible(true);
  };

  const handleSaveQuizConfig = (
    overrides: { questionId: string; difficultyOverride: "EASY" | "MEDIUM" | "HARD"; pointsOverride: number }[]
  ) => {
    if (!configuringItem || configuringItem.type !== "quiz") return;
    const updated = [...quizzes];
    const quizItem = updated[configuringItem.index];
    updated[configuringItem.index] = {
      ...quizItem,
      questionOverrides: overrides,
    };
    setValue("content.quiz", updated, { shouldValidate: true });
    setQuizConfigVisible(false);
    setConfiguringItem(null);
  };

  const handleSavePointsConfig = (points: number) => {
    if (!configuringItem || configuringItem.type === "quiz") return;
    const { type, index } = configuringItem;

    if (type === "media") {
      const updated = [...media];
      updated[index] = { ...updated[index], points };
      setValue("content.media", updated, { shouldValidate: true });
    } else if (type === "flashcard") {
      const updated = [...flashcards];
      updated[index] = { ...updated[index], points };
      setValue("content.flashcards", updated, { shouldValidate: true });
    } else if (type === "flashcardGroup") {
      const updated = [...flashcardGroups];
      updated[index] = { ...updated[index], points };
      setValue("content.flashcardGroups", updated, { shouldValidate: true });
    }
    setPointsConfigVisible(false);
    setConfiguringItem(null);
  };

  const handleRemove = (type: ContentItemType, index: number) => {
    if (type === "quiz") {
      setValue(
        "content.quiz",
        quizzes.filter((_, i) => i !== index),
        { shouldValidate: true }
      );
    } else if (type === "media") {
      setValue(
        "content.media",
        media.filter((_, i) => i !== index),
        { shouldValidate: true }
      );
    } else if (type === "flashcard") {
      setValue(
        "content.flashcards",
        flashcards.filter((_, i) => i !== index),
        { shouldValidate: true }
      );
    } else if (type === "flashcardGroup") {
      setValue(
        "content.flashcardGroups",
        flashcardGroups.filter((_, i) => i !== index),
        { shouldValidate: true }
      );
    }
  };

  const getItemIndex = (item: UnifiedContentItem): number => {
    if (item.type === "quiz") {
      return (content?.quiz ?? []).findIndex(
        (q: { quizId: string }) => q.quizId === (item.data as { quizId: string }).quizId
      );
    }
    if (item.type === "media") {
      return (content?.media ?? []).findIndex(
        (m: { mediaId: string }) => m.mediaId === (item.data as { mediaId: string }).mediaId
      );
    }
    if (item.type === "flashcard") {
      return (content?.flashcards ?? []).findIndex(
        (f: { flashcardId: string }) => f.flashcardId === (item.data as { flashcardId: string }).flashcardId
      );
    }
    return (content?.flashcardGroups ?? []).findIndex(
      (fg: { flashcardGroupId: string }) =>
        fg.flashcardGroupId === (item.data as { flashcardGroupId: string }).flashcardGroupId
    );
  };

  const pointsTitle =
    configuringItem?.type === "media"
      ? "Configure Media Points"
      : configuringItem?.type === "flashcard"
        ? "Configure Flashcard Points"
        : "Configure Flashcard Group Points";

  const initialPoints =
    configuringItem && configuringItem.type === "media"
      ? (media[configuringItem.index]?.points ?? 0)
      : configuringItem && configuringItem.type === "flashcard"
        ? (flashcards[configuringItem.index]?.points ?? 0)
        : configuringItem && configuringItem.type === "flashcardGroup"
          ? (flashcardGroups[configuringItem.index]?.points ?? 0)
          : 0;

  return {
    quizzes,
    media,
    flashcards,
    flashcardGroups,
    unifiedItems,
    dialogType,
    setDialogType,
    pointsConfigVisible,
    setPointsConfigVisible,
    quizConfigVisible,
    setQuizConfigVisible,
    configuringItem,
    handleSelect,
    getSelectedIds,
    handleConfigure,
    handleSaveQuizConfig,
    handleSavePointsConfig,
    handleRemove,
    getItemIndex,
    pointsTitle,
    initialPoints,
  };
};
