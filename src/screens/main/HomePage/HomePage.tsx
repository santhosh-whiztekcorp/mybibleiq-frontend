"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ROUTES } from "@/constants/routes";
import { pngIcons } from "@/assets";
import { useAuthStore } from "@/resources/auth/auth.hooks";

import { PageLoader } from "@/components/shared/PageLoader/PageLoader";

export function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuthStore();

  const isAdmin = user?.role === "admin" || (user?.roles && user.roles.includes("admin"));

  // S3 Fallback Prevention:
  // If the server returns index.html for a deeper route (e.g. /spirit-food-manager),
  // this component will mount. We must stop it from redirecting, otherwise it loops.
  if (typeof window !== 'undefined' && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
    // If we are on a route like /auth/callback, HomePage should NOT take over.
    console.warn("[HomePage] Loaded on non-root path:", window.location.pathname, "- Stopping execution context.");
    
    // Attempt to fix trailing slash issue for S3/CloudFront (directory/index.html resolution)
    if (!window.location.pathname.endsWith('/')) {
        console.log("[HomePage] Attempting trailing slash redirect fix...");
        const newUrl = window.location.pathname + '/' + window.location.search + window.location.hash;
        window.location.replace(newUrl);
        return null;
    }
    
    // If already has slash or fix failed, show nothing to avoid hydration mismatch loops
    return null; 
  }

  useEffect(() => {
    if (!isLoading && isAuthenticated && isAdmin) {
      console.log("HomePage: Redirecting to SPIRIT_FOOD", {
        path: window.location.pathname,
        isAuthenticated,
        isAdmin,
        isLoading
      });
      router.push(ROUTES.SPIRIT_FOOD);
    } else {
      console.log("HomePage: Did NOT redirect", {
        path: window.location.pathname,
        isAuthenticated,
        isAdmin,
        isLoading
      });
    }
  }, [isAuthenticated, isAdmin, router, isLoading]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated && isAdmin) {
    return null;
  }

  if (isAuthenticated && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        <div className="text-center w-full max-w-md space-y-6 sm:space-y-8">
          <Image
            src={pngIcons.logoColored}
            alt="App Logo"
            width={200}
            height={200}
            className="mx-auto w-32 sm:w-40 md:w-48 h-auto"
          />
          <Alert variant="destructive" className="w-max mx-auto">
            <AlertTitle className="font-plus-jakarta-sans">Access Denied</AlertTitle>
            <AlertDescription className="font-plus-jakarta-sans">
              You are not allowed to view admin features.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="text-center w-full max-w-md">
        <Image
          src={pngIcons.logoColored}
          alt="App Logo"
          width={200}
          height={200}
          className="mx-auto mb-8 sm:mb-12 w-32 sm:w-40 md:w-48 h-auto"
        />
        <div className="mb-2 sm:mb-6 text-center">
          <h1 className="text-lg sm:text-xl font-bold font-plus-jakarta-sans">Welcome</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-plus-jakarta-sans">Please sign in to continue</p>
        </div>
        <Button onClick={() => router.push(ROUTES.LOGIN)} className="w-46 font-plus-jakarta-sans">
          Sign In
        </Button>
      </div>
    </div>
  );
}
