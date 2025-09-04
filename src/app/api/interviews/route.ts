import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const company = searchParams.get('company')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const whereClause = company ? { company: { contains: company, mode: 'insensitive' as any } } : {}

    const interviews = await db.interviewExperience.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })

    const total = await db.interviewExperience.count({ where: whereClause })

    const formattedInterviews = interviews.map(interview => ({
      id: interview.id,
      user: {
        name: interview.user.name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${interview.user.name}`
      },
      company: interview.company,
      role: interview.role,
      difficulty: interview.difficulty,
      outcome: interview.outcome,
      experienceText: interview.experienceText,
      tips: interview.tips,
      createdAt: interview.createdAt,
      likes: Math.floor(Math.random() * 50) // Mock likes for now
    }))

    return NextResponse.json({
      interviews: formattedInterviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Interviews API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch interview experiences' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { company, role, difficulty, outcome, experienceText, tips } = body

    // Validate required fields
    if (!company || !role || !difficulty || !outcome || !experienceText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get user
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

    // Create interview experience
    const interview = await db.interviewExperience.create({
      data: {
        userId: user.id,
        company,
        role,
        difficulty,
        outcome,
        experienceText,
        tips: tips || null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      interview: {
        id: interview.id,
        user: {
          name: interview.user.name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${interview.user.name}`
        },
        company: interview.company,
        role: interview.role,
        difficulty: interview.difficulty,
        outcome: interview.outcome,
        experienceText: interview.experienceText,
        tips: interview.tips,
        createdAt: interview.createdAt
      }
    })

  } catch (error) {
    console.error('Create interview API error:', error)
    return NextResponse.json(
      { error: 'Failed to create interview experience' },
      { status: 500 }
    )
  }
}
