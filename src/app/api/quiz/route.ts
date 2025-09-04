export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const topic = searchParams.get('topic') || 'DSA'
    const difficulty = searchParams.get('difficulty') || 'medium'
    const count = parseInt(searchParams.get('count') || '5')

    // Mock questions for local testing
    const mockQuestions = [
      {
        id: 'q1',
        text: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        answer: 1,
        explanation: 'Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity.'
      },
      {
        id: 'q2',
        text: 'Which data structure uses LIFO principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        answer: 1,
        explanation: 'Stack follows Last In First Out (LIFO) principle where the last element added is the first one to be removed.'
      },
      {
        id: 'q3',
        text: 'What is the worst-case time complexity of Quick Sort?',
        options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
        answer: 1,
        explanation: 'Quick Sort has O(n²) worst-case time complexity when the pivot is always the smallest or largest element.'
      },
      {
        id: 'q4',
        text: 'Which of the following is NOT a characteristic of a deadlock?',
        options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption', 'Circular Wait'],
        answer: 2,
        explanation: 'No Preemption (not Preemption) is a condition for deadlock. Resources cannot be forcibly taken from processes.'
      },
      {
        id: 'q5',
        text: 'What does ACID stand for in database systems?',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Accuracy, Consistency, Integrity, Durability', 
          'Atomicity, Concurrency, Isolation, Durability',
          'Accuracy, Concurrency, Integrity, Durability'
        ],
        answer: 0,
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability - the four key properties of database transactions.'
      }
    ]

    return Response.json({ 
      questions: mockQuestions.slice(0, count),
      topic,
      difficulty 
    })

  } catch (error) {
    console.error('Quiz API error:', error)
    return Response.json(
      { error: 'Failed to fetch quiz questions' },
      { status: 500 }
    )
  }
}
