import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type CheckboxControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};
