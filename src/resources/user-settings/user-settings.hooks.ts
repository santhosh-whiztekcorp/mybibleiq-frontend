import { useQuery } from "@tanstack/react-query";
import { getAboutInformation, getTermsAndConditions, getPrivacyPolicy } from "./user-settings.api";

/* ---- Query Keys ---- */
export const userSettingsKeys = {
  all: ["user-settings"] as const,
  detail: () => [...userSettingsKeys.all, "detail"] as const,
  about: () => [...userSettingsKeys.all, "about"] as const,
  terms: () => [...userSettingsKeys.all, "terms"] as const,
  privacy: () => [...userSettingsKeys.all, "privacy"] as const,
};

/* ---- Get About Information ---- */
export const useGetAboutInformation = () =>
  useQuery({
    queryKey: userSettingsKeys.about(),
    queryFn: () => getAboutInformation(),
  });

/* ---- Get Terms & Conditions ---- */
export const useGetTermsAndConditions = () =>
  useQuery({
    queryKey: userSettingsKeys.terms(),
    queryFn: () => getTermsAndConditions(),
  });

/* ---- Get Privacy Policy ---- */
export const useGetPrivacyPolicy = () =>
  useQuery({
    queryKey: userSettingsKeys.privacy(),
    queryFn: () => getPrivacyPolicy(),
  });
