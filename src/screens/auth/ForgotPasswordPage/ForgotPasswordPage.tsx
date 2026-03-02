"use client";

import Image from "next/image";
import Link from "next/link";
import { pngIcons } from "@/assets";
import { InputController } from "@/components/form-controllers";
import { ROUTES } from "@/constants/routes";
import { useForgotPasswordPage } from "./ForgotPasswordPage.hooks";

export function ForgotPasswordPage() {
  const { control, handleSubmit, formState, onSubmit, isPending } = useForgotPasswordPage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5 py-5 font-plus-jakarta-sans">
      <div className="w-full max-w-[350px] space-y-4">
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
          <h1 className="text-2xl font-bold text-[#1f2937] font-plus-jakarta-sans">Forgot Password</h1>
          <p className="text-sm text-[#6b7280] font-plus-jakarta-sans">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          {/* Send Reset Link Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 text-sm font-semibold font-plus-jakarta-sans bg-black text-white hover:opacity-70 rounded-lg border-0 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="text-center">
          <Link
            href={ROUTES.LOGIN}
            className="text-sm text-[#1f2937] hover:underline font-plus-jakarta-sans font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
