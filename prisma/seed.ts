import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create sample users
  //make sure we seed it with all the actual login data 
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'arjun@example.com' },
      update: {},
      create: {
        clerkId: 'user_1',
        email: 'arjun@example.com',
        name: 'Arjun Sharma',
        branch: 'Computer Science',
        year: 4,
        subscriptionStatus: 'premium'
      }
    }),
    prisma.user.upsert({
      where: { email: 'priya@example.com' },
      update: {},
      create: {
        clerkId: 'user_2',
        email: 'priya@example.com',
        name: 'Priya Patel',
        branch: 'Information Technology',
        year: 3,
        subscriptionStatus: 'free'
      }
    }),
    prisma.user.upsert({
      where: { email: 'rohit@example.com' },
      update: {},
      create: {
        clerkId: 'user_3',
        email: 'rohit@example.com',
        name: 'Rohit Kumar',
        branch: 'Electronics',
        year: 4,
        subscriptionStatus: 'free'
      }
    }),
    prisma.user.upsert({
      where: { email: 'sneha@example.com' },
      update: {},
      create: {
        clerkId: 'user_4',
        email: 'sneha@example.com',
        name: 'Sneha Reddy',
        branch: 'Computer Science',
        year: 3,
        subscriptionStatus: 'premium'
      }
    })
  ])

  console.log('✅ Created users:', users.length)

  // Create sample questions
  const questions = [
    {
      text: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: 1,
      explanation: "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity.",
      tags: ["DSA", "Algorithms"],
      difficulty: "medium",
      company: "Google"
    },
    {
      text: "Which data structure uses LIFO principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: 1,
      explanation: "Stack follows Last In First Out (LIFO) principle where the last element added is the first one to be removed.",
      tags: ["DSA", "Data Structures"],
      difficulty: "easy"
    },
    {
      text: "What is the worst-case time complexity of Quick Sort?",
      options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
      answer: 1,
      explanation: "Quick Sort has O(n²) worst-case time complexity when the pivot is always the smallest or largest element.",
      tags: ["DSA", "Sorting"],
      difficulty: "medium",
      company: "Microsoft"
    },
    {
      text: "Which of the following is NOT a characteristic of a deadlock?",
      options: ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"],
      answer: 2,
      explanation: "No Preemption (not Preemption) is a condition for deadlock. Resources cannot be forcibly taken from processes.",
      tags: ["OS", "Deadlock"],
      difficulty: "hard",
      company: "Amazon"
    },
    {
      text: "What does ACID stand for in database systems?",
      options: [
        "Atomicity, Consistency, Isolation, Durability",
        "Accuracy, Consistency, Integrity, Durability", 
        "Atomicity, Concurrency, Isolation, Durability",
        "Accuracy, Concurrency, Integrity, Durability"
      ],
      answer: 0,
      explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability - the four key properties of database transactions.",
      tags: ["DBMS", "Transactions"],
      difficulty: "medium"
    },
    {
      text: "Which HTTP status code indicates 'Not Found'?",
      options: ["200", "404", "500", "403"],
      answer: 1,
      explanation: "HTTP status code 404 indicates that the requested resource was not found on the server.",
      tags: ["Web Development", "HTTP"],
      difficulty: "easy"
    },
    {
      text: "What is the space complexity of merge sort?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 2,
      explanation: "Merge sort requires O(n) additional space for the temporary arrays used during the merge process.",
      tags: ["DSA", "Sorting"],
      difficulty: "medium"
    },
    {
      text: "Which design pattern ensures a class has only one instance?",
      options: ["Factory", "Singleton", "Observer", "Strategy"],
      answer: 1,
      explanation: "The Singleton pattern ensures that a class has only one instance and provides global access to that instance.",
      tags: ["Design Patterns", "OOP"],
      difficulty: "easy"
    }
  ]

  const createdQuestions = await Promise.all(
    questions.map(question =>
      prisma.question.create({
        data: question
      })
    )
  )

  console.log('✅ Created questions:', createdQuestions.length)

  // Create sample quiz attempts
  const quizAttempts = []
  for (const user of users) {
    for (let i = 0; i < 5; i++) {
      const randomQuestion = createdQuestions[Math.floor(Math.random() * createdQuestions.length)]
      const userAnswer = Math.floor(Math.random() * 4)
      const isCorrect = userAnswer === randomQuestion.answer
      
      quizAttempts.push({
        userId: user.id,
        questionId: randomQuestion.id,
        userAnswer,
        isCorrect,
        score: isCorrect ? 10 : 0,
        timeSpent: Math.floor(Math.random() * 60) + 10
      })
    }
  }

  const createdAttempts = await Promise.all(
    quizAttempts.map(attempt =>
      prisma.quizAttempt.create({
        data: attempt
      })
    )
  )

  console.log('✅ Created quiz attempts:', createdAttempts.length)

  // Create leaderboard entries
  const leaderboardData = [
    { userId: users[0].id, points: 2450, streak: 15, badges: ["🏆 Champion", "🔥 Fire Streak", "🎯 Accuracy Master"] },
    { userId: users[1].id, points: 2380, streak: 12, badges: ["🥈 Runner-up", "📚 Knowledge Seeker"] },
    { userId: users[2].id, points: 2290, streak: 8, badges: ["🥉 Third Place", "💡 Problem Solver"] },
    { userId: users[3].id, points: 2150, streak: 6, badges: ["⭐ Rising Star"] }
  ]

  const leaderboardEntries = await Promise.all(
    leaderboardData.map((entry, index) =>
      prisma.leaderboard.create({
        data: {
          ...entry,
          rank: index + 1
        }
      })
    )
  )

  console.log('✅ Created leaderboard entries:', leaderboardEntries.length)

  // Create sample interview experiences
  const interviewExperiences = [
    {
      userId: users[0].id,
      company: "Google",
      role: "Software Engineer Intern",
      difficulty: "hard",
      outcome: "selected",
      experienceText: "The interview process was quite challenging but fair. Started with an online assessment focusing on DSA problems. The first round was a technical interview with coding questions on trees and graphs. Second round involved system design basics. HR round was straightforward. Overall, great experience!",
      tips: "Practice tree traversals and graph algorithms. Be prepared to explain your thought process clearly."
    },
    {
      userId: users[1].id,
      company: "Microsoft",
      role: "SDE Intern",
      difficulty: "medium",
      outcome: "selected",
      experienceText: "Microsoft interview was well-structured. Online test had 3 coding questions of medium difficulty. Technical rounds focused on problem-solving and coding. They also asked about projects and internship experiences. The interviewers were very friendly and helpful.",
      tips: "Focus on clean code and optimal solutions. Be ready to discuss your projects in detail."
    },
    {
      userId: users[2].id,
      company: "Amazon",
      role: "Software Development Engineer",
      difficulty: "hard",
      outcome: "rejected",
      experienceText: "Amazon interview was tough. The online assessment had 2 coding questions and some MCQs. Technical rounds were focused heavily on leadership principles and behavioral questions along with coding. I struggled with the system design round. Good learning experience overall.",
      tips: "Study Amazon's leadership principles thoroughly. Practice system design fundamentals."
    },
    {
      userId: users[3].id,
      company: "Meta",
      role: "Frontend Engineer Intern",
      difficulty: "medium",
      outcome: "pending",
      experienceText: "Meta interview focused heavily on frontend technologies and React. Had to solve coding problems related to DOM manipulation and React components. System design round was about designing a simple social media feed. Still waiting for the final result.",
      tips: "Brush up on React fundamentals and practice frontend system design questions."
    }
  ]

  const createdExperiences = await Promise.all(
    interviewExperiences.map(experience =>
      prisma.interviewExperience.create({
        data: experience
      })
    )
  )

  console.log('✅ Created interview experiences:', createdExperiences.length)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
