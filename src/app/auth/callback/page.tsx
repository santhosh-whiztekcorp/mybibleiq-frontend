"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFinalizeOAuth } from "@/resources/auth/auth.hooks";
import { ROUTES } from "@/constants/routes";
import Toast from "@/lib/toast";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const finalizeOAuth = useFinalizeOAuth();

  const ephemeralCode = searchParams.get("ephemeralCode");
  const clientState = searchParams.get("clientState");
  const missingParams = !ephemeralCode || !clientState;

  const [apiError, setApiError] = useState<string | null>(null);

  const error = missingParams ? "Missing authentication parameters. Please try logging in again." : apiError;

  const hasCalledRef = useRef(false);

  // Handle redirect for missing parameters
  useEffect(() => {
    if (missingParams) {
      const timer = setTimeout(() => {
        router.replace("/auth/login");
        Toast.show({
          type: "error",
          text1: "Missing authentication parameters. Please try logging in again.",
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [missingParams, router]);

  useEffect(() => {
    if (missingParams || hasCalledRef.current) return;

    hasCalledRef.current = true;

    finalizeOAuth.mutate(
      { ephemeralCode: ephemeralCode!, clientState: clientState! },
      {
        onSuccess: () => {
          console.log("finalizeOAuth success");
          router.replace(ROUTES.SPIRIT_FOOD);
        },
        onError: (err: unknown) => {
          console.error("finalizeOAuth error", err);
          const errorMessage =
            (err as { response?: { data?: { message?: string }; message?: string } })?.response?.data?.message ||
            (err as Error)?.message ||
            "Authentication failed. Please try logging in again.";
          setApiError(errorMessage);
          setTimeout(() => {
            router.replace("/auth/login");
          }, 3000);
        },
      }
    );
  }, [ephemeralCode, clientState, finalizeOAuth, router, missingParams]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <p className="text-muted-foreground text-sm">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (finalizeOAuth.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Completing sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <OAuthCallbackContent />
    </Suspense>
  );
}
