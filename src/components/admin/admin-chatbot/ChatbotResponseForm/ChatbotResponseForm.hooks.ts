import { useEffect, useMemo, useState } from "react";
import {
  CHATBOT_RESPONSE_CATEGORY_LABELS,
  CHATBOT_RESPONSE_CATEGORY_OPTIONS,
  defaultCreateResponseValues,
  useCreateResponseForm,
  useCreateChatbotResponse,
  useUpdateChatbotResponse,
} from "@/resources/admin-chatbot";
import type { ChatbotResponseCategory, CreateChatbotResponseInput } from "@/resources/admin-chatbot";
import type { UseChatbotResponseFormProps } from "./ChatbotResponseForm.types";

const CATEGORY_SELECT_OPTIONS = CHATBOT_RESPONSE_CATEGORY_OPTIONS.map((value) => ({
  value,
  label: CHATBOT_RESPONSE_CATEGORY_LABELS[value as ChatbotResponseCategory],
}));

export const useChatbotResponseForm = ({ mode, response, onClose, onSuccess }: UseChatbotResponseFormProps) => {
  const isEditMode = mode === "edit";

  const form = useCreateResponseForm();
  const { control, handleSubmit, setValue, watch } = form;

  const createMutation = useCreateChatbotResponse();
  const updateMutation = useUpdateChatbotResponse();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const keywords = watch("keywords") ?? [];
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    if (isEditMode && response) {
      form.reset({
        category: response.category,
        question: response.question,
        answer: response.answer,
        keywords: response.keywords,
        enabled: response.enabled,
      });
    } else {
      form.reset(defaultCreateResponseValues);
    }
  }, [form, isEditMode, response]);

  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim();
    if (!trimmed) return;
    if (keywords.includes(trimmed)) {
      setKeywordInput("");
      return;
    }
    setValue("keywords", [...keywords, trimmed], { shouldDirty: true, shouldValidate: true });
    setKeywordInput("");
  };

  const handleRemoveKeyword = (value: string) => {
    setValue(
      "keywords",
      (keywords || []).filter((k) => k !== value),
      { shouldDirty: true, shouldValidate: true }
    );
  };

  const handleSave = handleSubmit(async (values: CreateChatbotResponseInput) => {
    if (isEditMode && response) {
      await updateMutation.mutateAsync({ id: response.id, input: values });
    } else {
      await createMutation.mutateAsync(values);
    }
    onSuccess?.();
  });

  const handleCancel = () => {
    onClose?.();
  };

  const keywordHelpText = useMemo(() => {
    if (keywords.length === 0) return "Add at least one keyword";
    return `${keywords.length} keyword${keywords.length === 1 ? "" : "s"}`;
  }, [keywords.length]);

  return {
    form,
    control,
    isEditMode,
    isLoading,
    categoryOptions: CATEGORY_SELECT_OPTIONS,
    handleSave,
    handleCancel,
    keywords,
    keywordInput,
    setKeywordInput,
    handleAddKeyword,
    handleRemoveKeyword,
    keywordHelpText,
  };
};
