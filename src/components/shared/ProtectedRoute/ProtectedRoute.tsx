"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/resources/auth/auth.hooks";
import type { ProtectedRouteProps } from "./ProtectedRoute.types";

import { PageLoader } from "@/components/shared/PageLoader/PageLoader";

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }

    const isAdmin = user?.role === "admin" || (user?.roles && user.roles.includes("admin"));
    
    console.log("[ProtectedRoute] Check:", { 
       path: typeof window !== 'undefined' ? window.location.pathname : 'server',
       isAuthenticated, 
       isLoading, 
       isAdmin, 
       user 
    });

    if (!isAdmin) {
      console.warn("[ProtectedRoute] Access Denied. Redirecting to HOME in 100ms.");
      const timer = setTimeout(() => {
        router.push(ROUTES.HOME);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, user, router]);

  const isAdmin = user?.role === "admin" || (user?.roles && user.roles.includes("admin"));
  if (isLoading || !isAuthenticated || !isAdmin) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
