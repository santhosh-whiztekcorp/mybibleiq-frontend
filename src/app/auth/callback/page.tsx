"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFinalizeOAuth } from "@/resources/auth/auth.hooks";
import { ROUTES } from "@/constants/routes";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const finalizeOAuth = useFinalizeOAuth();
  const [error, setError] = useState<string | null>(null);
  const hasCalledRef = useRef(false);

  useEffect(() => {
    const ephemeralCode = searchParams.get("ephemeralCode");
    const clientState = searchParams.get("clientState");

    console.log("OAuthCallbackContent mounted", { ephemeralCode, clientState });

    if (hasCalledRef.current) return;

    if (!ephemeralCode || !clientState) {
      console.log("Missing parameters");
      hasCalledRef.current = true;
      setError("Missing authentication parameters. Please try logging in again.");
      setTimeout(() => {
        router.replace("/auth/login");
      }, 3000);
      return;
    }

    console.log("Initiating finalizeOAuth");
    hasCalledRef.current = true;

    finalizeOAuth.mutate(
      { ephemeralCode, clientState },
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
          setError(errorMessage);
          setTimeout(() => {
            router.replace("/auth/login");
          }, 3000);
        },
      }
    );
  }, [searchParams, finalizeOAuth, router]);

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
