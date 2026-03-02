import z from "zod";
import {
  AuthClientSchema,
  AuthLoginInputSchema,
  AuthProviderEnum,
  AuthRegisterInputSchema,
  ForgotPasswordInputSchema,
  VerifyOTPInputSchema,
  OAuthFinalizeInputSchema,
  UserRoleEnum,
} from "./auth.schemas";

/* ---- Forgot Password Types ---- */
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordInputSchema>;
export type VerifyOTPInput = z.infer<typeof VerifyOTPInputSchema>;

/* ---- Base Types ---- */
export type UserRole = z.infer<typeof UserRoleEnum>;
export type User = {
  id: string;
  name?: string;
  username: string;
  email?: string;
  isGuest: boolean;
  role: UserRole;
  roles: UserRole[] | string[];
  createdAt: Date;
  updatedAt: Date;
};

/* ---- Auth Types ---- */
export type AuthClient = z.infer<typeof AuthClientSchema>;
export type AuthProvider = z.infer<typeof AuthProviderEnum>;

/* ---- Check Username ---- */
export type CheckUsernameResponse = {
  available: boolean;
};

/* ---- Login ---- */
export type AuthLoginInput = z.infer<typeof AuthLoginInputSchema>;
export type AuthLoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

/* ---- OAuth ---- */
export type OAuthInitiateResponse = {
  redirectUrl: string;
  clientState: string;
};
export type OAuthFinalizeInput = z.infer<typeof OAuthFinalizeInputSchema>;
export type OAuthFinalizeResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

/* ---- Register ---- */
export type AuthRegisterInput = z.infer<typeof AuthRegisterInputSchema>;
export type AuthRegisterResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

/* ---- Raw API Response Types (with nested tokens structure) ---- */
export type AuthLoginRawResponse = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export type OAuthFinalizeRawResponse = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export type AuthRegisterRawResponse = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

/* ---- Auth Store ---- */
export type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  deviceToken: string | null;
};

export type AuthActions = {
  setAuth: (user: User, accessToken: string, refreshToken: string) => Promise<void>;
  hydrate: (user: User, accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => Promise<void>;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setDeviceToken: (token: string | null) => void;
};

export type AuthStore = AuthState & AuthActions;

/* ---- Forgot Password Store ---- */
export type ForgotPasswordState = {
  email: string | null;
};

export type ForgotPasswordActions = {
  setEmail: (email: string | null) => void;
  clearEmail: () => void;
};

export type ForgotPasswordStore = ForgotPasswordState & ForgotPasswordActions;
