export type ChatbotTab = "analytics" | "configuration" | "logs" | "quick-actions" | "library";

export type ChatbotManagerPageProps = Record<string, never>;

export type ChatbotTabProps = {
  active?: boolean;
};
