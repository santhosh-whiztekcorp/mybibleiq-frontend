import { QueryClient } from "@tanstack/react-query";
import { STALE_TIME, GC_TIME, QUERY_RETRY, MUTATION_RETRY } from "./queryClient.constants";

/* ---- Query Client ---- */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
      retry: QUERY_RETRY,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
    mutations: {
      retry: MUTATION_RETRY,
    },
  },
});
