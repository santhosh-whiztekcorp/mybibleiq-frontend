/**
 * Shared UI types and components
 */

import { ElementType } from "react";

export type SelectOption = {
  label: string;
  value: string;
  icon?: ElementType<Record<string, unknown>>;
  iconColor?: string;
  disabled?: boolean;
};
