import type { FieldValues, Path, Control } from "react-hook-form";
import type { AdminBadgeListInput } from "@/resources/admin-badge/admin-badge.types";

export type BadgeSelectorControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  filters?: Omit<AdminBadgeListInput, "page" | "pageSize" | "sort">;
};
