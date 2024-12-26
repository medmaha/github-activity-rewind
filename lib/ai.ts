import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateAIInsights(userData: any) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `Generate insights and a creative summary for this GitHub user data:
    ${JSON.stringify(userData, null, 2)}
    
    Please provide:
    1. A brief overview of the user's GitHub activity in 2024
    2. Highlight their most significant achievements
    3. Suggest areas for potential growth or new challenges for 2025
    4. A creative "superpower" based on their activity (e.g., "Bug Squashing Pro", "Open Source Champion")
    5. A motivational quote related to their coding journey`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error('Error generating AI insights:', error)
    throw error
  }
}

