import { ROUTES } from "@/constants/routes";

/* ---- Navigation Service ---- */
export const navigationService = {
  isReady: (): boolean => {
    return typeof window !== "undefined";
  },

  resetToAuth: (): void => {
    if (typeof window !== "undefined") {
      window.location.href = ROUTES.LOGIN;
    }
  },
};
