import type { AdminMediaListInput } from "@/resources/admin-media/admin-media.types";

export type AdminMediaSelectorProps = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  filters?: Omit<AdminMediaListInput, "page" | "pageSize" | "sort">;
  gridCols?: number;
};
