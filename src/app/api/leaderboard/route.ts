import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get leaderboard data with user information
    const leaderboardEntries = await db.leaderboard.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            clerkId: true
          }
        }
      },
      orderBy: {
        points: 'desc'
      },
      take: 50
    })

    // Add rank to each entry
    const rankedEntries = leaderboardEntries.map((entry, index) => ({
      id: entry.user.id,
      clerkId: entry.user.clerkId,
      name: entry.user.name,
      email: entry.user.email,
      points: entry.points,
      streak: entry.streak,
      badges: entry.badges,
      rank: index + 1,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.user.name}`
    }))

    return NextResponse.json({ leaderboard: rankedEntries })

  } catch (error) {
    console.error('Leaderboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
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
    const { points, streak, badges } = body

    // Get user
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update leaderboard entry
    const leaderboard = await db.leaderboard.upsert({
      where: { userId: user.id },
      update: {
        points: points || undefined,
        streak: streak || undefined,
        badges: badges || undefined
      },
      create: {
        userId: user.id,
        points: points || 0,
        streak: streak || 0,
        badges: badges || []
      }
    })

    return NextResponse.json({ success: true, leaderboard })

  } catch (error) {
    console.error('Leaderboard update API error:', error)
    return NextResponse.json(
      { error: 'Failed to update leaderboard' },
      { status: 500 }
    )
  }
}
