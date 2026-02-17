import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { ReviewAction } from "@/screens/admin/SpiritFoodManagerPage/SpiritFoodManagerPage.types";
import type { AdminSpiritFoodSummary } from "@/resources/admin-spirit-food";
import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

const reviewSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export const useSpiritFoodReviewModal = (
  open: boolean,
  action: ReviewAction,
  item: AdminSpiritFoodSummary | null,
  onConfirm: (comment: string) => Promise<void>,
  onOpenChange: (open: boolean) => void
) => {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({ comment: "" });
    }
  }, [open, form]);

  const getTitle = () => {
    switch (action) {
      case "submit":
        return "Submit Spirit Food";
      case "approve":
        return "Approve Spirit Food";
      case "cancel":
        return "Cancel Review";
      case "request-delete":
        return "Request Deletion";
      case "approve-delete":
        return "Approve Deletion";
      case "cancel-delete":
        return "Cancel Deletion Request";
      default:
        return "Confirm Action";
    }
  };

  const getDescription = () => {
    if (!item) return "";
    const ref = item.verseReference;
    switch (action) {
      case "submit":
        return `Are you sure you want to submit "${ref}" for review?`;
      case "approve":
        return `Are you sure you want to approve "${ref}"?`;
      case "cancel":
        return `Are you sure you want to cancel the review for "${ref}"?`;
      case "request-delete":
        return `Are you sure you want to request deletion of "${ref}"?`;
      case "approve-delete":
        return `Are you sure you want to approve deletion of "${ref}"?`;
      case "cancel-delete":
        return `Are you sure you want to cancel the deletion request for "${ref}"?`;
      default:
        return "Please confirm this action.";
    }
  };

  const getButtonText = () => {
    switch (action) {
      case "submit":
        return "Submit";
      case "approve":
        return "Approve";
      case "cancel":
        return "Cancel Review";
      case "request-delete":
        return "Request Delete";
      case "approve-delete":
        return "Delete Permanently";
      case "cancel-delete":
        return "Cancel Request";
      default:
        return "Confirm";
    }
  };

  const getButtonVariant = (): VariantProps<typeof buttonVariants>["variant"] => {
    switch (action) {
      case "submit":
        return "actionPublish";
      case "approve":
        return "actionApprove";
      case "cancel":
        return "actionReject";
      case "request-delete":
        return "actionDelete";
      case "approve-delete":
        return "actionApprove";
      case "cancel-delete":
        return "actionReject";
      default:
        return "actionSubmit";
    }
  };

  const onFormSubmit = async (data: ReviewFormValues) => {
    await onConfirm(data.comment);
    onOpenChange(false);
  };

  return {
    form,
    getTitle,
    getDescription,
    getButtonText,
    getButtonVariant,
    onFormSubmit,
  };
};
