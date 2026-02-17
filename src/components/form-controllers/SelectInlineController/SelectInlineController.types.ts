import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { SelectInlineProps, SelectInlineOption } from "@/components/ui/select-inline";

export type SelectInlineControllerProps<T extends FieldValues> = Omit<
  SelectInlineProps,
  "value" | "onValueChange" | "id" | "aria-invalid" | "aria-describedby"
> & {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  error?: string;
  options: SelectInlineOption[];
  placeholder?: string;
};
