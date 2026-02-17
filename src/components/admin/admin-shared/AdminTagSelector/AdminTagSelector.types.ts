export type AdminTagSelectorProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
};

export type SelectedTag = {
  id: string;
  name: string;
  categoryColor?: string;
  categoryName?: string;
};
