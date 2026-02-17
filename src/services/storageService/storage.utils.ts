/* ---- Utils ---- */
/**
 * Get a value from localStorage
 * @param key - The storage key
 * @returns The stored value or null if not found
 */
export const getValue = async (key: string): Promise<string | null> => {
  try {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting value for key "${key}":`, error);
    return null;
  }
};

/**
 * Set a value in localStorage
 * @param key - The storage key
 * @param value - The value to store
 */
export const setValue = async (key: string, value: string): Promise<void> => {
  try {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting value for key "${key}":`, error);
    throw error;
  }
};

/**
 * Remove a value from localStorage
 * @param key - The storage key to remove
 */
export const removeValue = async (key: string): Promise<void> => {
  try {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing value for key "${key}":`, error);
    throw error;
  }
};
