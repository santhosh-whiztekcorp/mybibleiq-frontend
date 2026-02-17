"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/resources/auth/auth.hooks";
import { storageService } from "@/services/storageService/storageService";

import { PageLoader } from "@/components/shared/PageLoader/PageLoader";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, hydrate, setLoading } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const [userInfo, accessToken, refreshToken] = await Promise.all([
          storageService.getUserInfo(),
          storageService.getAccessToken(),
          storageService.getRefreshToken(),
        ]);

        if (userInfo && accessToken && refreshToken) {
          hydrate(userInfo, accessToken, refreshToken);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        setLoading(false);
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
