import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { generateExplanation } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { questionId, userAnswer, timeSpent } = body

    // Get the question from database
    const question = await db.question.findUnique({
      where: { id: questionId }
    })

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    const isCorrect = userAnswer === question.answer
    const score = isCorrect ? 10 : 0

    // Get or create user
    let user = await db.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      // Create user if doesn't exist
      user = await db.user.create({
        data: {
          clerkId: userId,
          email: 'user@example.com', // This should come from Clerk
          name: 'User', // This should come from Clerk
        }
      })
    }

    // Save quiz attempt
    const quizAttempt = await db.quizAttempt.create({
      data: {
        userId: user.id,
        questionId,
        userAnswer,
        isCorrect,
        score,
        timeSpent: timeSpent || 30
      }
    })

    // Update or create leaderboard entry
    const leaderboard = await db.leaderboard.upsert({
      where: { userId: user.id },
      update: {
        points: {
          increment: score
        }
      },
      create: {
        userId: user.id,
        points: score,
        streak: 1,
        badges: []
      }
    })

    // Generate explanation using AI
    let explanation = question.explanation
    if (!isCorrect && !explanation) {
      try {
        const options = question.options as string[]
        explanation = await generateExplanation(
          question.text,
          options[userAnswer],
          options[question.answer]
        )
      } catch (error) {
        console.error('Failed to generate explanation:', error)
        explanation = 'Keep practicing to improve your understanding!'
      }
    }

    return NextResponse.json({
      isCorrect,
      score,
      explanation,
      correctAnswer: question.answer,
      totalPoints: leaderboard.points
    })

  } catch (error) {
    console.error('Evaluate API error:', error)
    return NextResponse.json(
      { error: 'Failed to evaluate answer' },
      { status: 500 }
    )
  }
}
