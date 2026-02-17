import type { AdminTagSummary } from "@/resources/admin-tag";

export type TagFormProps = {
  mode: "create" | "edit";
  tag?: AdminTagSummary;
  onClose?: () => void;
  onSuccess?: () => void;
};

export type UseTagFormProps = TagFormProps;
