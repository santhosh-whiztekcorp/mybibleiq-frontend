import type { AdminTagListInput } from "@/resources/admin-tag/admin-tag.types";

export type AdminTagSelectorProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  filters?: Omit<AdminTagListInput, "page" | "pageSize" | "sort">;
};

export type SelectedTag = {
  id: string;
  name: string;
  categoryColor?: string;
  categoryName?: string;
};
