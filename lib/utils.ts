import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { playerData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Check if a player made the leaderboard
export const HighScore = (
  newScore: number,
  leaderboard: playerData[]
): boolean => {
  if(newScore === 0) return false;
  if (leaderboard.length < 10) return true;
  const lowest = Math.min(...leaderboard.map((e) => e.score));
  return newScore > lowest;
};

// Format date for display
  export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }