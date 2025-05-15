import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to merge class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}