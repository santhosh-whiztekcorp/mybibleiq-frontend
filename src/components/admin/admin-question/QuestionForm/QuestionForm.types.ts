import type { AdminQuestionDetail } from "@/resources/admin-question";

export type QuestionFormProps = {
  item?: AdminQuestionDetail | null;
  onSuccess?: () => void;
  onClose: () => void;
};

export type UseQuestionFormProps = QuestionFormProps;

// Form field error types
export type FieldError = {
  message?: string;
};

export type MCQFormErrors = {
  options?: Array<{
    text?: FieldError;
    isCorrect?: FieldError;
  }> & {
    root?: FieldError;
  };
};

export type FillBlankFormErrors = {
  blanks?: Array<{
    name?: FieldError;
    options?: Array<{
      text?: FieldError;
      isCorrect?: FieldError;
    }>;
  }>;
};

export type MatchingFormErrors = {
  pairs?: Array<{
    left?: FieldError;
    right?: FieldError;
  }>;
};

export type OneWordFormErrors = {
  answer?: FieldError;
  caseSensitive?: FieldError;
  allowTrim?: FieldError;
};

export type OrderFormErrors = {
  items?: Array<{
    text?: FieldError;
    order?: FieldError;
  }> & {
    root?: FieldError;
  };
};
