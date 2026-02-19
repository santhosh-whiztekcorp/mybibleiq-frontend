import { AdminFlashcardListInput } from "@/resources/admin-flashcard";

export type AdminFlashcardSelectorProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  filters?: Omit<AdminFlashcardListInput, "page" | "pageSize" | "sort">;
};

export type SelectedFlashcard = {
  id: string;
  word: string;
  definition: string;
};
