"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, Medal, Award } from 'lucide-react'

interface LeaderboardEntry {
  id: string
  name: string
  email: string
  points: number
  streak: number
  badges: string[]
  rank: number
  avatar?: string
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  currentUserId?: string
}

export function LeaderboardTable({ entries, currentUserId }: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-medium text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇 Champion"
      case 2:
        return "🥈 Runner-up"
      case 3:
        return "🥉 Third Place"
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5" />
          <span>Leaderboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center space-x-4 p-4 rounded-lg border transition-colors ${
                entry.id === currentUserId 
                  ? 'bg-primary/5 border-primary/20' 
                  : 'hover:bg-muted/50'
              }`}
            >
              <div className="flex-shrink-0 w-8 flex justify-center">
                {getRankIcon(entry.rank)}
              </div>
              
              <Avatar className="h-10 w-10">
                <AvatarImage src={entry.avatar} alt={entry.name} />
                <AvatarFallback>
                  {entry.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium truncate">
                    {entry.name}
                    {entry.id === currentUserId && (
                      <span className="ml-2 text-xs text-primary">(You)</span>
                    )}
                  </p>
                  {getRankBadge(entry.rank) && (
                    <Badge variant="secondary" className="text-xs">
                      {getRankBadge(entry.rank)}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {entry.points} points
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {entry.streak} day streak
                  </p>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="flex flex-wrap gap-1 justify-end">
                  {entry.badges.slice(0, 2).map((badge, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                  {entry.badges.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{entry.badges.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
