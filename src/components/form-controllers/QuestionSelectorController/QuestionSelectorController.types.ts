import { FieldValues, Path, Control } from "react-hook-form";
import { AdminQuestionListInput } from "@/resources/admin-question";

export type QuestionSelectorControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  filters?: Omit<AdminQuestionListInput, "page" | "pageSize" | "sort">;
};
