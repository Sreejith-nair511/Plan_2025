import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function calculateStreak(attempts: { timestamp: Date }[]): number {
  if (attempts.length === 0) return 0
  
  const sortedAttempts = attempts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  let streak = 1
  let currentDate = new Date(sortedAttempts[0].timestamp)
  
  for (let i = 1; i < sortedAttempts.length; i++) {
    const prevDate = new Date(sortedAttempts[i].timestamp)
    const dayDiff = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (dayDiff === 1) {
      streak++
      currentDate = prevDate
    } else {
      break
    }
  }
  
  return streak
}

export function getBadgeForScore(score: number): string {
  if (score >= 90) return "🏆 Expert"
  if (score >= 80) return "🥇 Advanced"
  if (score >= 70) return "🥈 Intermediate"
  if (score >= 60) return "🥉 Beginner"
  return "📚 Learning"
}
