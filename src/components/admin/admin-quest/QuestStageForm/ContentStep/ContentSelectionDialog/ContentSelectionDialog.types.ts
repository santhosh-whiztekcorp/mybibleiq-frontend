import type { AdminQuizSummary } from "@/resources/admin-quiz";
import type { AdminMediaSummary } from "@/resources/admin-media";
import type { AdminFlashcardSummary } from "@/resources/admin-flashcard";
import type { AdminFlashcardGroupSummary } from "@/resources/admin-flashcard-group";

export type ContentType = "quiz" | "media" | "flashcard" | "flashcardGroup";

export type SelectableContentItem =
  | AdminQuizSummary
  | AdminMediaSummary
  | AdminFlashcardSummary
  | AdminFlashcardGroupSummary;

export type ContentSelectionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: ContentType;
  selectedIds: string[];
  onSelect: (id: string) => void;
};
