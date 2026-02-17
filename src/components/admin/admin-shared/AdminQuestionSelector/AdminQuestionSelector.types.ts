export type AdminQuestionSelectorProps = {
  value: string[]; // array of question IDs
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  trigger?: React.ReactNode;
};
