import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { DatePicker, datePickerVariants } from "@/components/ui/date-picker";
import type { VariantProps } from "class-variance-authority";

export type DatePickerControllerProps<T extends FieldValues> = Omit<
  React.ComponentProps<typeof DatePicker>,
  "value" | "onChange" | "name"
> &
  VariantProps<typeof datePickerVariants> & {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    error?: string;
  };
