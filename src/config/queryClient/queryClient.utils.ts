/* ---- Error Handler ---- */
export const handleMutationError = (error: unknown): void => {
  try {
    // Safely extract error message without triggering getters
    let errorMessage = "Unknown error";
    let errorStack: string | undefined;

    try {
      if (error instanceof Error) {
        errorMessage = String(error.message || "Error occurred");
        errorStack = error.stack;
      } else if (error && typeof error === "object") {
        // Safely access message property
        const errorObj = error as Record<string, unknown>;
        if ("message" in errorObj && typeof errorObj.message === "string") {
          errorMessage = errorObj.message;
        } else {
          errorMessage = String(error);
        }
      } else {
        errorMessage = String(error);
      }
    } catch {
      // If extracting error message fails, use fallback
      errorMessage = "Error occurred (unable to extract message)";
    }

    // Error handling logic can be extended here if needed
    // Currently just extracting the error message for potential future use
    void errorMessage;
    void errorStack;
  } catch {
    // If the handler itself fails, silently handle to prevent infinite recursion
  }
};
