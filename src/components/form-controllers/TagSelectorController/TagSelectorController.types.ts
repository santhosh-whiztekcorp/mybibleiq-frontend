import { Control, FieldValues, Path } from "react-hook-form";
import type { AdminTagListInput } from "@/resources/admin-tag/admin-tag.types";

export type TagSelectorControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  filters?: Omit<AdminTagListInput, "page" | "pageSize" | "sort">;
};
