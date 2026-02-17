import type { AdminBadgeListInput } from "@/resources/admin-badge/admin-badge.types";

export type AdminBadgeSelectorProps = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  filters?: Omit<AdminBadgeListInput, "page" | "pageSize" | "sort">;
};
