"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ContentSelectionDialog } from "./ContentSelectionDialog";
import { ContentItemCard } from "./ContentItemCard";
import { PointsConfigDialog } from "./PointsConfigDialog";
import { QuizQuestionConfigDialog } from "./QuizQuestionConfigDialog";
import { useContentStep } from "./ContentStep.hooks";
import type { ContentItemType } from "./ContentStep.types";

export function ContentStep() {
  const {
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
  } = useContentStep();

  const addButtonLabels: Record<ContentItemType, string> = {
    quiz: "Add Quiz",
    media: "Add Media",
    flashcard: "Add Flashcard",
    flashcardGroup: "Add Flashcard Group",
  };

  const addButtonStyles: Record<ContentItemType, string> = {
    quiz: "bg-[#C0EBFF] border-[#C0EBFF] text-black hover:bg-[#C0EBFF]/90",
    media: "bg-[#FBE5A0] border-[#FBE5A0] text-black hover:bg-[#FBE5A0]/90",
    flashcard: "bg-[#FF96C6] border-[#FF96C6] text-black hover:bg-[#FF96C6]/90",
    flashcardGroup: "bg-[#BFC5FF] border-[#BFC5FF] text-black hover:bg-[#BFC5FF]/90",
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-[#656A73] font-medium">
        Add quiz, media, flashcards, or flashcard groups to this stage. You can reorder and configure each item.
      </p>

      <div className="flex flex-wrap gap-3">
        {(["quiz", "media", "flashcard", "flashcardGroup"] as const).map((type) => (
          <Button
            key={type}
            type="button"
            variant="outline"
            className={`gap-2 ${addButtonStyles[type]}`}
            onClick={() => setDialogType(type)}
          >
            <Plus className="h-4 w-4" />
            {addButtonLabels[type]}
            {type === "quiz" && ` (${quizzes.length})`}
            {type === "media" && ` (${media.length})`}
            {type === "flashcard" && ` (${flashcards.length})`}
            {type === "flashcardGroup" && ` (${flashcardGroups.length})`}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {unifiedItems.length === 0 ? (
          <div className="py-12 text-center rounded-lg border border-dashed border-[#E2E8F0] bg-[#F8FAFC]">
            <p className="text-sm font-medium text-[#656A73]">No content added yet</p>
            <p className="text-xs text-[#656A73] mt-1">
              Click the buttons above to add quiz, media, flashcards, or flashcard groups.
            </p>
          </div>
        ) : (
          unifiedItems.map((item, displayIndex) => (
            <ContentItemCard
              key={item.id}
              item={item}
              index={displayIndex}
              onConfigure={() => {
                const idx = getItemIndex(item);
                if (idx >= 0) handleConfigure(item.type, idx);
              }}
              onRemove={() => {
                const idx = getItemIndex(item);
                if (idx >= 0) handleRemove(item.type, idx);
              }}
            />
          ))
        )}
      </div>

      {dialogType && (
        <ContentSelectionDialog
          open={!!dialogType}
          onOpenChange={(open) => !open && setDialogType(null)}
          type={dialogType}
          selectedIds={getSelectedIds()}
          onSelect={handleSelect}
        />
      )}

      <PointsConfigDialog
        open={pointsConfigVisible}
        onOpenChange={setPointsConfigVisible}
        title={pointsTitle}
        initialPoints={initialPoints}
        onSave={handleSavePointsConfig}
      />

      {configuringItem?.type === "quiz" && (
        <QuizQuestionConfigDialog
          open={quizConfigVisible}
          onOpenChange={setQuizConfigVisible}
          quizId={quizzes[configuringItem.index]?.quizId || ""}
          questionOverrides={quizzes[configuringItem.index]?.questionOverrides ?? []}
          onSave={handleSaveQuizConfig}
        />
      )}
    </div>
  );
}
