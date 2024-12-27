import { AnalyzedData } from "./types";

const rewindLink = "https://github-r.vercel.app";

export function getAiPrompt(data: AnalyzedData) {
  const year = new Date().getFullYear();
  const nextYear = year + 1;
  const [linkedin, twitter, facebook, instagram] = getPostsSample(
    year,
    nextYear
  );

  return `
(Github Activity Rewind) Generate **ONLY** a valid JSON response. Do not include:
- Markdown formatting.
- Additional text, headers, explanations, or context.
- Anything other than a plain JSON object.

The JSON must strictly follow this structure:

{
  "summary": "string - A concise summary of the user's GitHub activity over the year.",
  "YearlyOverview": "string - A broader overview of the user's activity trends, contributions, and key highlights for ${year}.",
  "mostSignificantAchievement": "string - Highlight the user's most impactful achievement on GitHub this year.",
  "areasForPotentialGrowth": "string - Identify areas where the user can improve or expand their skills.",

  "userStyle": {
    "vibe": "string - Describe the user's overall style, like 'collaborative', 'independent', or 'innovative'.",
    "superpower": "string - Highlight the user's strongest skill or unique capability.",
    "topQuote": "string - A motivational or thematic quote that reflects the user's GitHub year."
  },

  "posts": {
    "linkedPost": "string - A concise and precise LinkedIn post summarizing the user's GitHub year. e.g ${linkedin}",
    "twitterPost": "string - A concise and precise Twitter post highlighting key GitHub moments. e.g ${twitter}",
    "facebookPost": "string - A comprehensive Facebook post summarizing the user's GitHub activity. e.g ${facebook}",
    "instagramPost": "string - A visually engaging Instagram post summarizing the user's GitHub highlights. e.g ${instagram}"
  },

  "encouragementText": "string - Words of encouragement to keep the user motivated for GitHub and open source.",
  "motivationMessage": "string - A personalized message to inspire the user for the upcoming year (${nextYear})."
}

**Rules**:
1. Use double quotes ("") for all keys and string values. Do not use single quotes ('').
2. Output a plain JSON object **ONLY**.
3. Do not use backticks, markdown, or any other formatting.
4. Ensure the response is valid JSON ready for "JSON.parse(response)".
5. The current year is ${year}.
6. Make the social media post distinct and engaging.

**Input Data**:
${JSON.stringify(data)}
`;
}

function getPostsSample(year: number, nextYear: number) {
  const highlights = [
    "Enhanced open-source repositories with better documentation and features.",
    "Contributed to multiple projects by adding new features and resolving issues.",
    "Streamlined workflows with automation for testing and deployment pipelines.",
    "Improved code performance across various projects, focusing on scalability and efficiency.",
    "Collaborated with global teams to build and scale impactful software solutions.",
    "Implemented containerization for development environments, improving project portability.",
    "Refined DevOps workflows, optimizing continuous integration and deployment.",
    "Transitioned to a more robust type system for better maintainability in projects.",
    "Introduced modular architecture for cleaner, more reusable code.",
  ];

  const goals = [
    "Empower users through scalable and efficient solutions.",
    "Contribute more to open-source projects and community-driven initiatives.",
    "Master high-performance systems for greater scalability and efficiency.",
    "Deepen understanding of systems programming and memory safety.",
    "Build more accessible and user-friendly web applications.",
    "Enhance expertise in cloud computing and serverless technologies.",
    "Strengthen leadership skills and improve team collaboration in project management.",
    "Refine front-end skills, focusing on modern frameworks.",
    "Increase contributions to community projects and initiatives.",
    "Explore new technologies and frameworks for full-stack development.",
  ];

  const getGoal = () => {
    return goals[Math.floor(Math.random() * goals.length)];
  };
  const getHighlight = () => {
    return highlights[Math.floor(Math.random() * highlights.length)];
  };

  const posts = {
    linkedin: `
This year, ${year}, has been an incredible journey of growth and collaboration on GitHub. Highlights include:

✨ ${getHighlight()}
✨ ${getHighlight()}
✨ ${getHighlight()}

Looking ahead to ${nextYear}, my goals are:

🚀 ${getGoal()}
🚀 ${getGoal()}
🚀 ${getGoal()}

Let’s make ${nextYear} even better together! #GitHubRewind #SoftwareDevelopment #OpenSource #FullStack
[Get your GitHub Rewind](${rewindLink})
    `.trim(),

    twitter: `
Here’s my ${year} GitHub Rewind, powered by Intrasoft:

✨ ${getHighlight()}
✨ ${getHighlight()}
✨ ${getHighlight()}

Looking forward to ${nextYear}:

🚀 ${getGoal()}
🚀 ${getGoal()}
🚀 ${getGoal()}

Let’s make ${nextYear} even better! 🚀 #GitHubRewind #SoftwareDevelopment #OpenSource #FullStack

Get yours here: ${rewindLink}
    `.trim(),

    facebook: `
My ${year} GitHub Rewind, powered by Intrasoft, is here! 🚀

This year has been all about growth and impactful collaborations on GitHub. Highlights include:

- ${getHighlight()}
- ${getHighlight()}
- ${getHighlight()}

Looking forward to ${nextYear}, I aim to:

- ${getGoal()}
- ${getGoal()}
- ${getGoal()}

Excited for what ${nextYear} holds! Let’s make it even better! 🚀

#GitHubRewind #SoftwareDevelopment #OpenSource #FullStack
[Get your Rewind here](${rewindLink})
    `.trim(),

    instagram: `
My ${year} GitHub Rewind is here! 🚀

This year on GitHub has been about growth and impactful collaboration:

✨ ${getHighlight()}
✨ ${getHighlight()}
✨ ${getHighlight()}

Looking forward to ${nextYear} with big goals:

🚀 ${getGoal()}
🚀 ${getGoal()}
🚀 ${getGoal()}

Let’s make ${nextYear} even better! 🚀

#GitHubRewind #SoftwareDevelopment #OpenSource #FullStack
Link in bio for your Rewind! 🌟
    `.trim(),
  };

  return Object.values(posts);
}
