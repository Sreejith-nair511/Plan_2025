import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Building2, Calendar, ThumbsUp, MessageSquare, Plus } from 'lucide-react'
import Link from 'next/link'

// Mock data for development
const mockInterviewExperiences = [
  {
    id: "1",
    user: {
      name: "Arjun Sharma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    company: "Google",
    role: "Software Engineer Intern",
    difficulty: "hard",
    outcome: "selected",
    experienceText: "The interview process was quite challenging but fair. Started with an online assessment focusing on DSA problems. The first round was a technical interview with coding questions on trees and graphs. Second round involved system design basics. HR round was straightforward. Overall, great experience!",
    tips: "Practice tree traversals and graph algorithms. Be prepared to explain your thought process clearly.",
    createdAt: new Date('2024-01-15'),
    likes: 24
  },
  {
    id: "2",
    user: {
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3e5?w=150&h=150&fit=crop&crop=face"
    },
    company: "Microsoft",
    role: "SDE Intern",
    difficulty: "medium",
    outcome: "selected",
    experienceText: "Microsoft interview was well-structured. Online test had 3 coding questions of medium difficulty. Technical rounds focused on problem-solving and coding. They also asked about projects and internship experiences. The interviewers were very friendly and helpful.",
    tips: "Focus on clean code and optimal solutions. Be ready to discuss your projects in detail.",
    createdAt: new Date('2024-01-10'),
    likes: 18
  },
  {
    id: "3",
    user: {
      name: "Rohit Kumar",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    company: "Amazon",
    role: "Software Development Engineer",
    difficulty: "hard",
    outcome: "rejected",
    experienceText: "Amazon interview was tough. The online assessment had 2 coding questions and some MCQs. Technical rounds were focused heavily on leadership principles and behavioral questions along with coding. I struggled with the system design round. Good learning experience overall.",
    tips: "Study Amazon's leadership principles thoroughly. Practice system design fundamentals.",
    createdAt: new Date('2024-01-08'),
    likes: 12
  }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

const getOutcomeColor = (outcome: string) => {
  switch (outcome) {
    case 'selected': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

export default function InterviewExperiencesPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Interview Experiences 💼</h1>
            <p className="text-muted-foreground">Learn from real interview experiences shared by your peers</p>
          </div>
          <Button asChild>
            <Link href="/interviews/new">
              <Plus className="h-4 w-4 mr-2" />
              Share Experience
            </Link>
          </Button>
        </div>

        {/* Filter Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter Experiences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                All Companies
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Google
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Microsoft
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Amazon
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Meta
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Netflix
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Interview Experiences */}
        <div className="space-y-6">
          {mockInterviewExperiences.map((experience) => (
            <Card key={experience.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={experience.user.avatar} alt={experience.user.name} />
                      <AvatarFallback>
                        {experience.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{experience.user.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          <Building2 className="h-3 w-3 mr-1" />
                          {experience.company}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{experience.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(experience.difficulty)}>
                      {experience.difficulty}
                    </Badge>
                    <Badge className={getOutcomeColor(experience.outcome)}>
                      {experience.outcome}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Experience</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {experience.experienceText}
                    </p>
                  </div>
                  
                  {experience.tips && (
                    <div>
                      <h4 className="font-medium mb-2">Tips</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {experience.tips}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{experience.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {experience.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline">Load More Experiences</Button>
        </div>
      </div>
    </div>
  )
}
