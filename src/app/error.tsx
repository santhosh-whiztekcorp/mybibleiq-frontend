"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { pngIcons } from "@/assets";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[35%] h-[35%] bg-red-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[10%] left-[10%] w-[35%] h-[35%] bg-orange-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="relative bg-gray-100 z-10 max-w-lg w-full border p-5 py-9 rounded-[2.5rem] shadow-slate-200/50 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center p-4">
              <Image
                src={pngIcons.logoColored}
                alt="MyBibleIQ Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 animate-bounce duration-2000 shadow-lg border-2 border-white">
              <AlertTriangle size={20} />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-3 font-plus-jakarta tracking-tight">
          Something went wrong
        </h1>
        <p className="text-slate-600 mb-10 text-lg leading-relaxed px-2">
          An unexpected error occurred while processing your request. Our team has been notified.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => reset()}
            size="lg"
            className="w-full sm:w-auto rounded-xl px-10 h-14 text-base font-bold bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all hover:-translate-y-1"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-xl px-10 h-14 text-base font-bold border-slate-200 hover:bg-white transition-all hover:-translate-y-1"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Technical help for developers in non-prod (optional) */}
        {process.env.NODE_ENV !== "production" && (
          <div className="mt-10 p-4 bg-red-50/50 border border-red-100 rounded-xl text-left overflow-auto max-h-32 scrollbar-hide">
            <p className="text-xs font-mono text-red-800 uppercase tracking-widest mb-2 opacity-60">Error Detail</p>
            <p className="text-[11px] font-mono text-red-700 leading-tight">
              {error.message || "Unknown error occurred"}
            </p>
          </div>
        )}
      </div>

      <p className="absolute bottom-8 text-slate-400 text-xs font-semibold">MyBibleIQ</p>
    </div>
  );
}
