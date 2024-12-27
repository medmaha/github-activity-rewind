"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalyzedData } from "./types";
import { protectRequest } from "./req.middleware";
import { getAiPrompt } from "./aiPrompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAIInsights(userData: AnalyzedData) {
  try {
    protectRequest("AI");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = getAiPrompt(userData);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    try {
      const parsedData = JSON.parse(text.replace(/(```)/gi, ""));
      console.log("parsedData:", parsedData);
      return parsedData;
    } catch (error) {
      console.log("Error!", text);
    }

    return text;
  } catch (error) {
    console.error("Error generating AI insights:", error);
    throw error;
  }
}

const data = {
  summary:
    "This year has been marked by significant contributions to the `procurement-frontend` repository, showcasing a commitment to building robust and feature-rich applications. There's been consistent pushing of code, with a particular focus on refining UI, adding new features like the suppliers page, and enhancing the overall application architecture. The variety of commit messages indicates work across different areas of the application. Additionally there are contributions across different repositories.",
  YearlyOverview:
    "The year's activity includes numerous `PushEvent` actions, indicating frequent updates to the code base. Key areas of focus appear to be adding new modules, updating dependencies, refactoring UI components, and setting up authentication and onboarding features. The commits also highlight work on approval workflows and document generation. The diverse language usage also demonstrates versatility in programming.",
  mostSignificantAchievement:
    "The most significant achievement is the completion of the organization module MVP, which involved integrating several new dependencies, enhancing layout, improving UI components, and introducing features like PDF export in data tables. This demonstrates the ability to manage and deliver large features effectively.",
  areasForPotentialGrowth:
    "While the contributions are impressive, there's potential for growth in areas such as proactive contribution to open source projects beyond personal ones, more detailed commit messages and further exploration of diverse programming languages and technologies to broaden their skillset.",
  userStyle: {
    vibe: "A builder who focuses on functionality and continuous improvement.",
    superpower:
      "Quickly implementing new features and refactoring existing systems.",
    topQuote: "Always be building and learning.",
  },
  posts: {
    linkedPost:
      "Check out my latest Github activity! I've been busy building and pushing new features. Proud of the progress made. #Github #SoftwareDevelopment #OpenSource https://github.com/yourusername",
    twitterPost:
      "Diving deep into code! My recent GitHub activity includes new modules, UI enhancements, and more. Excited to share the progress! #CodeLife #TechUpdates https://github.com/yourusername",
    facebookPost:
      "Just wrapped up some serious coding sessions! Excited to share my GitHub contributions, including new features and bug fixes. Proud of the progress! #CodingJourney #TechCommunity https://github.com/yourusername",
    instagramPost:
      "Behind the scenes of my development work! Checkout my latest Github Activity. 💻✨ #dev #programming #tech https://github.com/yourusername",
  },
  encouragementText:
    "Keep up the great work! Your consistent contributions are making a real difference. Remember, every commit is a step forward!",
  motivationMessage:
    "Your dedication to building and improving is inspiring. Keep pushing, learning, and growing!",
};
