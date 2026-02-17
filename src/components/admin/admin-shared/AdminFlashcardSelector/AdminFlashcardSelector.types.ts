export type AdminFlashcardSelectorProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
};

export type SelectedFlashcard = {
  id: string;
  word: string;
  definition: string;
};
