import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { ProgressTracker } from '@/components/progress-tracker'
import { QuizCard } from '@/components/quiz-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'

// Mock data for development
const mockQuizQuestion = {
  id: "1",
  text: "What is the time complexity of searching in a balanced binary search tree?",
  options: [
    "O(n)",
    "O(log n)",
    "O(n log n)",
    "O(1)"
  ],
  answer: 1,
  explanation: "In a balanced BST, the height is log n, so searching takes O(log n) time as we eliminate half the nodes at each level."
}

const mockUserStats = {
  streak: 5,
  totalQuestions: 120,
  correctAnswers: 96,
  badges: ["🏆 Expert", "🔥 Week Warrior", "🎯 Accuracy Master"],
  weeklyGoal: 50,
  weeklyProgress: 32
}

export default function Dashboard() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const handleQuizAnswer = (questionId: string, selectedAnswer: number, isCorrect: boolean) => {
    console.log('Quiz answer:', { questionId, selectedAnswer, isCorrect })
    // TODO: Implement API call to save quiz attempt
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-muted-foreground">Ready to continue your placement preparation journey?</p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-8">
          <ProgressTracker {...mockUserStats} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Quiz */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Daily Challenge</span>
                </CardTitle>
                <CardDescription>
                  Complete your daily quiz to maintain your streak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuizCard 
                  question={mockQuizQuestion} 
                  onAnswer={handleQuizAnswer}
                  timeLimit={30}
                />
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Completed DSA Quiz</p>
                      <p className="text-xs text-muted-foreground">Score: 8/10 • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Started OS Practice</p>
                      <p className="text-xs text-muted-foreground">5 questions completed • Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Shared Interview Experience</p>
                      <p className="text-xs text-muted-foreground">Google SDE Intern • 2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/quiz">
                    <Target className="h-4 w-4 mr-2" />
                    Start Practice Quiz
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/leaderboard">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Leaderboard
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/interviews">
                    <Calendar className="h-4 w-4 mr-2" />
                    Browse Experiences
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Google Campus Drive</p>
                      <p className="text-xs text-muted-foreground">Dec 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Microsoft Interview</p>
                      <p className="text-xs text-muted-foreground">Dec 20, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Amazon Assessment</p>
                      <p className="text-xs text-muted-foreground">Dec 25, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Streak */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Study Streak</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {mockUserStats.streak}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Days in a row
                  </p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full ${
                          i < mockUserStats.streak 
                            ? 'bg-green-500' 
                            : 'bg-muted'
                        }`}
                      />
                    ))}
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
