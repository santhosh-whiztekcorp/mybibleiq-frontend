"use client";

import Image from "next/image";
import Link from "next/link";
import { pngIcons } from "@/assets";
import { InputController, PasswordInputController } from "@/components/form-controllers";
import { ROUTES } from "@/constants/routes";
import { useResetPasswordPage } from "./ResetPasswordPage.hooks";

export function ResetPasswordPage() {
  const { control, handleSubmit, formState, onSubmit, email, isPending } = useResetPasswordPage();

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
          <h1 className="text-2xl font-bold text-[#1f2937] font-plus-jakarta-sans">Reset Password</h1>
          <p className="text-sm text-[#6b7280] font-plus-jakarta-sans">
            Enter the 6-digit code sent to {email || "your email"} and your new password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* OTP Token Field */}
          <InputController
            control={control}
            name="token"
            label="Verification Code"
            variant="adminPrimary"
            type="text"
            placeholder="Enter 6-digit code"
            error={formState.errors.token?.message}
            className="font-plus-jakarta-sans"
          />

          {/* New Password Field */}
          <PasswordInputController
            control={control}
            name="newPassword"
            label="New Password"
            variant="adminPrimary"
            placeholder="Enter new password"
            error={formState.errors.newPassword?.message}
            className="font-plus-jakarta-sans"
          />

          {/* Confirm Password Field */}
          <PasswordInputController
            control={control}
            name="confirmPassword"
            label="Confirm New Password"
            variant="adminPrimary"
            placeholder="Confirm new password"
            error={formState.errors.confirmPassword?.message}
            className="font-plus-jakarta-sans"
          />

          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 text-sm font-semibold font-plus-jakarta-sans bg-black text-white hover:opacity-70 rounded-lg border-0 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Resetting..." : "Reset Password"}
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
