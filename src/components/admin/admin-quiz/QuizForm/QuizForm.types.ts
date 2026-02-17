import type { Control, Path } from "react-hook-form";
import type { AdminQuizDetail, CreateAdminQuizInput } from "@/resources/admin-quiz/admin-quiz.types";

export type QuizFormProps = {
  item?: AdminQuizDetail;
  onSuccess?: () => void;
  onClose?: () => void;
};

export type RadioOptionProps = {
  id: string;
  value: string;
  label: string;
  description?: string;
  selected: boolean;
  onSelect?: (value: string) => void;
};

export type GameModeCardProps = {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  control: Control<CreateAdminQuizInput>;
  name: Path<CreateAdminQuizInput>;
  onToggle: () => void;
};
