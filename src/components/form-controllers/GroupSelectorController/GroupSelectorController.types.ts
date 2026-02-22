import { Control, FieldValues, Path } from "react-hook-form";

export type GroupSelectorControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
};
