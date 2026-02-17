import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    if ("response" in error) {
      const axiosError = error as AxiosError<{ message?: string; error?: string }>;
      if (axiosError.response?.data) {
        const data = axiosError.response.data;
        // Try to get message from response data
        if (typeof data === "object" && data !== null) {
          if ("message" in data && typeof data.message === "string") {
            return data.message;
          }
          if ("error" in data && typeof data.error === "string") {
            return data.error;
          }
        }
      }
      return axiosError.response?.statusText || axiosError.message || "An error occurred";
    }
    return error.message;
  }

  return "An error occurred. Please try again.";
};
