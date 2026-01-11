/**
 * Utilities Index
 * 
 * Export all utility functions from this file for cleaner imports.
 * Example: import { cn, formatDate } from "@/utils";
 */

// Utility to merge class names (useful with Tailwind)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Export other utilities here as they are created
// export { formatDate } from "./date";
// export { debounce, throttle } from "./timing";

