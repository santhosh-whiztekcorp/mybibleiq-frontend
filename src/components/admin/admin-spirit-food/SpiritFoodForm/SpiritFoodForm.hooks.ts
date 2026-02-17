import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { useCreateAdminSpiritFood, useUpdateAdminSpiritFood } from "@/resources/admin-spirit-food";
import { CreateAdminSpiritFoodRequestSchema } from "@/resources/admin-spirit-food/admin-spirit-food.schemas";
import type { CreateAdminSpiritFoodInput } from "@/resources/admin-spirit-food";
import type { SpiritFoodFormProps } from "./SpiritFoodForm.types";
import { mapSpiritFoodToForm, formatDateForSubmission, type SpiritFoodFormInput } from "./SpiritFoodForm.utils";
import { PREDEFINED_BIBLE_VERSIONS } from "./SpiritFoodForm.constants";
import { toast } from "sonner";

const SpiritFoodFormSchema = CreateAdminSpiritFoodRequestSchema.omit({ scheduledDate: true }).extend({
  scheduledDate: z
    .date({ message: "Scheduled date is required" })
    .nullable()
    .refine((val) => val !== null, {
      message: "Scheduled date is required",
    }),
});

type BibleVersionResponse = string[];

const fetchBibleVersions = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get<ApiResponseEnvelope<BibleVersionResponse>>(
      endpoints.config.getAvailableBibleVersions
    );
    if (response && "data" in response) {
      return Array.isArray(response.data) ? response.data : [];
    }
    return [];
  } catch {
    return [];
  }
};

export const useBibleVersions = () => {
  const { data: apiVersions, isLoading } = useQuery({
    queryKey: ["bible-versions"],
    queryFn: fetchBibleVersions,
    retry: false,
  });

  const bibleVersionOptions = useMemo(() => {
    if (apiVersions && apiVersions.length > 0) {
      return apiVersions.map((version) => ({
        value: version,
        label: version,
      }));
    }
    return PREDEFINED_BIBLE_VERSIONS;
  }, [apiVersions]);

  return {
    bibleVersionOptions,
    isLoading,
  };
};

export const useSpiritFoodForm = (props: SpiritFoodFormProps) => {
  const { mode, spiritFood, onClose, onSuccess } = props;
  const isEditMode = mode === "edit";
  const spiritFoodId = spiritFood?.id ?? "";

  const form = useForm<SpiritFoodFormInput>({
    resolver: zodResolver(SpiritFoodFormSchema),
    defaultValues: {
      scheduledDate: new Date(),
      verseReference: "",
      bibleVersion: "",
      verseText: "",
      reflectionText: undefined,
    },
    mode: "onChange",
  });

  const createMutation = useCreateAdminSpiritFood();
  const updateMutation = useUpdateAdminSpiritFood();

  const isMutationLoading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isEditMode && spiritFood) {
      try {
        form.reset(mapSpiritFoodToForm(spiritFood));
      } catch {
        // Error resetting form
      }
    } else {
      try {
        form.reset({
          scheduledDate: new Date(),
          verseReference: "",
          bibleVersion: "",
          verseText: "",
          reflectionText: undefined,
        });
      } catch {
        // Error resetting form
      }
    }
  }, [isEditMode, spiritFood, form]);

  const onSubmit = form.handleSubmit(
    (values: SpiritFoodFormInput) => {
      if (!values.scheduledDate) {
        toast.error("Validation error", {
          description: "Scheduled date is required",
        });
        return;
      }
      const submissionData: CreateAdminSpiritFoodInput = {
        ...values,
        scheduledDate: formatDateForSubmission(values.scheduledDate),
      };

      if (isEditMode && spiritFoodId) {
        updateMutation.mutate(
          { id: spiritFoodId, input: submissionData },
          {
            onSuccess: () => {
              onSuccess?.();
              onClose?.();
            },
          }
        );
      } else {
        createMutation.mutate(submissionData, {
          onSuccess: () => {
            onSuccess?.();
            onClose?.();
          },
        });
      }
    },
    (errors) => {
      const firstError = Object.values(errors)[0];
      if (firstError && typeof firstError === "object" && "message" in firstError) {
        toast.error("Validation error", {
          description: (firstError as { message: string }).message,
        });
      } else {
        toast.error("Validation error", {
          description: "Please fix the form errors before submitting",
        });
      }
    }
  );

  return {
    form,
    onSubmit,
    isEditMode,
    isMutationLoading,
    onClose,
  };
};
