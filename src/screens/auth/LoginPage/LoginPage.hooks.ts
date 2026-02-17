import { useState } from "react";
import { useLogin, useLoginForm } from "@/resources/auth/auth.hooks";
import { BASE_URL } from "@/config/apiClient/apiClient.constants";
import { endpoints } from "@/constants/endpoints";

export function useLoginPage() {
  const { control, handleSubmit, formState } = useLoginForm();
  const { mutate: login, isPending } = useLogin();
  const [isOAuthPending, setIsOAuthPending] = useState(false);

  const onSubmit = (data: { email: string; password: string }) => {
    login(data);
  };

  const handleSocialLogin = (provider: string) => {
    setIsOAuthPending(true);
    window.location.href = `${BASE_URL}${endpoints.oauth.initiate(provider)}?client=web`;
  };

  return {
    control,
    handleSubmit,
    formState,
    onSubmit,
    handleSocialLogin,
    isPending,
    isOAuthPending,
  };
}
