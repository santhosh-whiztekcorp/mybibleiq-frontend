import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useForgotPassword, useForgotPasswordForm, useForgotPasswordStore } from "@/resources/auth";
import { ROUTES } from "@/constants/routes";
import type { ForgotPasswordInput } from "@/resources/auth";

export const useForgotPasswordPage = () => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForgotPasswordForm();
  const forgotPasswordMutation = useForgotPassword();
  const setEmail = useForgotPasswordStore((state) => state.setEmail);

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        setEmail(data.email);
        toast.success("Reset link sent! Please check your email.");
        router.push(ROUTES.RESET_PASSWORD);
      },
      onError: (error: unknown) => {
        if (axios.isAxiosError<{ message?: string }>(error)) {
          toast.error(error?.response?.data?.message || "Failed to send reset link. Please try again.");
        } else {
          toast.error("Failed to send reset link. Please try again.");
        }
      },
    });
  };

  return {
    control,
    handleSubmit,
    formState,
    onSubmit,
    isPending: forgotPasswordMutation.isPending,
  };
};
