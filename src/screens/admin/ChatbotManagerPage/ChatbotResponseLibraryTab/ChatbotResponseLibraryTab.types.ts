import type { ChatbotResponseDetail } from "@/resources/admin-chatbot";

export type ChatbotResponseLibraryTabProps = {
  active?: boolean;
};

export type ChatbotResponseLibraryTabViewMode = "table" | "card";

export type UseChatbotResponseLibraryTabReturn = {
  responses: ChatbotResponseDetail[];
  total: number;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  filterStore: {
    category?: string;
    q?: string;
    page: number;
    pageSize: number;
  };
  categoryOptions: { value: string; label: string }[];
  handleSearchChange: (value: string) => void;
  handleCategoryChange: (value: string | undefined) => void;
  handleClearFilters: () => void;
  handleLoadMore: () => void;
  isFormOpen: boolean;
  editingResponse: ChatbotResponseDetail | null;
  handleCreate: () => void;
  handleEdit: (item: ChatbotResponseDetail) => void;
  handleCloseForm: () => void;
  handleFormSuccess: () => void;
  isConfirmOpen: boolean;
  deletingResponse: ChatbotResponseDetail | null;
  handleDelete: (item: ChatbotResponseDetail) => void;
  handleConfirmDelete: () => Promise<void>;
  handleCloseConfirm: () => void;
  isActionLoading: boolean;
};
