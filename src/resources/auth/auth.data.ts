import { AuthLoginInput, AuthRegisterInput, OAuthFinalizeInput } from "./auth.types";

/* ---- Default Values ---- */
export const defaultLoginInput: AuthLoginInput = {
  email: "",
  password: "",
};

export const defaultRegisterInput: AuthRegisterInput = {
  username: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  client: "web",
  terms: false,
};

export const defaultOAuthFinalizeInput: OAuthFinalizeInput = {
  ephemeralCode: "",
  clientState: "",
};
