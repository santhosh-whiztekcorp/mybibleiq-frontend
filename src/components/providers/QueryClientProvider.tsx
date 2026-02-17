"use client";

import * as React from "react";
import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/config/queryClient";

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
}
