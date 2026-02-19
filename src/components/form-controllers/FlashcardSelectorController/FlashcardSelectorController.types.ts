import { AdminFlashcardListInput } from "@/resources/admin-flashcard";
import { FieldValues, Path, Control } from "react-hook-form";

export type FlashcardSelectorControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  filters?: Omit<AdminFlashcardListInput, "page" | "pageSize" | "sort">;
};
