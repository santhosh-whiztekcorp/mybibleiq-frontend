"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAdminMediaRequestSchema } from "@/resources/admin-media/admin-media.schemas";
import { useCreateAdminMedia, useUpdateAdminMedia } from "@/resources/admin-media/admin-media.hooks";
import type { CreateAdminMediaFormInput, CreateAdminMediaInput } from "@/resources/admin-media/admin-media.types";
import type { MediaFormProps } from "./MediaForm.types";

export const useMediaForm = ({ item, onSuccess }: MediaFormProps) => {
  const isEditMode = !!item;

  const createMutation = useCreateAdminMedia();
  const updateMutation = useUpdateAdminMedia();

  const defaultValues = useMemo(
    () => ({
      title: item?.title || "",
      type: item?.type || "IMAGE",
      caption: item?.caption || "",
      tags: item?.tags || [],
      sizeBytes: item?.sizeBytes || 0,
      duration: item?.duration,
      file: item?.url
        ? {
            uri: item.url,
            name: item.title,
            type: item.type === "IMAGE" ? "image/auto" : item.type === "AUDIO" ? "audio/auto" : "video/auto",
          }
        : undefined,
    }),
    [item]
  );

  const form = useForm<CreateAdminMediaFormInput>({
    resolver: zodResolver(CreateAdminMediaRequestSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      if (isEditMode && item) {
        await updateMutation.mutateAsync({
          id: item.id,
          input: data,
        });
      } else {
        // Create requires a file object
        if (!data.file) {
          form.setError("file", { type: "manual", message: "File is required" });
          return;
        }
        await createMutation.mutateAsync(data as unknown as CreateAdminMediaInput);
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
      // Error handled by mutation
    }
  });

  const isMutationLoading = createMutation.isPending || updateMutation.isPending;

  return {
    form,
    onSubmit,
    isMutationLoading,
    isEditMode,
  };
};
