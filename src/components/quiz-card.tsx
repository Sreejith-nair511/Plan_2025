"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuizQuestion {
  id: string
  text: string
  options: string[]
  answer: number
  explanation?: string
}

interface QuizCardProps {
  question: QuizQuestion
  onAnswer: (questionId: string, selectedAnswer: number, isCorrect: boolean) => void
  timeLimit?: number
}

export function QuizCard({ question, onAnswer, timeLimit = 30 }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    setIsAnswered(true)
    
    const isCorrect = answerIndex === question.answer
    onAnswer(question.id, answerIndex, isCorrect)
  }

  const isCorrect = selectedAnswer === question.answer

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Quiz Question</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-base font-medium leading-relaxed">
          {question.text}
        </div>
        
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "w-full justify-start text-left h-auto p-4 whitespace-normal",
                selectedAnswer === index && showResult && isCorrect && "bg-green-50 border-green-500 text-green-700 dark:bg-green-950 dark:border-green-400 dark:text-green-300",
                selectedAnswer === index && showResult && !isCorrect && "bg-red-50 border-red-500 text-red-700 dark:bg-red-950 dark:border-red-400 dark:text-red-300",
                showResult && index === question.answer && selectedAnswer !== index && "bg-green-50 border-green-500 text-green-700 dark:bg-green-950 dark:border-green-400 dark:text-green-300"
              )}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
            >
              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && selectedAnswer === index && (
                  isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )
                )}
                {showResult && index === question.answer && selectedAnswer !== index && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>
            </Button>
          ))}
        </div>

        {showResult && question.explanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 mt-0.5">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div>
                <h4 className="font-medium mb-1">
                  {isCorrect ? "Correct!" : "Incorrect"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
