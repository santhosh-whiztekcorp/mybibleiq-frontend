import { useMutation } from "@tanstack/react-query";
import Toast from "@/lib/toast";
import { getErrorMessage } from "@/utils/error";
import { submitFeedback } from "./user-feedback.api";
import type { SubmitFeedbackInput } from "./user-feedback.types";

/* ---- Query Keys ---- */
export const userFeedbackKeys = {
  all: ["user-feedback"] as const,
};

/* ---- Submit Feedback ---- */
export const useSubmitFeedback = () =>
  useMutation({
    mutationFn: (input: SubmitFeedbackInput) => submitFeedback(input),
    onSuccess: () => {
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Feedback submitted successfully",
          text2: "Thank you for your feedback!",
        });
      }, 0);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to submit feedback",
        text2: errorMessage || "Please try again later",
      });
    },
  });
