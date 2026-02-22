"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useChatbotConfig,
  useUpdateChatbotConfig,
  UpdateChatbotConfigRequestSchema,
  CHATBOT_PAGE_SLUG_OPTIONS,
  CHATBOT_PAGE_SLUG_LABELS,
} from "@/resources/admin-chatbot";
import type { ChatbotPageSlug, ChatbotPosition } from "@/resources/admin-chatbot";
import type { ChatbotConfigurationFormValues } from "./ChatbotConfigurationTab.types";

export function useChatbotConfigurationTab() {
  const { data: config, isLoading, refetch } = useChatbotConfig();
  const { mutate: updateConfig, isPending: isSaving } = useUpdateChatbotConfig();

  const [isLeftAvatarChangeMode, setIsLeftAvatarChangeMode] = useState(false);
  const [isRightAvatarChangeMode, setIsRightAvatarChangeMode] = useState(false);

  const form = useForm<ChatbotConfigurationFormValues>({
    resolver: zodResolver(UpdateChatbotConfigRequestSchema),
    defaultValues: {
      name: "",
      tagline: "",
      welcomeMessage: "",
      position: "BOTTOM_RIGHT",
      enabled: false,
      showOnPages: [],
      leftAvatar: undefined,
      rightAvatar: undefined,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty },
  } = form;

  const showOnPages = useWatch({ control, name: "showOnPages" });
  const position = useWatch({ control, name: "position" });
  const leftAvatar = useWatch({ control, name: "leftAvatar" });
  const rightAvatar = useWatch({ control, name: "rightAvatar" });

  useEffect(() => {
    if (!config) return;
    reset({
      name: config.name || "",
      tagline: config.tagline || "",
      welcomeMessage: config.welcomeMessage || "",
      position: config.position as ChatbotPosition,
      enabled: config.enabled,
      showOnPages: (config.showOnPages as ChatbotPageSlug[]) || [],
      leftAvatar: undefined,
      rightAvatar: undefined,
    });
    const timer = setTimeout(() => {
      setIsLeftAvatarChangeMode(false);
      setIsRightAvatarChangeMode(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [config, reset]);

  const leftAvatarPreview = useMemo(() => {
    if (leftAvatar instanceof File) return URL.createObjectURL(leftAvatar);
    return config?.leftAvatarUrl;
  }, [leftAvatar, config?.leftAvatarUrl]);

  const rightAvatarPreview = useMemo(() => {
    if (rightAvatar instanceof File) return URL.createObjectURL(rightAvatar);
    return config?.rightAvatarUrl;
  }, [rightAvatar, config?.rightAvatarUrl]);

  const pageOptions = useMemo(
    () =>
      CHATBOT_PAGE_SLUG_OPTIONS.map((page) => ({
        value: page,
        label: CHATBOT_PAGE_SLUG_LABELS[page as ChatbotPageSlug],
      })),
    []
  );

  const handleToggleShowOnPage = (page: ChatbotPageSlug) => {
    const current = showOnPages || [];
    const next = current.includes(page) ? current.filter((p: ChatbotPageSlug) => p !== page) : [...current, page];
    setValue("showOnPages", next as ChatbotPageSlug[], { shouldDirty: true, shouldValidate: true });
  };

  const handleSelectPosition = (next: ChatbotPosition) => {
    setValue("position", next, { shouldDirty: true, shouldValidate: true });
  };

  const handleSave = handleSubmit((data) => {
    updateConfig(data, {
      onSuccess: () => {
        refetch();
        setIsLeftAvatarChangeMode(false);
        setIsRightAvatarChangeMode(false);
      },
    });
  });

  const handleReset = () => {
    if (!config) return;
    reset({
      name: config.name || "",
      tagline: config.tagline || "",
      welcomeMessage: config.welcomeMessage || "",
      position: config.position as ChatbotPosition,
      enabled: config.enabled,
      showOnPages: (config.showOnPages as ChatbotPageSlug[]) || [],
      leftAvatar: undefined,
      rightAvatar: undefined,
    });
    setIsLeftAvatarChangeMode(false);
    setIsRightAvatarChangeMode(false);
  };

  return {
    form,
    control,
    isLoading,
    isSaving,
    hasChanges: isDirty,
    leftAvatarPreview,
    rightAvatarPreview,
    isLeftAvatarChangeMode,
    isRightAvatarChangeMode,
    setIsLeftAvatarChangeMode,
    setIsRightAvatarChangeMode,
    pageOptions,
    position,
    showOnPages,
    handleToggleShowOnPage,
    handleSelectPosition,
    handleSave,
    handleReset,
    setValue,
  };
}
