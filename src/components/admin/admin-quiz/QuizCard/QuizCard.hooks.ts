import { QuizCardProps } from "./QuizCard.types";
import { QUIZ_DIFFICULTY_LABELS } from "@/resources/admin-quiz/admin-quiz.constants";

export const useQuizCard = (props: QuizCardProps) => {
  const { item } = props;

  const cardBgColor =
    {
      Published: "bg-green-50",
      Archived: "bg-red-50",
      Draft: "bg-gray-100",
      Scheduled: "bg-yellow-50",
    }[item.status] || "bg-white";

  const cardBorderColor =
    {
      Published: "border-green-200",
      Archived: "border-red-200",
      Draft: "border-gray-200",
      Scheduled: "border-yellow-200",
    }[item.status] || "border-[#E2E8F0]";

  return {
    item,
    difficultyLabel: QUIZ_DIFFICULTY_LABELS[item.difficulty],
    cardBgColor,
    cardBorderColor,
  };
};
