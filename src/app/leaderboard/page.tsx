import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { LeaderboardTable } from '@/components/leaderboard-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'

// Mock data for development
const mockLeaderboardData = [
  {
    id: "user1",
    name: "Arjun Sharma",
    email: "arjun@example.com",
    points: 2450,
    streak: 15,
    badges: ["🏆 Champion", "🔥 Fire Streak", "🎯 Accuracy Master"],
    rank: 1,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "user2",
    name: "Priya Patel",
    email: "priya@example.com",
    points: 2380,
    streak: 12,
    badges: ["🥈 Runner-up", "📚 Knowledge Seeker"],
    rank: 2,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3e5?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "user3",
    name: "Rohit Kumar",
    email: "rohit@example.com",
    points: 2290,
    streak: 8,
    badges: ["🥉 Third Place", "💡 Problem Solver"],
    rank: 3,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "user4",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    points: 2150,
    streak: 6,
    badges: ["⭐ Rising Star"],
    rank: 4,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "user5",
    name: "Vikram Singh",
    email: "vikram@example.com",
    points: 2050,
    streak: 4,
    badges: ["🚀 Fast Learner"],
    rank: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
]

export default function LeaderboardPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Leaderboard 🏆</h1>
          <p className="text-muted-foreground">See how you rank among your peers</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Top Performers Cards */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <CardTitle className="text-lg">This Week's Champion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                  Arjun S.
                </div>
                <div className="text-sm text-muted-foreground">2,450 points</div>
                <Badge className="mt-2 bg-yellow-500 hover:bg-yellow-600">
                  🏆 Champion
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <CardTitle className="text-base">Most Improved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-green-600 dark:text-green-400 mb-1">
                  Sneha R.
                </div>
                <div className="text-xs text-muted-foreground">+450 points this week</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                <CardTitle className="text-base">Longest Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-1">
                  Arjun S.
                </div>
                <div className="text-xs text-muted-foreground">15 days</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Leaderboard */}
          <div className="lg:col-span-3">
            <LeaderboardTable entries={mockLeaderboardData} currentUserId="user4" />
            
            {/* Your Rank Card */}
            <Card className="mt-6 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Medal className="h-5 w-5 text-primary" />
                  <span>Your Performance</span>
                </CardTitle>
                <CardDescription>
                  Keep practicing to climb the leaderboard!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">#4</div>
                    <div className="text-sm text-muted-foreground">Current Rank</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">2,150</div>
                    <div className="text-sm text-muted-foreground">Total Points</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">6</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">300</div>
                    <div className="text-sm text-muted-foreground">Points to #3</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
