import type { QuestionOverride } from "@/resources/admin-quest/admin-quest.types";
import type { QuestionDifficulty } from "@/resources/admin-quiz";

export type QuizQuestionConfigForm = {
  questionOverrides: Array<{
    questionId: string;
    questionText: string;
    pointsOverride: number;
    difficultyOverride: QuestionDifficulty;
    defaultPoints: number;
    defaultDifficulty: QuestionDifficulty;
  }>;
};

export type QuizQuestionConfigDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizId: string;
  questionOverrides?: QuestionOverride[];
  onSave: (overrides: QuestionOverride[]) => void;
};
