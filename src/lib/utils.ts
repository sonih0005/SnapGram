import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);

  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
  ];

  for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
          return count === 1 ? `1 ${interval.label} ago` : `${count} ${interval.label}s ago`;
      }
  }

  return 'just now';
}