"use client";

import { useState } from "react";
import { useRegister, useRegisterForm } from "@/resources/auth/auth.hooks";
import { BASE_URL } from "@/config/apiClient/apiClient.constants";
import { endpoints } from "@/constants/endpoints";
import type { AuthRegisterInput } from "@/resources/auth/auth.types";

export function useRegisterPage() {
  const { control, handleSubmit, formState } = useRegisterForm();
  const { mutate: register, isPending } = useRegister();
  const [isOAuthPending, setIsOAuthPending] = useState(false);

  const onSubmit = (data: AuthRegisterInput) => {
    register(data);
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
