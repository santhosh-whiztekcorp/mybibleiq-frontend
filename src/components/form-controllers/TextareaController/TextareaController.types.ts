import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { Textarea, textareaVariants } from "@/components/ui/textarea";
import type { VariantProps } from "class-variance-authority";

export type TextareaControllerProps<T extends FieldValues> = Omit<
  React.ComponentProps<typeof Textarea>,
  "value" | "onChange" | "onBlur" | "name"
> &
  VariantProps<typeof textareaVariants> & {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    error?: string;
  };
