"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Search, Music, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContentSelectionDialog } from "./ContentSelectionDialog.hooks";
import type { ContentSelectionDialogProps, ContentType, SelectableContentItem } from "./ContentSelectionDialog.types";
import type { AdminQuizSummary } from "@/resources/admin-quiz";
import type { AdminFlashcardSummary } from "@/resources/admin-flashcard";
import type { AdminFlashcardGroupSummary } from "@/resources/admin-flashcard-group";
import type { AdminMediaSummary } from "@/resources/admin-media";

export function ContentSelectionDialog({
  open,
  onOpenChange,
  type,
  selectedIds,
  onSelect,
}: ContentSelectionDialogProps) {
  const { searchValue, setSearchValue, items, isLoading, isFetchingNextPage, loadMoreRef } =
    useContentSelectionDialog(type);

  const titles: Record<ContentType, string> = {
    quiz: "Select Quiz",
    media: "Select Media",
    flashcard: "Select Flashcard",
    flashcardGroup: "Select Flashcard Group",
  };

  const placeholders: Record<ContentType, string> = {
    quiz: "Search quizzes...",
    media: "Search media...",
    flashcard: "Search flashcards...",
    flashcardGroup: "Search flashcard groups...",
  };
  const renderItem = (item: SelectableContentItem) => {
    const isSelected = selectedIds.includes(item.id);

    const getTitle = () => {
      const { id } = item;
      if ("title" in item) return item.title;
      if ("word" in item) return item.word;
      if ("name" in item) return item.name;
      return id;
    };

    const title = getTitle();

    // Quiz - Card with title, description, tags, and question count (matching mobile)
    if (type === "quiz") {
      const quizItem = item as AdminQuizSummary;
      const MAX_TAGS_DISPLAY = 3;
      const displayTags = quizItem.tags?.slice(0, MAX_TAGS_DISPLAY) || [];
      const remainingTagsCount = (quizItem.tags?.length || 0) - MAX_TAGS_DISPLAY;

      return (
        <div
          key={item.id}
          className={cn(
            "relative flex flex-col rounded-xl cursor-pointer transition-all duration-200 border-2 overflow-hidden shadow-sm hover:shadow-md p-3 gap-2",
            isSelected
              ? "border-primary ring-2 ring-primary/20 bg-white"
              : "border-[#E5E7EB] bg-white hover:border-[#DADADA]"
          )}
          onClick={() => onSelect(item.id)}
        >
          <h3 className="text-sm font-bold text-[#393737] line-clamp-2">{title}</h3>
          {quizItem.description && <p className="text-xs text-[#656A73] line-clamp-2">{quizItem.description}</p>}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[10px] font-bold text-[#3B82F6] uppercase">
              {quizItem.totalQuestions} Questions
            </span>
          </div>
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {displayTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[10px] font-medium text-[#4B5563]"
                >
                  {tag}
                </span>
              ))}
              {remainingTagsCount > 0 && (
                <span className="text-[10px] font-medium text-[#6B7280]">+{remainingTagsCount} more</span>
              )}
            </div>
          )}
          {isSelected && (
            <div className="absolute top-2 right-2 z-20 animate-in zoom-in duration-300">
              <div className="bg-primary text-white rounded-full p-1 shadow-lg border-2 border-white font-bold">
                <Check className="h-3 w-3 stroke-[3px]" />
              </div>
            </div>
          )}
        </div>
      );
    }

    // Media - Card with preview, title, and media type badge (matching mobile)
    if (type === "media") {
      const mediaItem = item as AdminMediaSummary;

      return (
        <div
          key={item.id}
          className={cn(
            "relative flex flex-col rounded-xl cursor-pointer transition-all duration-200 border-2 overflow-hidden shadow-sm hover:shadow-md",
            isSelected
              ? "border-primary ring-2 ring-primary/20 bg-white"
              : "border-[#E5E7EB] bg-white hover:border-[#DADADA]"
          )}
          onClick={() => onSelect(item.id)}
        >
          {/* Media Preview */}
          {(mediaItem.type === "IMAGE" || mediaItem.type === "VIDEO") && (
            <div className="relative w-full aspect-video bg-gray-100">
              <Image
                src={String(mediaItem.url ?? "")}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {mediaItem.type === "VIDEO" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-black border-b-8 border-b-transparent ml-1" />
                  </div>
                </div>
              )}
            </div>
          )}
          {mediaItem.type === "AUDIO" && (
            <div className="relative w-full aspect-video bg-linear-to-br from-[#FBE5A0] to-[#F8D060] flex items-center justify-center">
              <Music className="h-12 w-12 text-black/40" />
              <span className="absolute bottom-3 text-sm font-bold text-black/60">Audio</span>
            </div>
          )}

          {/* Title and Badge */}
          <div className="p-3 flex flex-col gap-2">
            <h3 className="text-sm font-bold text-[#393737] line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase",
                  mediaItem.type === "IMAGE" && "bg-[#DBEAFE] text-[#1E40AF]",
                  mediaItem.type === "VIDEO" && "bg-[#FEE2E2] text-[#991B1B]",
                  mediaItem.type === "AUDIO" && "bg-[#FEF3C7] text-[#92400E]"
                )}
              >
                {mediaItem.type}
              </span>
            </div>
          </div>

          {isSelected && (
            <div className="absolute top-2 right-2 z-20 animate-in zoom-in duration-300">
              <div className="bg-primary text-white rounded-full p-1 shadow-lg border-2 border-white font-bold">
                <Check className="h-3 w-3 stroke-[3px]" />
              </div>
            </div>
          )}
        </div>
      );
    }

    // Flashcard - Card with gradient background, word, definition, and reference (matching mobile)
    if (type === "flashcard") {
      const flashcardItem = item as AdminFlashcardSummary;

      return (
        <div
          key={item.id}
          className={cn(
            "relative flex flex-col rounded-xl cursor-pointer transition-all duration-200 border-2 overflow-hidden shadow-sm hover:shadow-md",
            isSelected
              ? "border-primary ring-2 ring-primary/20 bg-white"
              : "border-[#E5E7EB] bg-white hover:border-[#DADADA]"
          )}
          onClick={() => onSelect(item.id)}
        >
          {/* Gradient Word Display */}
          <div className="relative w-full aspect-video bg-linear-to-br from-[#F7EFD0] to-[#FF96C7] flex items-center justify-center p-4">
            <h3 className="text-lg font-bold text-[#393737] text-center line-clamp-3">{flashcardItem.word}</h3>
          </div>

          {/* Definition and Reference */}
          <div className="p-3 flex flex-col gap-2">
            {flashcardItem.definition && (
              <p className="text-xs text-[#656A73] line-clamp-2">{flashcardItem.definition}</p>
            )}
            {flashcardItem.reference && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-medium text-[#6B7280]">{flashcardItem.reference}</span>
              </div>
            )}
          </div>

          {isSelected && (
            <div className="absolute top-2 right-2 z-20 animate-in zoom-in duration-300">
              <div className="bg-primary text-white rounded-full p-1 shadow-lg border-2 border-white font-bold">
                <Check className="h-3 w-3 stroke-[3px]" />
              </div>
            </div>
          )}
        </div>
      );
    }

    // Flashcard Group - Card with name, description, and flashcard count (matching mobile)
    if (type === "flashcardGroup") {
      const flashcardGroupItem = item as AdminFlashcardGroupSummary;

      return (
        <div
          key={item.id}
          className={cn(
            "relative flex flex-col rounded-xl cursor-pointer transition-all duration-200 border-2 overflow-hidden shadow-sm hover:shadow-md p-3 gap-2",
            isSelected
              ? "border-primary ring-2 ring-primary/20 bg-white"
              : "border-[#E5E7EB] bg-white hover:border-[#DADADA]"
          )}
          onClick={() => onSelect(item.id)}
        >
          <h3 className="text-sm font-bold text-[#393737] line-clamp-2">{flashcardGroupItem.name}</h3>
          {flashcardGroupItem.description && (
            <p className="text-xs text-[#656A73] line-clamp-2">{flashcardGroupItem.description}</p>
          )}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[10px] font-bold text-[#3B82F6] uppercase">
              {flashcardGroupItem.flashcardCount} Flashcards
            </span>
          </div>
          {isSelected && (
            <div className="absolute top-2 right-2 z-20 animate-in zoom-in duration-300">
              <div className="bg-primary text-white rounded-full p-1 shadow-lg border-2 border-white font-bold">
                <Check className="h-3 w-3 stroke-[3px]" />
              </div>
            </div>
          )}
        </div>
      );
    }

    // Fallback (should not reach here)
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle>{titles[type]}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#656A73] opacity-50" />
            <Input
              placeholder={placeholders[type]}
              className="h-10 pl-9"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[400px] px-4">
          <div
            className={cn(
              "gap-3 pb-4 grid",
              type === "quiz" && "grid-cols-1",
              type === "media" && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              type === "flashcard" && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
              type === "flashcardGroup" && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {items.map((item) => renderItem(item))}
          </div>
          <div ref={loadMoreRef} className="h-4" />
          {items.length === 0 && !isLoading && (
            <div className="py-12 text-center">
              <span className="text-xs text-[#656A73] font-bold">No items found</span>
            </div>
          )}
          {(isLoading || isFetchingNextPage) && (
            <div className="flex justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
