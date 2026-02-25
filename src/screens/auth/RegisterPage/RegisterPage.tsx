import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { pngIcons } from "@/assets";
import { FacebookIcon, GoogleIcon, AppleIcon, XIcon, LinkedinIcon, TiktokIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InputController, PasswordInputController, CheckboxController } from "@/components/form-controllers";
import { LegalModal } from "@/components/legal";
import { useRegisterPage } from "./RegisterPage.hooks";
import { ROUTES } from "@/constants/routes";

export function RegisterPage() {
  const { control, handleSubmit, formState, onSubmit, handleSocialLogin, isPending } = useRegisterPage();
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: "privacy" | "terms" }>({
    isOpen: false,
    type: "privacy",
  });

  const openLegalModal = (type: "privacy" | "terms") => {
    setLegalModal({ isOpen: true, type });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5 py-10 font-plus-jakarta-sans">
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
          <h1 className="text-2xl font-bold text-[#1f2937] font-plus-jakarta-sans">Create Account</h1>
          <p className="text-sm text-[#6b7280] font-plus-jakarta-sans">Register to get started with MyBibleIQ</p>
        </div>

        {/* Social Registration Buttons */}
        <div className="flex flex-col gap-3 md:flex-row md:justify-center">
          <button
            type="button"
            onClick={() => handleSocialLogin("facebook")}
            className="w-full md:w-[48px] md:h-[48px] h-12 rounded-full md:rounded-lg bg-[#3A63ED] border-[1.5px] border-[#3A63ED] flex items-center justify-center gap-3 md:gap-0 md:p-3 transition-opacity hover:opacity-70"
            aria-label="Sign up with Facebook"
          >
            <FacebookIcon width={24} height={24} className="text-white" />
            <span className="text-white font-medium font-nunito md:hidden">Sign up with Facebook</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="w-full md:w-[48px] md:h-[48px] h-12 rounded-full md:rounded-lg bg-white border-[1.5px] border-[#E5E7EB] flex items-center justify-center gap-3 md:gap-0 md:p-3 transition-opacity hover:opacity-70"
            aria-label="Sign up with Google"
          >
            <GoogleIcon width={24} height={24} />
            <span className="text-black font-medium font-nunito md:hidden">Sign up with Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("apple")}
            className="w-full md:w-[48px] md:h-[48px] h-12 rounded-full md:rounded-lg bg-black border-[1.5px] border-black flex items-center justify-center gap-3 md:gap-0 md:p-3 transition-opacity hover:opacity-70"
            aria-label="Sign up with Apple"
          >
            <AppleIcon width={24} height={24} className="text-white" />
            <span className="text-white font-medium font-nunito md:hidden">Sign up with Apple</span>
          </button>

          {/* Combined Social Buttons (Hidden on mobile span but handled by parent flex) */}
          <div className="flex gap-3 md:hidden">
            <button
              type="button"
              onClick={() => handleSocialLogin("twitter")}
              className="flex-1 h-[48px] rounded-lg bg-black border-[1.5px] border-black flex items-center justify-center p-3 transition-opacity hover:opacity-70"
              aria-label="Sign up with Twitter"
            >
              <XIcon width={24} height={24} className="text-white" />
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("linkedin")}
              className="flex-1 h-[48px] rounded-lg bg-[#008EE5] border-[1.5px] border-[#008EE5] flex items-center justify-center p-3 transition-opacity hover:opacity-70"
              aria-label="Sign up with LinkedIn"
            >
              <LinkedinIcon width={24} height={24} className="text-white" />
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("tiktok")}
              className="flex-1 h-[48px] rounded-lg bg-black border-[1.5px] border-black flex items-center justify-center p-3 transition-opacity hover:opacity-70"
              aria-label="Sign up with TikTok"
            >
              <TiktokIcon width={24} height={24} className="text-white" />
            </button>
          </div>

          {/* Desktop Inline Buttons */}
          <button
            type="button"
            onClick={() => handleSocialLogin("twitter")}
            className="hidden md:flex w-[48px] h-[48px] rounded-lg bg-black border-[1.5px] border-black items-center justify-center p-3 transition-opacity hover:opacity-70"
            aria-label="Sign up with Twitter"
          >
            <XIcon width={24} height={24} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("linkedin")}
            className="hidden md:flex w-[48px] h-[48px] rounded-lg bg-[#008EE5] border-[1.5px] border-[#008EE5] items-center justify-center p-3 transition-opacity hover:opacity-70"
            aria-label="Sign up with LinkedIn"
          >
            <LinkedinIcon width={24} height={24} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("tiktok")}
            className="hidden md:flex w-[48px] h-[48px] rounded-lg bg-black border-[1.5px] border-black items-center justify-center p-3 transition-opacity hover:opacity-70"
            aria-label="Sign up with TikTok"
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <InputController
            control={control}
            name="name"
            label="Full Name"
            variant="adminPrimary"
            placeholder="Enter full name"
            error={formState.errors.name?.message}
            className="font-plus-jakarta-sans"
          />

          {/* Username Field */}
          <InputController
            control={control}
            name="username"
            label="Username"
            variant="adminPrimary"
            placeholder="Pick a username"
            error={formState.errors.username?.message}
            className="font-plus-jakarta-sans"
          />

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
            <label className="text-sm font-medium text-black font-plus-jakarta-sans">Password</label>
            <PasswordInputController
              control={control}
              name="password"
              variant="adminPrimary"
              placeholder="Create password"
              error={formState.errors.password?.message}
              className="font-plus-jakarta-sans"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-black font-plus-jakarta-sans">Confirm Password</label>
            <PasswordInputController
              control={control}
              name="confirmPassword"
              variant="adminPrimary"
              placeholder="Confirm password"
              error={formState.errors.confirmPassword?.message}
              className="font-plus-jakarta-sans"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2 py-2">
            <CheckboxController control={control} name="terms" error={formState.errors.terms?.message} />
            <label htmlFor="terms" className="text-xs text-[#6b7280] font-medium leading-tight">
              I agree to MyBibleIQ{" "}
              <span onClick={() => openLegalModal("terms")} className="text-[#1877F2] hover:underline cursor-pointer">
                terms & condition
              </span>{" "}
              and{" "}
              <span onClick={() => openLegalModal("privacy")} className="text-[#1877F2] hover:underline cursor-pointer">
                privacy policy
              </span>
            </label>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full py-3 text-sm font-semibold font-plus-jakarta-sans bg-black text-white hover:opacity-70 rounded-lg border-0 transition-opacity"
            disabled={isPending}
          >
            {isPending ? "Creating account..." : "Register"}
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-[#6b7280] text-center font-medium font-plus-jakarta-sans">
          Already have an account?{" "}
          <Link href={ROUTES.LOGIN} className="text-[#1877F2] font-semibold hover:underline">
            Sign In
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
