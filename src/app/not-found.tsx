"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pngIcons } from "@/assets";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[slate-50] flex flex-col items-center justify-center p-4 text-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="relative z-10 max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-all duration-300 overflow-hidden p-4">
            <Image src={pngIcons.logoColored} alt="MyBibleIQ Logo" width={80} height={80} className="object-contain" />
          </div>
        </div>

        <h1 className="text-9xl font-bold text-slate-200 mb-2">404</h1>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-plus-jakarta">Lost in the right path?</h2>
        <p className="text-slate-600 mb-8 text-lg leading-relaxed px-4">
          Oops! The page you are looking for seems to have wandered off. Let&apos;s get you back to the wisdom center.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
          >
            <Link href="/">
              <MoveLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="rounded-full px-8 h-12 text-base font-semibold hover:bg-white/50 backdrop-blur-sm"
          >
            Contact Support
          </Button>
        </div>
      </div>

      <footer className="absolute bottom-8 text-slate-400 text-sm font-medium">
        &copy; {new Date().getFullYear()} MyBibleIQ. All rights reserved.
      </footer>
    </div>
  );
}
