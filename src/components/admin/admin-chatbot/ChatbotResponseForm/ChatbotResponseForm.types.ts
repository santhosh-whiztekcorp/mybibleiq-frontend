import type { ChatbotResponseDetail } from "@/resources/admin-chatbot";

export type ChatbotResponseFormMode = "create" | "edit";

export type ChatbotResponseFormProps = {
  mode: ChatbotResponseFormMode;
  response?: ChatbotResponseDetail;
  onClose?: () => void;
  onSuccess?: () => void;
};

export type UseChatbotResponseFormProps = ChatbotResponseFormProps;
