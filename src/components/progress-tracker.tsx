"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Flame, Trophy, Target, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProgressTrackerProps {
  streak: number
  totalQuestions: number
  correctAnswers: number
  badges: string[]
  weeklyGoal?: number
  weeklyProgress?: number
}

export function ProgressTracker({
  streak,
  totalQuestions,
  correctAnswers,
  badges,
  weeklyGoal = 50,
  weeklyProgress = 0
}: ProgressTrackerProps) {
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
  const goalProgress = Math.min((weeklyProgress / weeklyGoal) * 100, 100)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Streak Card */}
      <Card className={cn("relative overflow-hidden", streak > 7 && "streak-glow")}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <Flame className={cn("h-4 w-4", streak > 0 ? "text-orange-500" : "text-muted-foreground")} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{streak} days</div>
          <p className="text-xs text-muted-foreground">
            {streak > 0 ? "Keep it up! 🔥" : "Start your streak today!"}
          </p>
        </CardContent>
      </Card>

      {/* Accuracy Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{accuracy}%</div>
          <Progress value={accuracy} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {correctAnswers}/{totalQuestions} correct
          </p>
        </CardContent>
      </Card>

      {/* Weekly Goal Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weeklyProgress}/{weeklyGoal}</div>
          <Progress value={goalProgress} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round(goalProgress)}% completed
          </p>
        </CardContent>
      </Card>

      {/* Badges Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Achievements</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{badges.length}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {badges.slice(0, 3).map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
            {badges.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{badges.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
