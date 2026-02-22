import type { ChatbotResponseDetail } from "@/resources/admin-chatbot";

export type ChatbotResponseCardProps = {
  item: ChatbotResponseDetail;
  onEdit?: (item: ChatbotResponseDetail) => void;
  onDelete?: (item: ChatbotResponseDetail) => void;
};
