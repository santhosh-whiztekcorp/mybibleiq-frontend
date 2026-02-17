import { storageService } from "@/services/storageService/storageService";
import { useAuthStore } from "./auth.hooks";

/* ---- Clear All Storage And State ---- */
export const clearAllStorageAndState = async (): Promise<void> => {
  // Clear storage
  await Promise.all([
    storageService.removeUserInfo(),
    storageService.removeAccessToken(),
    storageService.removeRefreshToken(),
  ]);

  // Clear auth store state
  const { clearAuth } = useAuthStore.getState();
  await clearAuth();
};
