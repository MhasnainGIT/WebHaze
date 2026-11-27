import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn — Aceternity's class name merger.
 * Combines clsx (conditional classes) + tailwind-merge (deduplication).
 * Usage: cn('px-4 py-2', condition && 'bg-white', 'text-black')
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
