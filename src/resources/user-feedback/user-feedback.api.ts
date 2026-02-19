import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { SubmitFeedbackInput, FeedbackResponse } from "./user-feedback.types";

/* ---- Submit Feedback ---- */
export const submitFeedback = async (input: SubmitFeedbackInput): Promise<FeedbackResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<FeedbackResponse>>(endpoints.feedbackUser.submit, input);
  return response.data;
};
