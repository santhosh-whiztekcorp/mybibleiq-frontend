import type { ChatbotConversationSummary } from "@/resources/admin-chatbot/admin-chatbot.types";

export type ChatbotConversationDetailDrawerProps = {
  conversation: ChatbotConversationSummary | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
