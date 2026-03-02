import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useVerifyOTP, useVerifyOTPForm, useForgotPasswordStore } from "@/resources/auth";
import { ROUTES } from "@/constants/routes";
import type { VerifyOTPInput } from "@/resources/auth";

export const useResetPasswordPage = () => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useVerifyOTPForm();
  const verifyOTPMutation = useVerifyOTP();
  const { email, clearEmail } = useForgotPasswordStore();

  const onSubmit = (data: VerifyOTPInput) => {
    verifyOTPMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Password reset successfully! Please sign in with your new password.");
        clearEmail();
        router.push(ROUTES.LOGIN);
      },
      onError: (error: unknown) => {
        if (axios.isAxiosError<{ message?: string }>(error)) {
          toast.error(
            error?.response?.data?.message || "Failed to reset password. Please check your token and try again."
          );
        } else {
          toast.error("Failed to reset password. Please check your token and try again.");
        }
      },
    });
  };

  return {
    control,
    handleSubmit,
    formState,
    onSubmit,
    email,
    isPending: verifyOTPMutation.isPending,
  };
};
