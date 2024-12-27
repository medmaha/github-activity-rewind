import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { AnalyzedData } from "@/lib/types";
import useAIQuery from "@/hooks/useAIQuery";

type Props = {
  userData: AnalyzedData;
};

export default function LinkedInPost({ userData }: Props) {
  const generatePost = () => {
    // This is a placeholder. We'll implement the actual AI-generated post later.
    return `🚀 Exciting news! I've just generated my GitHub Year in Review for 2024, and the results are in! 🎉

This year, I've made ${userData.totalContributions} contributions, gained ${userData.followers} new followers, and worked on ${userData.publicRepos} public repositories. My top languages were JavaScript, Python, and TypeScript.

Some highlights:
• Completed a major project: [Project Name]
• Contributed to [X] open-source projects
• Earned [Y] stars across my repositories

I'm grateful for the amazing developer community and looking forward to even more coding adventures in 2025! 💻✨

#GitHubRewind #CodingJourney #SoftwareDevelopment`;
  };

  const aiResponse = useAIQuery(userData);

  // if (typeof window != "undefined" && aiResponse.data)
  //   // localStorage.setItem("data", JSON.stringify(aiResponse.data));

  const cleanText = (text?: string) => {
    if (!text) return "";

    const splitted = text.split(" ");

    let _text = "";
    for (const word of splitted) {
      const _c = word
        .replace(/(^\*\*)/gi, "<strong>")
        .replace(/(\*\*)/gi, "</strong>");
      _text += _c + " ";
    }

    return _text;
  };

  return (
    <>
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">LinkedIn Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="bg-gray-700 p-4 rounded-md mb-4 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: aiResponse.data
                ? cleanText(aiResponse.data.posts?.linkedPost)
                : "No Content",
            }}
          ></div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
            <Share2 className="mr-2 h-4 w-4" />
            Share on LinkedIn
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">X/Twitter Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="bg-gray-700 p-4 rounded-md mb-4 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: aiResponse.data
                ? cleanText(aiResponse.data.posts?.twitterPost)
                : "No Content",
            }}
          ></div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
            <Share2 className="mr-2 h-4 w-4" />
            Share on X/Twitter
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Facebook Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="bg-gray-700 p-4 rounded-md mb-4 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: aiResponse.data
                ? cleanText(aiResponse.data.posts?.facebookPost)
                : "No Content",
            }}
          ></div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
            <Share2 className="mr-2 h-4 w-4" />
            Share on Facebook
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Instagram Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="bg-gray-700 p-4 rounded-md mb-4 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: aiResponse.data
                ? cleanText(aiResponse.data.posts?.instagramPost)
                : "No Content",
            }}
          ></div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
            <Share2 className="mr-2 h-4 w-4" />
            Share on Instagram
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
