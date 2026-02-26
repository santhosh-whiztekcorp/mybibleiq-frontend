"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { useRouter } from "next/navigation";
import { storageService } from "@/services/storageService/storageService";
import {
  checkUsername,
  finalizeOAuth,
  forgotPassword,
  initiateOAuth,
  loginUser,
  logoutUser,
  registerUser,
  verifyOTP,
} from "./auth.api";
import { defaultLoginInput, defaultRegisterInput } from "./auth.data";
import {
  AuthLoginInputSchema,
  AuthRegisterInputSchema,
  ForgotPasswordInputSchema,
  VerifyOTPInputSchema,
} from "./auth.schemas";
import { ROUTES } from "@/constants/routes";
import type {
  AuthLoginInput,
  AuthRegisterInput,
  ForgotPasswordInput,
  OAuthFinalizeInput,
  VerifyOTPInput,
  AuthStore,
  ForgotPasswordStore,
  User,
} from "./auth.types";

/* ---- Forgot Password ---- */
export const useForgotPassword = () =>
  useMutation({
    mutationFn: (input: ForgotPasswordInput) => forgotPassword(input),
  });

export const useForgotPasswordForm = () =>
  useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordInputSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

/* ---- Verify OTP & Reset Password ---- */
export const useVerifyOTP = () =>
  useMutation({
    mutationFn: (input: VerifyOTPInput) => verifyOTP(input),
  });

export const useVerifyOTPForm = () =>
  useForm<VerifyOTPInput>({
    resolver: zodResolver(VerifyOTPInputSchema),
    defaultValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

/* ---- Check Username ---- */
export const useCheckUsername = (username: string, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: ["check-username", username],
    queryFn: () => checkUsername(username),
    enabled: options?.enabled !== false && !!username && username.length >= 3,
  });

/* ---- Login ---- */
export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (input: AuthLoginInput) => loginUser(input),

    onSuccess: async (data) => {
      if (!data?.accessToken || !data?.refreshToken) {
        return;
      }

      // Save authentication details
      await setAuth(data.user, data.accessToken, data.refreshToken);

      toast.success("Welcome back!");

      // Navigate to home page
      router.push(ROUTES.HOME);
    },
    onError: (error: { response?: { data?: { message?: string } }; message?: string }) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to login. Please check your credentials.");
    },
  });
};

export const useLoginForm = () =>
  useForm<AuthLoginInput>({
    resolver: zodResolver(AuthLoginInputSchema),
    defaultValues: defaultLoginInput,
    mode: "onChange",
  });

/* ---- Register ---- */
export const useRegister = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (input: AuthRegisterInput) => registerUser(input),
    onSuccess: async (data) => {
      if (!data?.accessToken || !data?.refreshToken) {
        return;
      }

      await setAuth(data.user, data.accessToken, data.refreshToken);
      toast.success("Account created successfully!");
      router.push(ROUTES.HOME);
    },
    onError: (error: { response?: { data?: { message?: string } }; message?: string }) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to create account.");
    },
  });
};
export const useRegisterForm = () =>
  useForm({
    resolver: zodResolver(AuthRegisterInputSchema),
    defaultValues: defaultRegisterInput,
    mode: "onChange",
  });

/* ---- OAuth ---- */
export const useInitiateOAuth = (provider: string) =>
  useMutation({
    mutationFn: () => initiateOAuth(provider),
  });

export const useFinalizeOAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (input: OAuthFinalizeInput) => finalizeOAuth(input),
    onSuccess: async (data) => {
      await setAuth(data.user, data.accessToken, data.refreshToken);
      toast.success("Successfully signed in!");
    },
    onError: (error: { response?: { data?: { message?: string } }; message?: string }) => {
      toast.error(error?.response?.data?.message || error.message || "Authentication failed.");
    },
  });
};

/* ---- Logout ---- */
export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: async () => {
      await Promise.all([
        storageService.removeUserInfo(),
        storageService.removeAccessToken(),
        storageService.removeRefreshToken(),
      ]);
      toast.success("Logged out successfully");
      router.push(ROUTES.LOGIN);
    },
    onError: async () => {
      await Promise.all([
        storageService.removeUserInfo(),
        storageService.removeAccessToken(),
        storageService.removeRefreshToken(),
      ]);
      toast.success("Logged out successfully");
      router.push(ROUTES.LOGIN);
    },
  });
};

/* ---- Auth Store ---- */
export const useAuthStore = create<AuthStore>((set) => ({
  /* ---- State ---- */
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
  deviceToken: null,

  /* ---- Actions ---- */
  setAuth: async (user, accessToken, refreshToken) => {
    await Promise.all([
      storageService.saveUserInfo(user),
      storageService.saveAccessToken(accessToken),
      storageService.saveRefreshToken(refreshToken),
    ]);

    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setUser: async (user) => {
    await storageService.saveUserInfo(user);
    set({ user });
  },

  setTokens: async (accessToken, refreshToken) => {
    await Promise.all([storageService.saveAccessToken(accessToken), storageService.saveRefreshToken(refreshToken)]);

    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  clearAuth: async () => {
    await Promise.all([
      storageService.removeUserInfo(),
      storageService.removeAccessToken(),
      storageService.removeRefreshToken(),
    ]);

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  hydrate: (user: User, accessToken: string, refreshToken: string) => {
    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },
  setDeviceToken: (token) => {
    set({ deviceToken: token });
  },
}));

/* ---- Forgot Password Store ---- */
export const useForgotPasswordStore = create<ForgotPasswordStore>((set) => ({
  email: null,
  setEmail: (email) => set({ email }),
  clearEmail: () => set({ email: null }),
}));
