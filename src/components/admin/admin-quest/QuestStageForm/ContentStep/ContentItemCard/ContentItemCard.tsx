"use client";

import * as React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Play, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContentItemCard } from "./ContentItemCard.hooks";
import type { ContentItemCardProps } from "./ContentItemCard.types";

export function ContentItemCard(props: ContentItemCardProps) {
  const { item, index, onConfigure, onRemove } = props;
  const { type } = item;
  const { quiz, media, flashcard, flashcardGroup, displayTitle, points, difficultyOverride, isLoading } =
    useContentItemCard(props);

  if (isLoading) {
    return (
      <Card className="p-3 border-[#E2E8F0] bg-gray-50">
        <div className="animate-pulse h-6 bg-[#E2E8F0] rounded w-3/4" />
      </Card>
    );
  }

  const getTypeBadgeVariant = ():
    | "typeQuestion"
    | "typeIMAGE"
    | "typeVIDEO"
    | "typeAUDIO"
    | "typeFlashcard"
    | "typeFlashcardGroup" => {
    if (type === "quiz") return "typeQuestion";
    if (type === "flashcard") return "typeFlashcard";
    if (type === "flashcardGroup") return "typeFlashcardGroup";
    if (type === "media" && media) {
      if (media.type === "IMAGE") return "typeIMAGE";
      if (media.type === "VIDEO") return "typeVIDEO";
      if (media.type === "AUDIO") return "typeAUDIO";
    }
    return "typeQuestion";
  };

  const getTypeBadgeLabel = (): string => {
    if (type === "quiz") return "QUIZ";
    if (type === "flashcard") return "FLASHCARD";
    if (type === "flashcardGroup") return "FLASHCARD GROUP";
    if (type === "media" && media) return media.type;
    return "CONTENT";
  };

  return (
    <Card className="p-3 border-[#E2E8F0] bg-gray-50 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <span className="text-sm font-bold text-[#393737] shrink-0">{index + 1}.</span>
          <Badge variant={getTypeBadgeVariant()} className="text-[10px] shrink-0" size="sm">
            {getTypeBadgeLabel()}
          </Badge>
          {difficultyOverride && (
            <Badge
              variant={`difficulty${difficultyOverride}` as "difficultyEASY" | "difficultyMEDIUM" | "difficultyHARD"}
              className="text-[10px] shrink-0"
              size="sm"
            >
              {difficultyOverride}
            </Badge>
          )}
        </div>
        <div className="flex gap-1 shrink-0">
          <Button type="button" variant="actionEdit" size="sm" className="h-8 px-2 text-xs" onClick={onConfigure}>
            Configure
          </Button>
          <Button type="button" variant="actionDelete" size="sm" className="h-8 px-2 text-xs" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </div>

      {type === "media" && media?.type === "IMAGE" && (
        <div className="relative w-full h-24 rounded-lg overflow-hidden bg-[#F3F4F6]">
          <Image src={media.url} alt={displayTitle ?? ""} fill className="object-cover" sizes="200px" />
        </div>
      )}

      {type === "media" && media?.type === "VIDEO" && (
        <div className="relative w-full h-24 rounded-lg overflow-hidden bg-[#F3F4F6]">
          <Image src={media.url} alt={displayTitle ?? ""} fill className="object-cover" sizes="200px" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Play className="h-6 w-6 text-[#393737] fill-[#393737]" />
            </div>
          </div>
        </div>
      )}

      {type === "media" && media?.type === "AUDIO" && (
        <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-[#7C3AED]">
          <Music className="h-8 w-8 text-white" />
          <span className="text-sm font-bold text-white">AUDIO</span>
        </div>
      )}

      {type === "flashcard" && (
        <div
          className={cn(
            "p-3 rounded-lg bg-gradient-to-br from-[#F7EFD0] to-[#FF96C7] text-center",
            "text-lg font-semibold text-[#393737]"
          )}
        >
          {displayTitle}
        </div>
      )}

      {(type === "quiz" || type === "media" || type === "flashcardGroup") && (
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-bold text-[#393737] truncate min-w-0">{displayTitle ?? "Loading..."}</p>
          {type === "quiz" && quiz && (
            <>
              <Badge variant="question" className="text-[10px] shrink-0" size="sm">
                {quiz.totalQuestions} Questions
              </Badge>
              <Badge variant="point" className="text-[10px] shrink-0" size="sm">
                {quiz.totalPoints} pts
              </Badge>
            </>
          )}
        </div>
      )}

      {((type === "flashcard" && flashcard?.reference) ||
        (type === "flashcardGroup" && flashcardGroup) ||
        (points !== undefined && type !== "quiz")) && (
        <div className="flex flex-wrap gap-2 items-center">
          {type === "flashcard" && flashcard?.reference && (
            <span className="flex items-center gap-1 text-xs text-[#4E4E4E]">
              <BookOpen className="h-3.5 w-3.5" />
              {flashcard.reference}
            </span>
          )}
          {type === "flashcardGroup" && flashcardGroup && (
            <Badge variant="question" className="text-[10px] shrink-0" size="sm">
              {flashcardGroup.flashcards?.length ?? 0} Flashcards
            </Badge>
          )}
          {points !== undefined && (type === "media" || type === "flashcard" || type === "flashcardGroup") && (
            <Badge variant="point" className="text-[10px] shrink-0" size="sm">
              {points} pts
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
}
