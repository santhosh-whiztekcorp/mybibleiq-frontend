import { AdminQuestionListInput } from "@/resources/admin-question";

export type AdminQuestionSelectorProps = {
  value: string[]; // array of question IDs
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  trigger?: React.ReactNode;
  filters?: Omit<AdminQuestionListInput, "page" | "pageSize" | "sort">;
};
