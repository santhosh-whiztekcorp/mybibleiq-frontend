import type { FieldValues, Path, Control } from "react-hook-form";
import type { AdminMediaListInput } from "@/resources/admin-media/admin-media.types";

export type MediaSelectorControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  filters?: Omit<AdminMediaListInput, "page" | "pageSize" | "sort">;
  gridCols?: number;
};
