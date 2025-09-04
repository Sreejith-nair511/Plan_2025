import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateQuizQuestions(topic: string, difficulty: 'easy' | 'medium' | 'hard', count: number = 5) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const prompt = `Generate ${count} multiple choice questions for ${topic} with ${difficulty} difficulty level.
  
  Format the response as a JSON array where each question has:
  - text: the question text
  - options: array of 4 options
  - answer: index of correct answer (0-3)
  - explanation: brief explanation of the correct answer
  
  Topics should be relevant to campus placements and technical interviews.
  
  Example format:
  [
    {
      "text": "What is the time complexity of binary search?",
      "options": ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      "answer": 1,
      "explanation": "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity."
    }
  ]`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Parse JSON response
    const questions = JSON.parse(text.replace(/```json\n?|\n?```/g, ''))
    return questions
  } catch (error) {
    console.error('Error generating quiz questions:', error)
    throw new Error('Failed to generate quiz questions')
  }
}

export async function generateExplanation(question: string, userAnswer: string, correctAnswer: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const prompt = `Provide a brief, encouraging explanation for this quiz question:
  
  Question: ${question}
  User's Answer: ${userAnswer}
  Correct Answer: ${correctAnswer}
  
  Keep the explanation under 100 words and focus on helping the user learn.`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating explanation:', error)
    return 'Great attempt! Keep practicing to improve your understanding.'
  }
}
