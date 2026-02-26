"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { pngIcons } from "@/assets";
import { FacebookIcon, GoogleIcon, AppleIcon, XIcon, LinkedinIcon, TiktokIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InputController, PasswordInputController } from "@/components/form-controllers";
import { LegalModal } from "@/components/legal";
import { useLoginPage } from "./LoginPage.hooks";
import { ROUTES } from "@/constants/routes";

export function LoginPage() {
  const { control, handleSubmit, formState, onSubmit, handleSocialLogin, isPending } = useLoginPage();
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: "privacy" | "terms" }>({
    isOpen: false,
    type: "privacy",
  });

  const openLegalModal = (type: "privacy" | "terms") => {
    setLegalModal({ isOpen: true, type });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5 py-5 font-plus-jakarta-sans">
      <div className="w-full max-w-[350px] space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image
            src={pngIcons.logoColored}
            alt="MyBibleIQ Logo"
            width={105}
            height={80}
            className="h-auto w-[105px] object-contain"
            priority
            quality={95}
          />
        </div>

        {/* Title and Subtitle */}
        <div className="text-center space-y-0.5">
          <h1 className="text-2xl font-bold text-[#1f2937] font-plus-jakarta-sans">Sign In</h1>
          <p className="text-sm text-[#6b7280] font-plus-jakarta-sans">Sign in to access the admin panel</p>
        </div>

        {/* Social Sign-in Buttons */}
        <div className="flex flex-col gap-3 md:flex-row md:justify-center">
          {/* Top 3 Buttons - Full Width on Mobile, Icon-Only on Desktop */}
          <button
            type="button"
            onClick={() => handleSocialLogin("facebook")}
            className="w-full md:w-[48px] md:h-[48px] h-12 rounded-full md:rounded-lg bg-[#3A63ED] border-[1.5px] border-[#3A63ED] flex items-center justify-center gap-3 md:gap-0 md:p-3 transition-opacity hover:opacity-70"
            aria-label="Sign in with Facebook"
          >
            <FacebookIcon width={24} height={24} className="text-white" />
            <span className="text-white font-medium font-nunito md:hidden">Sign in with Facebook</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="w-full md:w-[48px] md:h-[48px] h-12 rounded-full md:rounded-lg bg-white border-[1.5px] border-[#E5E7EB] flex items-center justify-center gap-3 md:gap-0 md:p-3 transition-opacity hover:opacity-70"
            aria-label="Sign in with Google"
          >
            <GoogleIcon width={24} height={24} />
            <span className="text-black font-medium font-nunito md:hidden">Sign in with Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("apple")}
            className="w-full md:w-[48px] md:h-[48px] h-12 rounded-full md:rounded-lg bg-black border-[1.5px] border-black flex items-center justify-center gap-3 md:gap-0 md:p-3 transition-opacity hover:opacity-70"
            aria-label="Sign in with Apple"
          >
            <AppleIcon width={24} height={24} className="text-white" />
            <span className="text-white font-medium font-nunito md:hidden">Sign in with Apple</span>
          </button>

          {/* Bottom 3 Buttons - Small Icon-Only, Horizontal on Mobile, Inline on Desktop */}
          <div className="flex gap-3 md:hidden">
            <button
              type="button"
              onClick={() => handleSocialLogin("twitter")}
              className="flex-1 h-[48px] rounded-lg bg-black border-[1.5px] border-black flex items-center justify-center p-3 transition-opacity hover:opacity-70"
              aria-label="Sign in with Twitter"
            >
              <XIcon width={24} height={24} className="text-white" />
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("linkedin")}
              className="flex-1 h-[48px] rounded-lg bg-[#008EE5] border-[1.5px] border-[#008EE5] flex items-center justify-center p-3 transition-opacity hover:opacity-70"
              aria-label="Sign in with LinkedIn"
            >
              <LinkedinIcon width={24} height={24} className="text-white" />
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("tiktok")}
              className="flex-1 h-[48px] rounded-lg bg-black border-[1.5px] border-black flex items-center justify-center p-3 transition-opacity hover:opacity-70"
              aria-label="Sign in with TikTok"
            >
              <TiktokIcon width={24} height={24} className="text-white" />
            </button>
          </div>

          {/* Desktop: Show bottom 3 buttons inline */}
          <button
            type="button"
            onClick={() => handleSocialLogin("twitter")}
            className="hidden md:flex w-[48px] h-[48px] rounded-lg bg-black border-[1.5px] border-black items-center justify-center p-3 transition-opacity hover:opacity-70"
            aria-label="Sign in with Twitter"
          >
            <XIcon width={24} height={24} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("linkedin")}
            className="hidden md:flex w-[48px] h-[48px] rounded-lg bg-[#008EE5] border-[1.5px] border-[#008EE5] items-center justify-center p-3 transition-opacity hover:opacity-70"
            aria-label="Sign in with LinkedIn"
          >
            <LinkedinIcon width={24} height={24} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("tiktok")}
            className="hidden md:flex w-[48px] h-[48px] rounded-lg bg-black border-[1.5px] border-black items-center justify-center p-3 transition-opacity hover:opacity-70"
            aria-label="Sign in with TikTok"
          >
            <TiktokIcon width={24} height={24} className="text-white" />
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <Separator className="border-gray-200" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-2 text-xs uppercase text-gray-500 font-plus-jakarta-sans">OR</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <InputController
            control={control}
            name="email"
            label="Email"
            variant="adminPrimary"
            type="email"
            placeholder="Enter your email"
            error={formState.errors.email?.message}
            className="font-plus-jakarta-sans"
          />

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-black font-plus-jakarta-sans">
                Password
              </label>
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-xs text-black hover:underline font-plus-jakarta-sans font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <PasswordInputController
              control={control}
              name="password"
              variant="adminPrimary"
              placeholder="Enter your password"
              error={formState.errors.password?.message}
              className="font-plus-jakarta-sans"
            />
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full py-3 text-sm font-semibold font-plus-jakarta-sans bg-black text-white hover:opacity-70 rounded-lg border-0 transition-opacity"
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Terms and Privacy */}
        <p className="text-xs text-[#6b7280] text-center leading-relaxed font-medium font-plus-jakarta-sans m-0">
          By clicking Sign in, Sign in with Apple, Google, Facebook, Twitter, Linkedin & Tiktok, you agree to MyBibleIQ{" "}
          <span
            onClick={() => openLegalModal("terms")}
            className="text-[#1877F2] underline hover:text-[#1877F2]/90 cursor-pointer"
          >
            terms & condition
          </span>{" "}
          and{" "}
          <span
            onClick={() => openLegalModal("privacy")}
            className="text-[#1877F2] underline hover:text-[#1877F2]/90 cursor-pointer"
          >
            privacy policy
          </span>
        </p>

        {/* Register Link */}
        <p className="text-sm text-[#6b7280] text-center font-medium font-plus-jakarta-sans mt-5">
          Don&apos;t have an account?{" "}
          <Link href={ROUTES.REGISTER} className="text-[#1877F2] font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>

      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
      />
    </div>
  );
}
