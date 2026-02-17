import { ListChecks, CheckCircle2, Combine, TextCursorInput, Type, ArrowUpDown, HelpCircle } from "lucide-react";
import { UseQuestionCardProps } from "./QuestionCard.types";
import { QUESTION_TYPE_LABELS } from "@/resources/admin-question";

export const useQuestionCard = (props: UseQuestionCardProps) => {
  const { item } = props;

  const TypeIcon =
    {
      MCQ: ListChecks,
      TRUE_FALSE: CheckCircle2,
      MATCH: Combine,
      FILL_BLANK: TextCursorInput,
      ONE_WORD: Type,
      ORDER: ArrowUpDown,
    }[item.type] || HelpCircle;

  const typeLabel = QUESTION_TYPE_LABELS[item.type] || item.type;

  const statusColor =
    {
      Published: "bg-[#A8E6CF] text-black border-[#A8E6CF]",
      Draft: "bg-[#E2E8F0] text-[#656A73] border-[#E2E8F0]",
      Archived: "bg-[#FFE1E1] text-[#A3131B] border-[#FFBDBD]",
    }[item.status] || "bg-gray-100 text-gray-800";

  const cardBgColor =
    {
      Published: "bg-green-50",
      Archived: "bg-red-50",
      Draft: "bg-gray-100",
    }[item.status] || "bg-white";

  const cardBorderColor =
    {
      Published: "border-green-200",
      Archived: "border-red-200",
      Draft: "border-gray-200",
    }[item.status] || "border-[#E2E8F0]";

  return {
    item,
    TypeIcon,
    typeLabel,
    statusColor,
    cardBgColor,
    cardBorderColor,
  };
};
