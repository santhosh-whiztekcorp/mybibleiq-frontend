/**
 * File utility functions
 */

/**
 * Check if a value is a React Native file object
 */
export function isReactNativeFile(value: unknown): boolean {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    value !== null &&
    "uri" in value &&
    "type" in value &&
    "name" in value
  );
}
