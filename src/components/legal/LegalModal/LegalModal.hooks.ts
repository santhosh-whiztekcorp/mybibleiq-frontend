import { useGetPrivacyPolicy, useGetTermsAndConditions } from "@/resources/user-settings";
import type { UseLegalModalProps } from "./LegalModal.types";

export const useLegalModal = ({ type }: UseLegalModalProps) => {
  const isPrivacy = type === "privacy";
  const { data: privacy, isLoading: isPrivacyLoading, error: privacyError } = useGetPrivacyPolicy();
  const { data: terms, isLoading: isTermsLoading, error: termsError } = useGetTermsAndConditions();

  const data = isPrivacy ? privacy : terms;
  const isLoading = isPrivacy ? isPrivacyLoading : isTermsLoading;
  const error = isPrivacy ? privacyError : termsError;

  return {
    data,
    isLoading,
    error,
    isPrivacy,
  };
};
