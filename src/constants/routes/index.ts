export * from "./admin.routes";
export * from "./auth.routes";

import { ADMIN_ROUTES } from "./admin.routes";
import { AUTH_ROUTES } from "./auth.routes";

/* ---- All Routes ---- */
export const ROUTES = {
  HOME: "/",
  ...ADMIN_ROUTES,
  ...AUTH_ROUTES,
} as const;
